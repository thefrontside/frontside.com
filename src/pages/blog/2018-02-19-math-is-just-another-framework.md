---
templateKey: blog-post
title: Math is Just Another Framework
date: 2018-02-19T13:00:00.000Z
description: >-
  Functional programming with typeclasses rooted in category theory may seem
  like some esoteric practice reserved for the truly pointy-haired. But guess
  what? You do it every day.
tags:
  - javascript
  - functional programming
  - typeclasses
  - convention over configuration
---

<p>Monads. Amirite?</p>
<p style="clear: both"/>
<p style="clear:both;">And Ugh... Monoids? 🙄 please 🙄</p>

What a bunch of complicated gobbledygook. I mean first off, you have
to have like, a PhD in mathematics just in order to get started with
crap like that, and then if you _do_ decide to put in the work, what's
the payoff? Look, I just make webapps here. The only return I'd
ever see on that type of investment is maaaayybe the dubious honor of
hanging out with developer cliques that fetishize abstruse words like
"Endofunctor" and "Isomorphism." They're so exclusive anyway, and
that's not what I'm about. I build _real_ things, and so this isn't
for me.

Does any of that sound like an internal dialogue you may have had with
yourself at some point in the last few years? I know it certainly
captures the color of my thinking on the subject of formal functional
programming during that time. Sure, I took half-hearted swipes at
understanding things like Monads here and there, but it never really
stuck. And more often than not, I was inclined to chalk it all up to
sour grapes... That is, of course, until I realized something
amazing. I realized that contrary to what I was brought up to believe,
formal FP wasn't something that would forever lie just beyond my
reach.

Imagine my surprise in realizing that not only was this _not_ true, but in
realizing that I had actually been an FP super hero all along;
descended from a long line of FP super heroes. And do you know what
the most amazing thing is? Whether you know it or not, you are
too. Don't believe me? Just listen.

### It all began with a Functor

A Functor? Are you kidding me?

I know, I know. Even now just saying it still makes me want to
giggle. But if you're still doubting your own powers, then Functor
is where the journey begins. That's where it began for me. Because you
know what? If you code for a living, then odds are you use Functors
every coding minute of every coding day. You just haven't realized it
yet.

So Functor is the name, and the concept it references is
"mapping over a structure". There's nothing more to it than that. Functors are things
that can be mapped. End of story. [Arrays can be mapped][1]: Arrays
are Functors. [Observables can be mapped][2]: Obvservables are
Functors. So guess what? Like it or not, if you are comfortable mapping Arrays,
then you are _also_ comfortable working with Functors.

Mapping an Array always returns an Array of the same length, but with
different values at every index. Mapping an Observable always
returns an Observable with the exact same sequence and timing of
states, but with different values inhabiting each state. The general
pattern is that mapping doesn't change the object's structure.

At its core, an Array is nothing but a sequence of indexed placeholders
that contain values. _That_ is its structure, and that's exactly what
doesn't change when you map it. The structure of observables is the timing
and sequence of states coming through a stream, so it's the same
timing sequence that remains intact when you map it. So no matter the
Functor, when you map it, it returns a new Functor with the exact same
structure. In other words:  `S -> S`.

But you knew already that mapping an Array of the same length always
returns an Array of the same length because you've been working with
them for as long as you've been writing code.

### Crouching Promise, Hidden Functor.

> So yeah. I know how to map Arrays. Big deal. How does assigning some
> new name to what I'm already doing actually help me in any
> tangible way? It seems an awful lot like some boring thing to
> remember.

Well, this is where the plot takes an unexpected turn. This is the part
in the story where a chance encounter with a secret Functor plants the
suspicion that perhaps you've been lied to your entire life by the
ones that raised you. Sure, they meant well, and all they ever really
wanted to do was to save you sweat and tears, but in the end the only
thing they actually accomplished was to delay your inevitable
confrontation with destiny.

Here's your first clue: Have you used and/or thought about Promises
lately?

Promises don't have a `map` method, and yet they are nevertheless
Functors. They're the functoriest of Functors that ever were, and
their functorality is as constant and sure as the sun rising in the
east and setting in the west. But how can this be if there isn't any
way to map them? The answer is of course that you _can_ map them. You
just have to use the `then` method to do it. It's this alternatively
named mapping function that makes Promise a secret Functor.

It makes sense when you think about how `then` works. You start with a
Promise of some value that will resolve at some later time, and you
end up with another Promise that has the exact same structure as the
original in that it will _also_ resolve at the exact same time as the
first. The only difference is that the value has been transformed by
the passed in function. Once you come to recognize it, you see that
it's a clear stamp out of the Functor pattern, and that the method
might as well have been called `map` instead of `then`.

And that's when you begin to wonder "what if it _had_ been named `map`
instead of `then`, and explicitly identified as a Functor from the
get-go?" Learning to work with Promises was tricky enough, but what if
you'd been able to leverage the fact that the greater part of working
with them was _strongly analogous_ to working with Arrays? What if
you'd been able to apply everything you knew about mapping Arrays and
bring it to bear on Promises? How much time and mental exhaustion
would it have saved? Looking back at my own experience, it would have
been extraordinarily helpful to have sidestepped the process of trial
and error that happened as my brain settled around the semantics of
Promise.

Here's the rub. The method name `then` is a reference to the timing of
Promise resolution, which of course seems reasonable at first. After
all, it's a good thing for an API to be concrete and descriptive
right? The hidden tradeoff is that the name `then` orients the
API around what makes Promise unique, instead of what makes Promise
_literally like every other Functor_. And there are thousands of
them.

They inhabit so many of the programming structures that
you use every single day, that once you're aware of them, they will
begin to reveal themselves to you. As you start to perceive the common
nature in things like Promise, Array, and Observable, you begin to
re-perceive _all_ of the objects in your world through this new prism. You ask
yourself "Is this a Functor?" and you're shocked by how often
the answer is yes. Plain JS Object? Yes. DOM Element? Yes. Express
middleware? Yes. React Component? Also yes.

And then it hits you.

### Math is Just Another Framework

If you're using Ruby on Rails, and someone tells you about a
`Controller`, it doesn't matter if it's a controller for products, or
users, or blog posts. The mere fact that it's a `Controller` gives you
most of what you need to know about its role and how you can set to
work with it to build the larger application. By the same token, if
someone tells you that some object is a Functor, it doesn't matter if
it's a list, or a tree, or a stream. The mere fact that it's a Functor
gives you most of what you need to know about its role and how you can
set to work with it to compose it into larger structures.

I use Ruby on Rails as an example to illustrate this point because the
framework is synonymous with the concept of [convention over
configuration][5], and that's the fundamental dynamic at play here. But
whereas Ruby on Rails is a framework for web applications, formal FP
grounded in Category Theory is a framework for composable APIs.

Like learning any new framework it's an investment. There are patterns
to internalize and there is abitrary jargon to become acquainted with, but
don't be intimidated. Every framework has its concepts that
seem opaque at first, but you can learn them all one piece at a
time. And once you're familiar with them, the big return is that you
can quickly use typeclasses like Functor to build APIs that compose
well with each other out-of-the-box at zero extra cost. And the best
part is that it's a framework that's 100% portable across
runtimes. Whether you're using JavaScript, Ruby or Python it "just
works" every time.

If you do happen, however, to be working in JavaScript, you're in
luck. I wrote a library just for you called [funcadelic.js][3] that
brings the magic of typeclasses into the reality of everyday JavaScript
development.

Because Functor is just the beginning. Like a programmer
learning Ruby on Rails can start with `Controller` first, and then
move on to `Router`, `Model`, and `Middleware`, so you can you move on
from Functor (at your very own pace) to using Applicatives, Monads, and
Monoids.

So go for it! I remember the first time I took a tree class I'd been
working with and started thinking of it as a Functor. All of a sudden,
the brain-hurty, recursive aspects of the tree were abstracted into
the map method and I was able to relate entire trees to each other
with nothing more than a simple function. I cannot describe the feeling other than
it felt like flying. The ground below was all very familiar because I'd
walked it back and forth many times over the years. The only
difference was that now I had the perspective of ten thousand feet and
the airspeed of a jetliner.

You know the ground too. You walk it every day, and if you're willing
to learn the math framework, the same feeling is waiting for you.

<hr/>

I’m Charles Lowell, and I build UI for a living at [Frontside][6]. If
you enjoyed this post, I’d love to hear from you. You can give me a
shout on Twitter where I'm [@cowboyd][4], or drop me a line at
[cowboyd@frontside.io][7]

[1]: http://127.0.0.1:59477/Dash/wbiryrnu/developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Array/map.html
[2]: http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-map
[3]: https://github.com/cowboyd/funcadelic.js
[4]: https://twitter.com/cowboyd
[5]: http://rubyonrails.org/doctrine/#convention-over-configuration
[6]: https://frontside.io
[7]: mailto:cowboyd@frontside.io
