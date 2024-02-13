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

Intro - "you're a developer..."

## Simple Fetch

Writing a simple fetch call using effection

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
  const result = yield* fetchURL(url);
  console.log(result);
});
```

explain main, call, useAbortSignal, yield*

## Exponential Backoff

Let's add retry logic with exponential backoff

```js
import { run, useAbortSignal, call, sleep } from 'effection';

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

explain sleep

## Structured Concurrency

Now let's add a timeout using race

```js
import { run, useAbortSignal, call, sleep, race } from 'effection';

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

explain race - abort signal does not need to be threaded through nor do we need to clear timeout, if timeout wins the race, the fetch will be aborted automatically and vice versa

composable

## Reusable

we can go even further and make the retry function reusable

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

then our main function can be:

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
