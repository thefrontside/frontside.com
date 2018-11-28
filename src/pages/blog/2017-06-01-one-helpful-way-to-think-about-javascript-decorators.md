---
templateKey: blog-post
title: One Helpful Way to Think About JavaScript Decorators
description: JavaScript decorators are coming, but what are the class of problems which they're useful for? In this brief tour of decorators, we'll try to answer that question by contrasting them with comparable technology from other languages.
author: Charles Lowell
date: 2017-06-01 17:43 UTC
tags: 
  - javascript
  - clojure
  - macros
  - decorators
image: /img/2017-06-01-one-helpful-way-to-think-about-javascript-decorators_russian-dolls.jpg
directory_index: false
published: true
---

Why Decorators?

It is an important question; one many tutorials rush past in their hurry to talk about the _what_ and _how_. Of course, after being exposed to enough doses of _what_ and _how_, you can usually piece together _why_, but in my experience it saves time to just hear it up front. I'd like to share one of the ways I've come to think about decorators and how it's helped me think about when to use them.

So like every good meta-discussion of JavaScript, let's start by
talking about Clojure. Don't sweat it if you don't know Clojure,
that's totally _ok_. The examples are very simple and only there to
illustrate a bigger point.

Anyway, back to Clojure...

In Clojure, one way to associate a name with a value is to use the `def` form:

```clojure
(def message "hello computer")
```

After that declaration, subsequent code can refer to the string `"hello computer"` just by using the symbol `message` instead.

The ability to associate names and values is a pretty handy thing in programmming, and it turns out you can do something very similar in JavaScript too. You might write something like this:

```javascript
const message = "hello computer";
```

Another thing that Clojure has support for is function values:
functions that can be passed as either an argument to, or the return
value from, another function. You can declare a function value that
adds its operands together with the following syntax.

```clojure
(fn [x y] (+ x y))
```

Not to be outdone though, JavaScript also has support for first class functions, and it's syntax is even a little more concise than Clojure's too! This is it here.

```javascript
(x, y) => { return x + y; }
```

Both of these are examples of _anonymous functions_. Function values that can be passed around as one-offs to other functions. It's handy, but sometimes it's not enough.

Often what we want is to associate a name with a function so that we
can call it again and again. In the same way we associated the name
`message` with the string value `"hello computer"` so that we could
access it repeatedly just by referring to `message`, we can associate
a function value with a symbol so that we can reach for it over and
over just by remembering its name. To do that, we use the two
constructs just introduced (`def` and `fn`):

```clojure
;; associate the symbol `add` with the function to add
(def add (fn [x y] (+ x y)))

;; and now we can call it by name.
(add 1 1) ;;=> 2
(add 4 3) ;;=> 7
```

Just like before, a parallel construct exists in JavaScript. No suprises there.

```javascript
// associate the symbol `add` with the function to add
const add = (x, y) => { return x + y; };

// and now we can call it by name.
add(1, 1) //=> 2
add(4, 3) //=> 7
```

But of course, this pattern of associating a name with a function is so prevalent that both Clojure and JavaScript have a special syntax to both declare a function _and_ associate it with a name in one fell swoop. In Clojure you use `defn` (literally the conjuction of `def` + `fn`)

```clojure
(defn add [x y] (+ x y))
```

And you're probably already familiar with how it's done in JavaScript with a `function` declaration.

```javascript
function add(x, y) { return x + y; }
```


## There's a point to this. I promise.

So I just explained named functions in both Clojure and JavaScript. Big
whoop.

It's such a simple idea and an equally simple mechanism. And on the surface they seem equivalent in both languages, but there's one key difference between the way the named function syntax works in JavaScript and the way it works in Clojure. Both syntaxes declare a function value, and both associate that function value with a name so that it can be referred to later.

The _difference_ is that in JavaScript the syntax is implemented by the JavaScript parser and interpreter, whereas in Clojure the syntax is implemented in Clojure.

## A Macro Says What?

That bears repeating. In JavaScript, the syntax is implemented by the
JavaScript parser and interpreter. More than likely that means baked
in with some C or C++ code somewhere. Beyond the implementation, it
means that there needs to be a
[specification for the syntax as part ECMA standard](http://www.ecma-international.org/ecma-262/6.0/#sec-function-definitions)
so that any of the multiple engines can be sure to get it right.

<figure class="figure" alt="a picture of the twenty seven line specification of function syntax in BNF format on the Ecma website">
  <img class="figure-img img-fluid" src="/img/2017-06-01-one-helpful-way-to-think-about-javascript-decorators_function-syntax.png">
  <figcaption class="figure-caption"> <em><strong>Figure 1:</strong> Put this in your C++ and smoke it</em></caption>
</figure>

Contrast this to Clojure in which the named function syntax is nothing but more Clojure code. It's easy to understand not only for programmers, but also for any alternative implementation of Clojure (such as clojurescript). It's a nifty trick that saves time, adds clarity and eliminates ambiguity. How does it work? The answer is macros.

Macros are powerful, but they aren't fancy. A macro is just a function like any other function, and if you can work with functions, then you can work with macros.

There are two things that make a macro function special though. The
first is that the type of its arguments and the type it returns are
not general values _but source code_. That means it takes code in as
its input, and returns code as it's output. Here's a couple of
familiar functions along with their (pseudo) types for comparison. `map` takes an array as its input, and returns another array. `sum` takes an array as input, and returns a number. `defn` takes code input and returns more code.

```
map :: Array -> Array
sum :: Array -> Number
defn :: Code -> Code
```

The second thing that makes a macro function special is that it doesn't run when the rest of your program does; it runs when your program is being compiled. When the compiler encounters a macro, it calls it, and then replaces the macro with the code that got returned.

<figure class="figure" alt="the arguments to a macro function are the unevaluated source code">
  <img class="figure-img img-fluid" src="/img/2017-06-01-one-helpful-way-to-think-about-javascript-decorators_defn-arguments.png">
  <figcaption class="figure-caption"> <em><strong>Figure 2:</strong> The arguments to a macro function are unevaluated source code</em></caption>
</figure>

In fact, this is how the `defn` macro works. It literally replaces

```
(defn add [x y] (+ xy))
```

with

```
(def add (fn [x y] (+ x y)))
```

<figure class="figure" alt="defn consumes its arguments and returns
  new source code containing those arguments">
  <img class="figure-img img-fluid" src="/img/2017-06-01-one-helpful-way-to-think-about-javascript-decorators_defn-mapping.png">
  <figcaption class="figure-caption"> <em><strong>Figure 3:</strong>
  The defn macro takes code as arguments and returns more code</em></caption>
</figure>


The point here is not to geek out too hard on Clojure macros, but to
show just how much more you can do with so much less when your
language has first class support for transforming code into other
code. Large swaths of what we think of as Clojure syntax is actually
defined with Clojure. The syntax it does have baked in works
harder. There's no need to change the way the compiler works, and
_certainly_ no slog through a potentially contentious
[specification by committee](https://github.com/tc39/ecma262#ecmascript).

Wouldn't it be nice if JavaScript let us do something similar? Wouldn't it be nice if we could extend JavaScript syntax with just a few lines of JavaScript code instead of years spent shit-posting on the internet?

## Decorators to the rescue

The answer is that with decorators we can... almost. To be clear, decorators are _not_ lisp macros. They're less powerful and they operate in a much smaller niche. But even so, they're an exciting development because there is just enough overlap with macros to make them helpful in the same kinds of situations.

That's because, like a macro, a decorator is also _just a function_. And also like a macro, it's a function that operates on code _before_ the rest of your program sees it.

```
@decorator :: Code -> Code
```

Like a macro, we can use this to add the new syntax we always wanted to our JavaScript classes.

For example, I've often wished that there were an `immutable` keyword in JavaScript that made it impossible to change member data of an instance once it was constructed. Wouldn't it be great if you write a class like this?

```javascript
immutable class Circle {
  constructor(radius) {
    this.radius = radius;
  }

  get area () { return Math.PI * this.radius * this.radius; }
}

let circle = new Circle(5);
circle.area //=> 25π

// can't do this!
circle.radius = 10 //=> Error!
```

I think that would be awesome, and if you feel the way I do, then you've got two options:

A. Begin your submission to the TC39 (you'd better get on it if you
want to hit your deadline in three weeks!)

B. Do it now with decorators.

Decorators can help us get the syntax we want today because they let
you transparently transform the code that you _see_ into the code that
you _want_. In the case of our `immutable` keyword, the code is a
class. In other words, we want to take the class that we _see_
(mutation allowed) and convert it into the class we _want_ (no
mutation allowed)

The class we _see_ has this constructor:

```javascript
class Circle {
  constructor(radius) {
    this.radius = radius;
  }
}
```

But the class we _want_ has this constructor:

```javascript
class Circle {
  constructor(radius) {
    this.radius = radius;
    Object.freeze(this);
  }
}
```

If we can write a function that takes the former and returns the latter, then we're in business. Luckily, this is pretty straightforward. In order to make an immutable version of any given class, we can extend it, and then make a call to `Object.freeze` after invoking the original constructor.

```javascript
// @immutable :: Class -> Class
function immutable(Class) {
  class ImmutableVersion extends Class {
    constructor(...args) {
      super(...args);
      Object.freeze(this);
    }
  };
  return ImmutableVersion;
}
```

We now have a function that returns an immutable version of any class, and so now we can just use it as a decorator; almost like we were creating our own syntax.

```javascript
@immutable class Circle {
  constructor(radius) {
    this.radius = radius;
  }

  get area () { return Math.PI * this.radius * this.radius; }
}
```

Our JavaScript interpreter will see this and transparently convert the `Circle` class that we see into a different one; one that prohibits any mutation of its member data after construction.

Decorators aren't just for entire classes. They can be used to enhance individual members of as class as well and transform them transparently into something more powerful. For example, since the `area` of the circle is a computed property, it won't be enumerable by default.

```javascript
Object.keys(new Circle(5)) //=> ['radius']
```

That doesn't seem quite right. Shouldn't `area` be in there too?

What would be really nice if if JavaScript had a keyword to make any property enumerable. E.g.

```javascript
{
  enumerable get area() { return Math.PI * this.radius * this.radius; }
}
```

It doesn't of course, but with decorators we can change that. We'll
just write a member decorator: a decorator that operates on
[property descriptors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
instead of classes. We can write an `enumerable` function to take the property descriptor we _see_ (non-enumerable) and return the property descriptor we _want_ (enumerable). This is accomplished simply enough by returning a new descriptor exactly like the old one, except with the enumerable key of the descriptor set to `true`.

```javascript
// @enumerable :: Property -> Property

function enumerable(target, key, descriptor) {
  return {...descriptor, enumerable: true};
}
```

With this in hand, we can mark the `area` property as enumerable, just as though the syntax had existed the whole time.

```javascript
@immutable class Circle {
  constructor(radius) {
    this.radius = radius;
  }
  @enumerable get area() { return Math.PI * this.radius * this.radius; }
}
```

Declared this way, circles will let you know that they have an area in addition to a radius:

```javascript
Object.keys(new Circle(5)) //=> ['radius', 'area']
```

Easy!

## Decorators FTW

And that's it! My goal with this brief tour of decorators isn't to
show you the ins and outs of how they work, but to share a helpful way
to think about them and when they might be the right tool to reach
for. While decorators are not lisp macros, it's useful to think about
them as a spiritual grandchild in the sense that their biggest power
is to _transform the primary artifacts of your code before the rest of
your program sees them_. Rather being locked into a given syntax, the
interpreter is open to extension, and you can negotiate with it for a
new set of semantics.

In a way, by including decorators and allowing them to stand in for
many of the use-cases where a new syntax might otherwise be desirable,
the ECMAScript specification is firing itself from its primary
responsibility of evolving the core language. What previously might
have taken months or years, can now be done in a matter of minutes or
hours; a huge roadblock gone that has historically stood in the way of progress.

For individual developers, decorators let us work with a lighter touch; applying just a little bit of new syntax to make big transformations, but all the while preserving the core intent and readability of our code.

<hr/>

I’m Charles Lowell ([@cowboyd](https://twitter.com/cowboyd) on twitter), and I build UI for a
living at [Frontside](http://frontside.io). If you enjoyed this, I’d love to hear
from you. We're always [hiring](http://frontside.io/careers/) and
looking for [exciting new work](http://frontside.io/services/)
