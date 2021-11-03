---
templateKey: blog-post
title: >-
  Effection: for when async/await is not enough
date: 2021-10-26T05:00:00.000Z
author: Jonas Niklas
description: >-
  Everyone who has built a complex system in JavaScript has hit a critical moment when concurrent processes become unmanageable. But with Effection—an OSS async/await alternative—you'll spare memory leaks and headaches. 
tags:
  - dx
  - javascript
img: /img/2021-intro-effection.png
---

Everyone who has built a complex system in JavaScript has hit a critical moment where the illusion of control comes crashing down. Those are the moments when there are dozens (maybe hundreds) of concurrent processes running and it feels like you&#39;ve lost control over them. Maybe a promise handler or callback executes even though it is no longer relevant and messes up the state of the system. Or perhaps an error disappears into the void or a socket is not closed when it should be.

The problem with concurrent processes in JavaScript is that it is fundamentally unstructured. Anyone can add a callback, or await a promise at any time, and once that task is created, it has an _unconstrained_ lifetime. If the async function or the callback is no longer relevant, how do you cancel it? Worse yet, if you&#39;re performing multiple callbacks or promises or awaits, are you sure you&#39;re dealing correctly with errors in all of them?

## Introducing Effection

The solution is to adopt the ideas of a [structured concurrency](https://vorpus.org/blog/notes-on-structured-concurrency-or-go-statement-considered-harmful/) and apply them to JavaScript. The core idea of structured concurrency is that the lifetime of a task is always constrained. This means that a task must not outlive its parent, or in other words, it is impossible to create a task that runs _forever_. This might seem like an obvious constraint, but it is important to note that this is very much _not_ the case with the core concurrency primitives available in JavaScript.

[Effection](http://frontside.com/effection) is an Open Source concurrency framework that replaces async/await with a more structured way of writing code. Let&#39;s look at how this applies to async/await code:

```javascript
async function fetchUser(id) {
  let response = await fetch(`/users/${id}`);
  return await response.json();
}
```

There is nothing special about this async function. And this is what happens when we call this function from another function:

```javascript
async function fetchSomeUsers() {
  let userOne = fetchUser(1);
  let userTwo = fetchUser(2);
  return {
    one: await userOne,
    two: await userTwo,
  }
}
```
> Note: we could have used `Promise.all()` for this, but the resulting behavior would be the same.

It looks like the `fetchSomeUsers` function is nice and self-contained, but in fact it isn&#39;t. We start fetching two users, but both of those fetches are in no way tied to the `fetchSomeUsers` function. They run in the background, and no matter what happens within `fetchSomeUsers`, _they just keep running_. Potentially they could run forever; that&#39;s what we mean when we say that their lifetime is unconstrained.

For example, there is nothing stopping us from doing something silly like this:

```javascript
async function fetchUser(id) {
  setTimeout(() => {
    console.log("I'm still running, lol!");
  }, 1000000);
  let response = await fetch(`/users/${id}`);
  return await response.json();
}
```

Even ages after the `fetchUser` function has finished, it will still print something to the console. We can&#39;t close the existing loopholes (such as `setTimeout`), but as long as you are writing idiomatic Effection code, something like the above just cannot happen.

Let&#39;s look at this example again – but this time using Effection:

```javascript
import { spawn, fetch } from 'effection';

function* fetchUser(id) {
  let response = yield fetch(`/users/${id}`);
  return yield response.json();
}

function* fetchSomeUsers() {
  let userOne = yield spawn(fetchUser(1));
  let userTwo = yield spawn(fetchUser(2));
  return {
    one: yield userOne,
    two: yield userTwo,
  }
}
```

It&#39;s not that different from before: Effection uses generator functions instead of async functions, and there is something going on with `spawn`, but other than that it looks pretty much the same.

However, the way that this function runs is very different. When we spawn a task with Effection, its lifetime is tied to the current task, which means that `fetchUser(1)` and `fetchUser(2)` cannot ever outlive fetchSomeUsers. Moreover, no task that `fetchUser` spawns can outlive `fetchUser` either. Effection tasks ensure that everything that happens within the task stays within the task.

## Using Effection

This might seem like a trivial outcome but the implications are profound. For example, Effection ships with an operation called `withTimeout`, which adds a time limit to any task. If the time limit is exceeded, an error is thrown.

That means we can now do this:

```javascript
import { withTimeout } from 'effection';

function* fetchSomeUsersWithTimeout() {
  return yield withTimeout(2000, fetchSomeUsers());
}
```

Right now in JavaScript something like this is pretty much impossible to implement with promises. There is just no way to know what `fetchSomeUsers` does internally, and there is no way to know whether we really can abort all of it. Trying to write a function like this is at best unsafe and at worst impossible.

With Effection it all just works. We know that nothing can escape `fetchSomeUsers` and we know that everything that `fetchSomeUsers` does will be canceled if we cancel `fetchSomeUsers` itself.

Now, imagine that our async/await `fetchSomeUsers` fails for some reason:

```javascript
async function fetchSomeUsers() {
  let userOne = fetchUser(1);
  let userTwo = fetchUser(2);
  throw new Error('boom');
  return {
    one: await userOne,
    two: await userTwo,
  }
}
```

What will happen in this case? `fetchUser(1)` and `fetchUser(2)` will happily keep running, even though the `fetchSomeUsers` function which initially called them has already failed.

![fetchSomeUsers timing with async/await](/img/2021-effection-intro/intro-effection-async-await.svg)

This can&#39;t happen in Effection. Because given that `fetchUser(1)` and `fetchUser(2)` are scoped to their parent function, they will be terminated when `fetchSomeUsers` enters into an error state.

![fetchSomeUsers timing with effection](/img/2021-effection-intro/intro-effection-effection.svg)

And this is the power of Effection&#39;s structured concurrency: it allows us to build abstractions that would otherwise be impossible to construct. We think it is a fundamentally better way to write JavaScript.

### Going further

There is much more to Effection than what we&#39;ve shown here. Effection is not only a framework that allows you to write rock-solid code, but it also gives you amazing insights into your application through our experimental [inspector](http://frontside.com/effection/docs/guides/inspector). If you&#39;re curious to learn more, this [guide](http://frontside.com/effection/docs/guides/introduction) explains in greater detail how to use Effection, and the [API Reference](https://frontside.com/effection/api/index.html) contains a complete reference of all methods and types that Effection provides.

We are a small but dedicated team at Frontside that likes to tackle challenging problems with an ambitious solution. There is boundless work to be done, and boundless ideas to explore. Do you want to join us on this journey? Come hang out with us [on discord](https://discord.gg/Ug5nWH8), where we stream our work and are always interested in discussing where to go next.
