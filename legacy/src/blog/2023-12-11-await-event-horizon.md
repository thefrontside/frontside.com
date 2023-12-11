---
templateKey: blog-post
title: >-
  The await event horizon
date: 2023-12-11T20:00:00.959Z
author: Charles Lowell
description: >-
  Why async functions in JavaScript are insufficient as a Structured Concurrency primitive
tags: [ "javascript", "structured concurrency"]
img: /img/2023-12-11-await-event-horizon.png
---

There is a boundary around every black hole where the velocity required to escape its gravitational pull exceeds the speed of light. Once anything, including light itself, passes over that threshold, it is trapped inside the mysterious interior of the black hole forever. There is no escape, and there is no return back to the rest of the universe. This boundary is called the black hole’s event horizon.

A similar boundary exists around every JavaScript Promise, and once the flow of execution crosses over it, there is no way to forcibly escape and return back from whence it came. I refer to this boundary as the Promise’s `await` event horizon.

An async function traverses an `await` event horizon every time it pauses for the result of a Promise. When it does, control can never return back to it until such time as that Promise settles; and there is absolutely no way to guarantee that it (or any) Promise will ever settle. It might happen in the next tick of the event loop, or in the worst case scenario, it just might never settle at all. When that happens, the poor waiting function is stuck forever helpless… suspended like an insect in amber.

This is not theoretical. It is of important, practical concern. For example, consider this async function that implements the very common pattern of doing some setup, performing an operation, and then doing necessary teardown. In the code below, the async function acquires a lock, awaits a function it receives as an argument, and then, once that operation is complete, releases the lock.

```jsx
async function protect(work) {
  let lock = await acquireLock();
  try {
    await work();
  } finally {
    release(lock);
  }
}
```

But what happens if the Promise returned by `work()` never settles? The answer is that the `protect()` function has passed over the `await` event horizon, never to resume. As a result, the lock it acquired at its start is never released, and so we say the lock has been “leaked”.

> Resource leaks are considered by many to be the most insidious category of bug in software because of the difficulty in tracking them down coupled with the fact that they often lay hidden until the system is under the stress of a heavy workload.
>

Of course as a rule, most promises *do* settle if we let them run long enough and so for the most part we abide by the blissful convention that they *will*. But happy assumptions rarely pan out at scale. In fact, we find out pretty quickly that it isn’t just promises taking forever that are problematic.

Let’s suppose that we wanted to call our `protect()` function from within a command line interface, and that when the user hits CTRL-C, we exit our process. If our work takes ten seconds, but the user hits CTRL-C after nine and a half seconds, then control never returns from beyond the `await` event horizon and the lock is leaked once again.

We aren’t talking about a promise that never settles here. We’re talking about one that would have settled imminently, and yet it only took a difference of five hundred milliseconds for the leak to manifest.

## Is Explicit Resource Management a solution?

In a word: no.

[Explicit resource management](https://github.com/tc39/proposal-explicit-resource-management), a stage 3 TC39 proposal as of this writing, allows you to bundle setup and teardown code together. It saves you from going through the ceremony of a  `try/catch` block and makes it much more difficult to inadvertantly leak resources. If our hypothetical locking mechanism had it built in, it would allow us to write our `protect()` function much more clearly.

```jsx
export async function protect(work) {
  using lock = await acquireLock();
  await work();
}
```

When `protect()` finishes and `lock` passes out of scope, it is automatically released according to its pre-bundled deallocation logic.

While this a handy improvement, it does nothing to change the fundamental physics of the `await` event horizon. Once flow control passes through it, there is no coming back until `work()` settles. If that takes too long, then `protect()` will take too long, and as a result, the automatic destruction of the `lock` resource will never be triggered. In other words, it is leaked.

## Does AbortSignal help?

In theory yes, but in actual practice kinda-not-really. Abort signals can, when applied with discipline, remediate the problem somewhat, but they cannot solve it.  It begins with the reality that there is no agreed upon way to “cancel” a promise when handed an `AbortSignal`. In fact, it is a very thorny issue which caused T39 to [throw up its hands almost a decade ago](https://github.com/tc39/proposal-cancelable-promises/issues/70), and if you think you know the answer offhand, then the odds are that you haven’t [thought about it long enough](https://news.ycombinator.com/item?id=13214487). However if we must, one way is to wrap every promise in a `safe()` function that serves as a barrier to protect us from the `await` event horizon.

```tsx
export function safe(promise, signal) {
  return Promise.race([
    promise,
    new Promise((_,reject) => signal.addEventListener("abort", reject)),
  ])
}
```

If `signal` fires before `promise` settles, then our safe function will immediately reject, returning control to the caller by throwing an error. With this mechanism in hand, we can re-write our `protect()` function to thread an abort signal throughout the entire computation.

```jsx
export async function protect(work, signal) {
  let lock = await safe(acquireLock(), signal);

  try {
    await safe(work(signal), signal);
  } finally {
    release(lock);
  }
}
```

The function now uses `safe()` to wrap every `await` expression in a circle of protection that prevents execution from becoming trapped beyond its event horizon. In addition, it passes `signal` down to `work()` so that it, and any functions that it calls can do the same. Now, when `signal` is fired, no matter if `work()` becomes stuck, our `protect()` function will exit, and the lock will be released. However, the approach still comes with this serious and unavoidable caveat: the abort signal is a hope, not a constraint.

It’s not just that an extra abort signal is cumbersome to both use and pass around. It is. It’s that if `work()` or any of the functions that it calls, or any of the functions that *they* call, fail to use `signal` and `safe`() then we are right back in the same boat of having async functions in our call tree that become trapped beyond the `await` event horizon and leak resources as a result.

What’s fundamentally missing is the power of abstraction: the freedom to think about `work()` as a black box and feel secure that it will return control to its caller whenever it needs it most, no matter how `work()` is constructed internally. Using abort signals, the only way to achieve this is would be to read its source code and the source code of all its transitive dependencies to ensure that they also observe abort signal discipline. In practice, nobody would do that, and the scarcity of libraries that actually integrate abort signals shows that nobody does. While they can work around the obstacle through the imposition of discipline, they cannot make it disappear altogether. The fact remains that once control passes through the `await` event horizon, it cannot be brought back.

## Structured Concurrency and the await event horizon

There are many remediations for the problem this poses, but most of them amount to some variation of the abort signal. The `await` event horizon however, remains axiomatic because the mechanics of it are baked into the heart of the runtime. There is no way to reliably pierce through it.

The consequence of this is that the *minimum* lifetime of any given `async` function is determined solely by the lifetime of its *innermost* promises. In other words, the natural lifetime of an `async` function is determined from the inside out.

`protect()` cannot continue until `work()` settles… whenever that may be. So it is `work()` that determines when `protect()` can continue, and it is `protect()` that determines the natural lifetime of our main function. Anything that overruns the exit of our process is in the “danger zone” of being leaked. This includes our hypothetical lock

![Any code that runs longer than needed is in danger of being leaked](/img/2023-12-08-await-event-horizon/leak-zone.png)

In fact, this is precisely the opposite of what is required by a Structurally Concurrent system. Namely, that the *maximum* lifetime of a function is constrained by the lifetime of the function that calls it. Instead of waiting around for async operations to complete that have no bearing on the outcome of a computation, a structurally concurrent system will return from those functions immediately the moment they are no longer necessary. In our example of the command line interface, as soon as the user hits ctrl-c, everything else becomes immediately irrelevant.

What we would like to see in this case is the forcible return of control *back* to the `protect()` function, so that it can run its `finally` block so that the lock is not leaked and the process exits gracefully.

![A well behaved operation always returns](/img/2023-12-08-await-event-horizon/graceful-shutdown.png)

However, in order to enforce the shutdown of these irrelevant functions, there must be some mechanism by which to impose a return of control from the top down. But we’ve just seen how in `async` functions, once control passes through the `await` event horizon, it cannot be brought back. It’s for this reason that primitives based on `async` functions can at best hope for structured concurrency, but they can never guarantee it.

## Structured Concurrency and JavaScript

You might be thinking at this point that structured concurrency in JavaScript is a lost cause because it can’t be achieved with `async` functions. Far from it! Structured Concurrency is not only possible, you can already find it out in the wild today in the likes of projects like [Effection](https://frontside.com/effection), [Effect-TS](http://effects.js.org), and [StarFX](https://github.com/neurosnap/starfx) (to name a few). These libraries come in all shapes and sizes, but one thing that they all share in common is an embrace of [generator functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) as a core technique.

This is because generators functions in JavaScript are not limited by the `await` event horizon. They represent full-fledged [delimited continuations](https://en.wikipedia.org/wiki/Delimited_continuation), which is one of the most (if not the most) powerful flow control primitive there is. Without delving into what delimited continuations are, suffice it to say that they can be used to express *any* other control mechanism you’d care to implement, from `while` loops, to `try/catch` blocks to algebraic effect handlers. In fact, in their essence, `async` functions themselves are just a watered down version of generator functions limited to the specific domain of promise handling.

Critically for our use-case, generator functions allow for an explicit [`return()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/return) which signals them to exit *posthaste* from wherever they are currently executing. Yet as they do, they will still follow critical code paths such as `finally {}` blocks or explicit resource methods.

Perhaps someday in the distant future, `async` functions will provide the programmer with a mechanism to escape the `await` event horizon, but until that time, a structured concurrency model based on `async/await` will be nothing more than science fiction.
