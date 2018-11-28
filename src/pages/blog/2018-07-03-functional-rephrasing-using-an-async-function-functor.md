---
templateKey: blog-post
title: Functional Rephrasing Using an Async Function Functor
author: Charles Lowell
date: 2018-07-03 12:00 UTC
image: /blog/2018/07/03/functional-rephrasing-using-an-async-function-functor/starry-night.jpg
description: "Once you know that they're there, Functors pop up in all kinds of surprising places. Here we take a simple exploration of how the JavaScript async function construct is actually a Functor and how we can use that for great good."
tags: 
  - functional-programming
  - functor
  - funcadelic
  - TIL
  - javascript
  - typeclasses
cta_text: "Is your team eager to unlock the power of true functional programming in JavaScript but doesn't know where to start?"
cta_button: "Lets get your FP journey started"
---

One of my favorite things about the [the math framework][1] is that it
helps you look for (and also find) patterns of composability around
you in your programming world. At the time I wrote:

> As you start to perceive the common nature in things like Promise, Array, and Observable, you begin to re-perceive all of the objects in your world through this new prism. You ask yourself “Is this a Functor?” and you’re shocked by how often the answer is yes. Plain JS Object? Yes. DOM Element? Yes. Express middleware? Yes. React Component? Also yes.

It turns out that Functors are everywhere, and armed with
[funcadelic.js][2] at your side, you stand ready to harness their power. In
fact, just yesterday I found just such a one: The JavaScript
[`AsyncFunction`][3]. And today, I'm going to show you how we can use the
fine fact that async functions are Functors in order to refactor some
code to be more composable. In other words, we'll functionally
rephrase it as a Functor.

Let's say we have an async function that fetches a url for us:

```js
async function get(url) {
  return await fetch(url);
}
```

And now we want to assemble a data transformation pipeline around
it. For argument's sake, let's say our process will look like:

```
-> get the data
-> parse as JSON
-> normalize the keys in the resulting json
-> look up the canonical model in a local data store.

```

As a first pass, we could write a transform function that takes the
url and applies each of these steps.

```js
async function transform(url) {
  let response = await get(url);
  let data = response.text();
  let json = JSON.parse(data);
  let normalizedKeys = normalizeKeys(json);
  let model = lookup(normalizedKeys);
  return model.
}
````

And if we wanted to stop there, life would go on. However, we could
also declare that `AsyncFunction` is a Functor and leverage the
flexibility that it provides. Here is the definition of the Functor
instance for async functions.

```js
import { Functor } from 'funcadelic'

// AsyncFunction is not currently a global object. :/
const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor

Functor.instance(AsyncFunction, {
  map(fn, asyncFn) {
    return async function(...args) {
      return fn(await asyncFn(...args));
    }
  }
})
```

What this says is: whenever you map a function `fn` over an async
function, what you get is a _new_ async function that just invokes the
old async function, awaits its return value, and then applies `fn` to
it before returning.


Using the [funcadelic chaining syntax][4] this let's us define the
`transform` method, not as a monolithic function, but as the
combination of a bunch of smaller functions.

```js
import { chain as $ } from 'funcadelic';

const transform = $(get)
  .map(response => response.text())
  .map(data => JSON.parse(data))
  .map(json => nomalizeKeys(json))
  .map(normalized => lookup(normalized))
  .valueOf();
}
````

We start with the first async function `get`, and then map a plain function
over it that takes the response and returns its text. The result of
that is an async function over which we can then map a plain function
that just parses the JSON. The result of that is another async
function over which we can map key normalization, and so on....

Just as when we declared it explicitly, `transform` is an async
function because the result of mapping an async function _always
returns another async function_. That's [just how Functors work][5].

Notice also that for our mapping functions that just invoke single argument
functions, we can even leave out the arguments:

```js
const transform = $(get)
  .map(response => response.text())
  .map(JSON.parse)
  .map(nomalizeKeys)
  .map(lookup)
  .valueOf();
}
````

Which ever style you choose, the neat thing is that we're building up
an async function out of a bunch of regular plain-old JavaScript
functions with nothing async about them. This gives us a lot of
flexibility if, for example, we want to _add a step to the
pipline_.

Let's say that we want to add a de-duping function in
between the key normalization and the lookup from the data store. All
we have to do is insert it into our pipeline.

```js
const transform = $(get)
  .map(response => response.text())
  .map(JSON.parse)
  .map(nomalizeKeys)
  .map(dedupe)
  .map(lookup)
  .valueOf();
}
````

Pretty neat! But there's one more thing I have to show you, and I
think you're going to like it..

We can use the Functor law which basically says that you can either
map each function individually, or you can compose them all together
and map that function once. In other words:


```js
import { map } from 'funcadelic';
import { pipe } from 'ramda';

let pipline = pipe(
  response => response.text(),
  JSON.parse,
  normalizeKeys,
  dedupe,
  lookup
);

const transform = map(pipeline, get);

```

This is all not to say that there's a single way to do it. Far from
it! But with the AsyncFunction Functor in your pocket, you've got options on your side!

Photo by <a href="https://unsplash.com/photos/Opit9xvZDP0?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Jason Blackeye</a> on <a href="/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a>

[1]: https://frontside.io/blog/2018/02/19/math-is-just-another-framework.html
[2]: https://github.com/cowboyd/funcadelic.js
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
[4]: https://github.com/cowboyd/funcadelic.js#chaining-api
[5]: https://github.com/cowboyd/funcadelic.js#functor
