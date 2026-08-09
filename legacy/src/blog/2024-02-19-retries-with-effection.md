---
templateKey: blog-post
title: >-
  Fetch Retries in Javascript with Structured Concurrency using Effection
date: 2023-02-19T20:00:00.959Z
author: Taras Mankovski, Min Kim
description: >-
  WIP
tags: [ "javascript", "structured concurrency"]
img: /img/2023-12-18-announcing-effection-v3.png
---

// Intro - "you're a developer..."

## Calling Fetch with Effection

In order to avoid being overwhelmed with unfamiliar syntax, we'll start with a simple fetch call and incrementally build on top of it. So to get started, here's how you would call fetch with Effection:

```js
import { run, useAbortSignal, call } from 'effection';

function* fetchURL(url: URL | string, init?: RequestInit) {
  const signal = yield* useAbortSignal();
  const response = yield* call(fetch(url), { ...init, signal });

  if (response.ok) {
    return yield* call(() => response.json());
  }
}

run(function* () {
  const result = yield* fetchURL("https://foo.bar");

  console.log(result);
});
```

Let's breakdown the basics of Effection so that you can understand what's happening in the code above:

1. In order to use Effection, you need to wrap your function(s) in either a `run()` or `main()`. The `main()` function is mostly used for standalone scripts so we're using `run()` in our example assuming you would implement fetch with Effection inside an existing app.
2. The primary building blocks of Effection are Operations. They're similar to async functions in normal Javascript, but the difference is that you need to `yield* myOperation` instead of `await myAsyncFn()`. In the code example above, you can see that we're passing an Operation into `run()` and we've also created an Operation called `fetchURL`.
3. Effection offers a collection of commonly used Operations for your convenience. In our first example, we're using `call` and `useAbortSignal`.
  - The `call` function is used for running asynchronous functions inside of Effection. Both `fetch` and `response.json()` are asynchronous, and not an Operation, so we need to wrap it in a `call()`. And as you may have noticed, we do not need to `await` the async functions we invoke inside of `call`.
  - `useAbortSignal` is another Operation that comes out of the box with Effection. The nice thing about Effection's `useAbortSignal` is that you don't need to explicitly call `.abort()` and it does not need to be threaded throughout your functions. If the function from which you instantiate `useAbortSignal` stops running, it will emit an `abort` event to guarantee that your request is shut down.

## Implementing Exponential Backoff

Now that we have covered the basics of Effection, let's expand on our first example by introducing exponential backoff to our fetch call. Although we're adding several new lines, the only new Effection code we're introducing here is another common out-of-the-box Operation:

```js
import { run, useAbortSignal, call,
  sleep,
} from 'effection';

function* fetchWithBackoff(url: URL | string, init?: RequestInit) {
  let attempt = -1;
  while (true) {
    const signal = yield* useAbortSignal();
    const response = yield* call(fetch(url), { ...init, signal });

    if (response.ok) {
      return yield* call(() => response.json());
    }
    let delayMs: number;

    // https://aws.amazon.com/ru/blogs/architecture/exponential-backoff-and-jitter/
    const backoff = Math.pow(2, attempt) * 1000;
    delayMs = Math.round((backoff * (1 + Math.random())) / 2);

    if (delayMs > 4000) {
      return new Error("reached timeout");
    }

    yield* sleep(delayMs);
    attempt++;
  }
}

run(function* () {
  const result = yield* fetchWithBackoff("https://foo.bar");

  console.log(result);
});
```

We wrapped the previous logic of `fetchURL`, which we've renamed to `fetchWithBackoff`, in a while loop and added the `sleep` Operation to delay the trigger of our next fetch attempt. The function will exit out of its infinite loop when either we receive a successful response from our fetch call or if our delay variable exceeds 4000 milliseconds. Based on the way the exponential backoff logic is written, it means our code will attempt to fetch 4-5 times before it times out.

## Structured Concurrency

But what if we don't care about how many fetch attempts we make but instead we just want to keep trying for a set amount of time? Here's how you would achieve that:

```js
import { run, useAbortSignal, call, sleep,
  race,
} from 'effection';

function* fetchWithBackoff(url: URL | string, init?: RequestInit) {
  let attempt = -1;
  while (true) {
    const signal = yield* useAbortSignal();
    const response = yield* call(fetch("https://foo.bar"), { signal });

    if (response.ok) {
      return yield* call(() => response.json());
    }
    let delayMs: number;

    // https://aws.amazon.com/ru/blogs/architecture/exponential-backoff-and-jitter/
    const backoff = Math.pow(2, attempt) * 1000;
    delayMs = Math.round((backoff * (1 + Math.random())) / 2);

    yield* sleep(delayMs);
    attempt++;
  }  
}

run(function* () {
  const result = yield* race([
    fetchWithBackoff("https://foo.bar"),
    sleep(60_000),
  ]);

  console.log(result);
});
```

In this new example, we've removed the conditional for returning a timeout error in the while loop and wrapped our `fetchWithBackoff` function in a `race()` Operation. You can run multiple Operations in parallel by using `race()`. And as you can probably assume from the name of the Operation, `race()` will finish the moment one of its Operations completes. By calling `fetchWithBackoff` and `sleep` inside a race, it will either "timeout" after a minute or once you receive a successful response from your fetch attempts.

Note how, as we mentioned earlier, an abort controller does not need to be threaded through to our fetch function. In our example, if `sleep` were to complete first, our `useAbortSignal` inside `fetchWithBackoff` will automatically emit abort without you having to tell it do so.

## Make It Reusable

Let's take our example one step further and refactor it to be reusable. We're going to extract fetch out from `fetchWithBackoff` and move `sleep` into our Operation:

```js
function* retryWithBackoff<T>(fn: () => Operation<T>, options: { timeout: number }) {
  function* body() {
    let attempt = -1;

    while (true) {
      try {
        return yield* fn();
      } catch {
        let delayMs: number;

        // https://aws.amazon.com/ru/blogs/architecture/exponential-backoff-and-jitter/
        const backoff = Math.pow(2, attempt) * 1000;
        delayMs = Math.round((backoff * (1 + Math.random())) / 2);
    
        yield* sleep(delayMs);
        attempt++;
      }
    }
  }

  return race([
    body(),
    sleep(options.timeout)
  ]);
}
```

We've renamed `fetchWithBackoff` to a more appropriate name: `retryWithBackoff`. Our new Operation now takes another Operation as an argument along with a second argument for specifying the duration of when you want the whole thing to timeout. Our `run()` would now look like this:

```js
run(function* () {
  const result = yield* retryWithBackoff(function* () {
    const signal = yield* useAbortSignal();
    const response = yield* call(fetch("https://foo.bar", { signal }));

    if (response.ok) {
      return yield* call(() => response.json());
    } else {
      throw new Error(response.statusText);
    }
  }, {
    timeout: 60_000,
  });

  console.log(result);
});
```

// say something about composability
