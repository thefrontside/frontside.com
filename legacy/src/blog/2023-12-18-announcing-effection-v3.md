---
templateKey: blog-post
title: >-
  Announcing Effection 3.0 -- Structured Concurrency and Effects for JavaScript
date: 2023-12-18T20:00:00.959Z
author: Charles Lowell
description: >-
  A major milestone in bringing Structured Concurrency and Effects to JavaScript, Effection 3.0 has excellent TypeScript support, a powerful new context API, and harmonizes perfectly with the JavaScript APIs you know and love.
tags: [ "javascript", "structured concurrency"]
img: /img/2023-12-18-announcing-effection-v3.png
---

[Effection] is Structured Concurrency and Effects for JavaScript.

It’s a library purpose-built to help developers write code that can easily manage the most complex concurrent computations whether in the frontend or backend. It provides the guarantees of Structured Concurrency in order to make code leak-proof by default, and it achieves this while being simple to read, understand, and maintain.

Just over five years ago, in November of 2018, when Structured Concurrency was a little-known peculiarity, we started a helper library to coordinate the many moving parts in some of our open-source projects (such as [Interactors](https://frontside.com/interactors)). Since then, it has grown into a mature project in its own right; deployed in production worldwide, helping developers use Structured Concurrency to push the limit of what is possible with JavaScript.

Today, we are pushing things further and concentrating even more power into the hands of JavaScript developers with the release of Effection 3.0. This new version refines and simplifies the abstractions we first created in version 2.0 while introducing some new ones of exceptional power. This release has much to look forward to, including the new Context API and an even better TypeScript experience. Most of all, however, we’re proud of how we’ve realigned all of the APIs so that working with Effection feels just like working with JavaScript, only with the protections of structured concurrency baked in.

That’s why we say more than ever before: *Effection is Structured Concurrency and Effects for JavaScript*

Here’s an overview of some key features you’ll find in Effection 3.0

\- [Excellent TypeScript Experience](#%EF%B8%8F-first-class-typescript-experience): TypeScript types have been carefully re-imagined to be as small and helpful as possible.

\- [Embrace of JavaScript](#%EF%B8%8F-embrace-the-javascript): Version 3 is easier to learn and safer to integrate into your projects than ever because of its dedication to following JavaScript standards in spirit and form.

\- [Context API](#-new-context-api): Shared environmental data (like auth tokens), shared resources, and contextual (aka algebraic) effect handlers have at least one thing in common: They are all made possible by the new Context API.

\- [Rebuilt with Delimited Continuations](#-rebuilt-with-delimited-continuations): The v3 API is so simple it feels like it almost isn’t there. But that doesn’t mean there isn’t some serious brainpower behind the ideas that make this possible.

## 🏷️ Excellent TypeScript Experience

Since version 2.0, Effection itself has been written in TypeScript. As a result, a lot of thought was put into making it pleasant to use there. However, some rough edges remained.

The first area where the TypeScript experience improved is in the `Operation<T>` type itself. In the 2.x versions of Effection, it was a union of seven member types, one of which was `undefined`. It was unclear what you should set as your return type if you were writing a function that returned an Operation. Compound this with the fact that all Effection APIs were inconsistent in what they returned. Some returned `Resource<T>`, others `OperationFunction<T>`. Now, there is a single `Operation<T>`, which is a [simple interface](https://github.com/thefrontside/effection/blob/45b181f2ca99b512c1b869a10538576bd49d4675/lib/types.ts#L43-L45) that can be used consistently as a function parameter and return type.

However, the most vexing issue with Effection v2 in TypeScript arose because the generator type prevented the left side of a `yield` expression from being inferred properly. That meant you had to annotate values bound in this way manually. For example, if we had an operation of type `createNumber(): Operation<number>`, then we would have to manually tell TypeScript that the result of `createNumber()` was, in fact, a `number`, even though the return type already clearly indicated this.

```tsx
function* operation() {
  // we have to declare that `count` is a number
  let count: number = yield createNumber();
  return count.toExponential();
}
```

But that was only ever a hint, not a constraint, and a completely bogus annotation would breeze right through the type checker as well.

```tsx
function* operation() {
  // we have to declare that `count` is a number
  let count: number = yield createString();
  return count.toExponential() // TypeError!
}
```

This was a major Achilles heel for TypeScript developers who wanted to use Effection. They expected the complete experience, not just of compile-time type checking, but also all the language server tooling that having type information enables. Sadly, the TypeScript experience with Effection v2 fell short of what they expected.

Effection 3.0 makes this completely a non-issue by using [`yield*`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield*) to evaluate operations in the context of another. This has many benefits, including shorter stack traces and lower memory overhead, but one of the greatest is that it completely solves the type inference problem. This is because the type of a `yield*` expression is independent of the type of function that evaluates it. Now, if we try to assign an incompatible type from an operation, we’ll get a type-checking error:

```tsx
function* operation() {
  //@ts-expect-error `string` is not assignable to `number`!
  let count = yield* createString();
  return count.toExponential()
}
```

## ✨ New Context API

Sometimes, you need to share something across a wide range of operations. It could be anything from a simple string like an auth token to a shared service that other code needs to function. But so much depends on this shared thing that you don’t want to pollute your APIs by passing it around as an argument everywhere.  Instead, you want it to be “just there” as part of the environment in the same way the `document` reference is “just there” on a web page.

Effection now ships with an API that solves this need elegantly. It is deceptively simple, but don’t let that fool you. The new [`Context`](https://deno.land/x/effection/mod.ts?s=Context) API is jam-packed with power, and it’s one of the features we’re most thrilled to be releasing.

To see this in action, let’s make a `Username` context to track our current user so that we can greet them from an operation.

```jsx
import { createContext } from "effection";

// create the username context;
const Username = createContext(`username`);
```

We can now use this context from within any operation! Let’s create an operation to greet the current user:

```jsx
// greet the current user, whoever that is
export function* sayHello() {
  let username = yield* Username;
  console.log(`Hello ${username}!`)
}

await main(function*() {
  yield* Username.set("anonymous");
  yield* sayHello();
})
```

If we run the above code, it will print the following to the console.

```jsx
Hello anonymous!
```

But here is the kicker. Context is sensitive to scope.

Because of this, when you set the value of a context, it is only visible to *that scope and its children*. All other scopes are completely unaffected.

```jsx
await main(function*() {
  yield* Username.set("anonymous");
  yield* sayHello();

  yield* call(function*() {
    yield* Username.set("bob");
    yield* sayHello();
  });

  yield* call(function*() {
    yield* Username.set("alice");
    yield* sayHello();
  });

  yield* sayHello();
})
```

prints

```
Hello anonymous!
Hello bob!
Hello alice!
Hello anonymous!
```

As you can see, the child operations get their own private definition of `Username` that neither interferes with each other, nor the definition of their parent.

Call it a foundation for dependency injection, or a basis for algebraic effect handlers, the range of uses for this mechanism are *massive*  and we can’t wait to see what folks end up doing with it.

## ❤️ Embrace the JavaScript

Our goal with Effection has always been to make it easy to write JavaScript code protected by Structured Concurrency's guardrails. That’s why our project’s tagline is “Structured Concurrency and Effects for JavaScript.”  We believe you shouldn’t have to learn an entirely new way to write programs to achieve the benefits of Structured Concurrency. Instead, we believe that the *only* new thing you should have to learn is Structured Concurrency, and everything else should feel like plain JavaScript/TypeScript every step of the way.

With version 3.0, we’ve doubled down on this idea by re-imagining our APIs as mirrors to existing counterparts in JavaScript. That way, if you know how to do it in JavaScript, you know how to do it in Effection. We call this conversion between vanilla JavaScript and Effection our [“Async Rosetta Stone.”](https://frontside.com/effection/docs/async-rosetta-stone)

| Async | Effection |
| --- | --- |
| Promise | Operation |
| new Promise() | action() |
| await | yield* |
| async function | function* |
| AsyncIterable | Stream |
| AsyncIterator | Subscription |
| for await | for yield* |

There is a structured analog for any construct you use for `async` programming. For everything else, *JavaScript and its wider ecosystem is your standard library.*

Consider [this example from MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/async_function#examples)

### Async

```jsx
function resolveAfter2Seconds(x) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(x), 2000);
  });
}

// async function expression assigned to a variable
const add = async function (x) {
  const a = await resolveAfter2Seconds(20);
  const b = await resolveAfter2Seconds(30);
  return x + a + b;
};
```

### Effection

```jsx
function resolveAfter2Seconds(x) {
  return action((resolve) => {
    let timeout = setTimeout(() => resolve(x), 2000);
	  return () => clearTimeout(timeout);
  });
}

// operation function expression assigned to a variable
const add = function* (x) {
  const a = yield* resolveAfter2Seconds(20);
  const b = yield* resolveAfter2Seconds(30);
  return x + a + b;
};
```

Interoperation between these two worlds will always be our project’s foremost concern. For example, creating a `Stream` at runtime is trivial from a reference to an `AsyncIterable` and vice-versa. The same is true for `Subscription` and `AsyncIterator`

Effection is dedicated to keeping this alignment with core JavaScript in place both now and into the future so that developers can have peace of mind knowing that Effection will always be:

- Easy to learn for any developer encountering Effection code for the first time. If they know JavaScript, they (mostly) know Effection.
- Easy to adapt to any existing codebase, no matter what other paradigms it may use.
- Easy to “sprinkle” into a codebase without requiring massive refactors.

# 🧠 Rebuilt with Delimited Continuations

You might think that a robust implementation of Structured Concurrency and Effects for JavaScript could easily be large, complex, difficult to understand, and a pain to debug. And if you were talking about Effection prior to version 3.0, you might even be right!

Versions 1.x and 2.x used a combination of state machines and cascading chains of callbacks that fired events and transitioned those state machines to orchestrate code to run at the right time. In a way, those past versions of Effection jumped on the grenade of callback hell so that users didn’t have to.

While that was a worthy tradeoff, Effection 3.0 gets to have its cake and eat it, too by undergirding its entire implementation on the foundation of **delimited continuations**. These curious constructs from the world of functional programming are extraordinarily powerful artifacts. They can express *all* the standard control mechanisms we’re familiar with, from `while` loops to `try/catch`blocks, to algebraic effect handlers.

Having an abstraction of this power drive Effection v3 means that its core logic can be expressed in only about 150 lines of TypeScript. And because it isn’t based on asynchronous callbacks but instead delimited continuations, execution is linear and straightforwardly follows its source code. As a result, it is an order of magnitude easier to understand and maintain.

We’re packing a more powerful, performant, and maintainable library into a much smaller footprint thanks to delimited continuations. The bundle size has been slashed in half and clocks in at a miniscule 4.6kb gzipped.

To delve deeper into the subject of delimited continuations in JavaScript, we recommend:


\- [Eric Bower’s talk for Michigan TypeScript](https://www.youtube.com/watch?v=uRbqLGj_6mI)

\- [On Wikipedia](https://en.wikipedia.org/wiki/Delimited_continuation)

\- [TypeScript tutorial on delimited continuations](https://github.com/cowboyd/delimited-continuations-tutorial)

## Get Started With Effection 3.0 Today!

Wondering what the next step is? Whether you're beginning a new project, or wanting to bring more clarity to an existing one, [Effection][effection] is meant to be both the simplest _and_ the easiest way to use structured concurrency and effects in JavaScript.

Check it out on [GitHub][effection-github], have a look at our [guide to getting started][effection-getting-started], or [drop into our Discord Server][effection-discord] to say hi. We're always eager to talk, and look forward to hearing from you all soon.

[effection]: https://frontside.com/effection
[effection-github]: https://github.com/thefrontside/effection
[effection-discord]: https://discord.gg/r6AvtnU
[effection-getting-started]: https://frontside.com/effection/docs/installation
