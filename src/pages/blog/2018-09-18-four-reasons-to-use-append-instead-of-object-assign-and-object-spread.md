---
templateKey: blog-post
title: Four reasons to use append() instead of Object.assign() and Object spread
date: 2018-09-18T21:00:00.000Z
author: Charles Lowell
description: >-
  Object.assign is just a special case of a universal concept in functional
  programming. By opting to use a universal function to back this universal
  concept, you can inherit all kinds of awesome for free.
tags:
  - javascript
  - functional-programming
cta_text: >-
  I'm Charles, a developer at Frontside. We offer development, training and 
  support services that will fast-track your foundations in practical 
  functional programming for JavaScript.		
cta_button: "Let's talk!"
img: /img/2018-09-18-four-reasons-to-use-append-instead-of-object-assign-and-object-spread_merge-sign.jpg
---

> Warning! This post was manufactured in a facility that also processes Monoids and may contain traces of functional programming.

I'd like to share with you what is easily one of my top 5 favorite discoveries in programing during the last year: The `append` operation for JavaScript Objects. Before you go looking in the API docs: no, this is not part of the official ECMA Script specification. It's a pattern that I found on the internet and implemented in [funcadelic.js](https://github.com/cowboyd/funcadelic.js). You can use my implementation, or you can write your own, but either way, once you experience how much better `append` tastes than its analogues in vanilla JavaScript, you'll have a really hard time going back.

The TL;DR is that you can use `append` anywhere that you would use `Object.assign` or the [object spread operator](https://redux.js.org/recipes/usingobjectspreadoperator) except it's more awesome. How? Well I'm glad you asked.

### `append` is immutable.

It never changes any of its arguments, only ever creates new objects that are derived from the objects that you give it.

```js
let ingredients = append({ eggs: 2}, { mushrooms: 10 })
//=> { eggs: 2, mushrooms: 10 }
```

I'll not try to convince you of the benefits of immutability here, only say that as programmers, we truck in that most precious of resources: _information_. Why willingly destroy it unless absolutely necessary?

When you use `append` instead of `Object.assign`, you'll never have to pay the overhead of that decision, or worse, accidentally mutate some object you never intended to.

### `append` preserves type.

Every JavaScript object has a runtime type. This lets us define custom properties and operations on it. Unfortunately, if we're making an immutable transformation using `Object.assign` or Object spread, that type information is erased and no matter what we started out with we revert to a plain old JavaScript object.

```js
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get fullName() {
    return `${firstName} ${lastName}`;
  }
}

let misspelled = new Person("Tony", "Stork");

let corrected = {...misspelled, { lastName: "Stark" } }
//=> Object { firstName: "Tony", lastName: "Stark" }

corrected.fullName
//=> undefined
```

Notice how the fact that we're work working with a `Person` object is just thrown into the dumpster? By contrast, `append` always preserves type of object that we were working with before.

```js
let misspelled = new Person("Tony", "Stork");
let corrected = append(misspelled, { lastName: "Stark" });
//=> Person { firstName: "Tony", lastName: "Stark" }
corrected.fullName //=> "Tony Stark"
```

I mean you _could_ throw away the type by default, but why?

### `append` is lazy

JavaScript has a really nice feature called [getters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) or "computed properties" that lets you defer evaluating a property's value until it's actually needed. This can be a great way to avoid computing a property if the dependencies required won't be available until later, or you'd just rather not pay the cost of evaluation until you absolutely need to.

Unfortunately, whatever your reasons, both `Object.assign` and Object spread will interfere with them because they eagerly evaluate each property of the objects being copied over into the result. For example, let's look at these two objects that have computed properties:

```js
let left = {
  get thousand() {
    console.log('calculating 1000 in a really expensive way');
    let i = 0;
    for (; i < 1000; i++);
    return i;
  }
}
let right = {
  get hundred() {
    console.log('calculating 100 in a really expensive way');
    let i = 0;
    for (; i < 100; i++);
    return i;
  }
}
```

Let's see what happens when we combine them with Object spread:

```js
let both = {...left, ...right};
// [LOG] calculating 1000 in a really expensive way
// [LOG] calculating 100 in a really expensive way
```

Or how about `Object.assign`?

```js
let both = Object.assign({}, left, right));
// [LOG] calculating 1000 in a really expensive way
// [LOG] calculating 100 in a really expensive way
```

But we made those properties lazy for a reason! Just because I'm deriving a new object based off of those properties, doesn't mean I should have to evaluate them! Well with `append` you don't. It will follow the guidelines laid down by each object's original creator and keep normal properties normal, and computed properties computed.

```js
let both = append(left, right);
// nothing printed, because nothing evaluated!
// only when we access the properties does the computation run.

both.thousand //=> 1000
// [LOG] calculating 1000 in a really expensive way

both.hundred //=> 100
// [LOG] calculatingc 100 in a really expensive way
```

### `append` is a universal interface.

Remember when I said that I found `append` on the internet? That was true, but it also wasn't the full story. What I _actually_ found on the internet was something far more powerful: the concept of a _semigroup_. A semigroup is (roughly) a type; any two of whose values can be combined with each other to produce a new value of the same type. For example, JavaScript `Array` is a semigroup. I can combine or "append" any two `Array` objects together to produce a single new `Array`:

```js
[1,2] + [3, 4] //=> [1, 2, 3, 4]
```

JavaScript `String` is a semigroup too!

```js
'Hello' + ' World!' //=> Hello World
```

This got me to thinking: what would a semigroup for object look like? What would it mean to take two `Object`s and combine them to produce another `Object`, and the `append()` function that I've been talking about was the inevitable consequence:

1. *Immutable* because this is functional programming, and that's really just a given.
2. *Type-preserving*: because the append operation of Semigroup must return the same type as its arguments.
3. *Lazy*: This isn't _strictly_ a requriment, but as long as we're building an amped up version of `Object.assign` we might as well respect object property semantics, no?

This is all to say that using `append` _normalizes_ this operation to a shared understanding of what a Semigroup is. And in fact, in funcadelic.js, the `append` operation will work on all these types.

```js
append([1,2], [3, 4]) //=> [1, 2, 3, 4]
append('Hello', ' World!') //=> 'Hello World!'
append({ eggs: 2 }, { bacon: 2 }); //=> { eggs: 2, bacon: 2 }
```

One concept, one function, lots and lots of different scenarios. And that's why I started using `append` and haven't looked back since.
