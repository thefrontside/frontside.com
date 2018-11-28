---
templateKey: blog-post
title: The Ruby Racer Rides Again
date: 2012-12-04
author: Charles Lowell
tags: javascript, ruby, therubyracer
directory_index: false
---

## It began during RailsConf.

My fingers were itching to code, so between sessions I started
tinkering with some of the more fanciful enhancements to
[The Ruby Racer][1] I'd been contemplating as well as wrestling with
a number of long-standing bugs. But what started out as a small
refactoring slowly but relentlessly gained momentum until things
were completely out of control.

By all accounts my hands were steady and the work proceeded in an
orderly fashion. Instead, it was *I* who was out of control.
Personally and psychologically I was helpless to stop myself as line
after line, class after class unravelled before me --each one more
rapidly than before. Soon a critical mass was achieved and boom!
Nuclear. A from-scratch rewrite was underway.

Yes it was a rewrite, but by the time I was aware of it, I was too
deeply invested to turn back.

It's a tichy thing, is a rewrite. Instead of the careful, iterative
approach that serves as law in our profession, you drop everything
and sprint towards the cliff in the hope that you can lunge across the chasm in
in one leap. Once you're in the air there's no going back, and the
possibility is as thrilling as it is real that, like Icarus, you'll
hurtle into the abyss... another unsung casualty of hubris.

The prize of course is a better library that is more stable, has more
features and is easier to build and install, so if a rewrite it had to be,
I did the only thing I could do yield myself to it utterly.

I'm happy to say that it's mostly there there and that, despite some outstanding
flaws, I'll be releasing the next version shortly. But more on that later.
First, what's new?

## Stability

For certain applications therubyracer has been plagued by crashes and memory
leaks that have limited its usefulness to a much smaller domain than
necessary: specifically, low-traffic applications that only instantiate a
single JavaScript context. These problems stemmed from within the library but
also from within Ruby itself.

The Ruby Racer relies heavily on weak references in order to maintain
referential integrity between Ruby object and the JavaScript objects they
represent (and vice-versa). Sadly, the [WeakRef implementation on 1.9 is
completely broken][2]. This is unfortunate because functioning weak
references are sometimes a necessary component for building correct
programs on platforms with garbage collection. Luckily [there are
workarounds][3] which have been deployed while we wait for 2.0.

But that's not the whole story. It would be a shameful misrepresentatio
to lay the bulk of the blame on Ruby's door. Distributed garbage collection
is hard, and The Ruby Racer engaged in all manners of evil hackery and dark
GC foo in order to prevent cycles of garbage from spanning the Ruby and
JavaScript VMs. Sadly, this did not work in the general case, and furthermore,
was not portable to other Ruby implementations (or even Ruby versions).

I've come to realize that to solve these memory problems in the general case
would require each host Ruby platform, as well as V8, to expose a uniform
interface to its garbage collector so that The Ruby Racer can traverse its
object graph in order to detect cycles of garbage. In other words "not
bloody likely."

As a fallback, I've decided to throw up my hands and eschew GC histrionics in
favor of more sane memory management in the C extension combined with an explicit
teardown mechanism for cases where cycles of garbage do occur. e.g.

    context = V8::Context.new
    context['cycle'] = context #oh no, a vicious cycle!

    context.dispose() # Gordion knot is cleaved, sir!

In exchange, we get a kinder, gentler racer that works on MRI as well as
Rubinius, and which you'll be able to rely on in your production processes.

## Resource Constraints

Speaking of production, the upcoming release contains a much more
comprehensive coverage of underlying V8 functionality than every before.

Among other things, you can query the V8 vm for heap usage by young generation,
old generation as well as absolute heap size including executable memory. Not
only that, but you can also place hard caps on each of these numbers. That way
you can contain memory usage and keep your processes under control; even in a
resource constrained environment like Heroku.

## A (hopefully) kinder build

One of the sorest pain-points with The Ruby Racer was the way it built. Prior to
0.11, it had a hard dependency on the [libv8 rubygem][2] in order to provide the
actual V8 library. In retrospect, this was a bad idea.

If you were unable to build the v8 contained in the libv8 gem, then
you were completely hosed. You could not use therubyracer at all. Or, if you
wanted to use a custom v8 patched for security or with tweaked startup data,
then you were out of luck. Finally, it raised an unnecessary barrier
to distributing therubyracer as a binary gem (which I would like to do more of).
If you have a binary version, then why do you need to have libv8 at all?

For these reasons, the dependency on libv8 has been converted to a soft one. If
a compatible version is detected in your rubygems, then it will compile and link
against it. However, if for whatever reason, you do *not* want to use the libv8
gem to build, then that is now your prerogative. The Ruby Racer will search
your system for v8 just like any other library.

The only difference is that if you want to use the libv8 gem, then you will have
to explicitly require a compatible version in your Gemfile.

## More bugs, but not on Rubinius

There are still some outstanding issues on MRI that emerge under a heavy stress of
rapid object allocation and deallocation. As far as I can tell they are related to
to the weakref implementation, wherein MRI gets confused and starts handing back
references to completely unrelated objects. I say "as far as I can tell" because the
subtleties involved lie beyond the frontier of my understanding of MRI internals.
Given my current workload, it is unlikely I will have time to make the necessary
investment in understanding required to completely quash these problems.

Despite this, I'm releasing the new version anyhow in order to support Rubinius more
fully and because I think that even on MRI it will solve more problems than it introduces.

For starters, 0.11 is very stable on Rubinius and that platform is long overdue
for a version of therubyracer that doesn't suck. The Rubinius core team, and [@dbussink][5]
in particular, have been very patient and helpful in helping me resolve all the lingering
crashes both big and small... even going to the trouble of adding checks and diagnostics
to the garbage collector just for my sake. They were even willing and often able to
diagnose problems I was having on MRI in order to make the library for everybody.
If anything, I feel that they deserve a functioning JavaScript environment and it wouldn't
be fair for me to withhold it from them.

On the MRI front, I still think that closing some of the loopholes in the memory management,
the enhanced extensibility, and better build make it worth releasing anyway. I've been
recommending people to upgrade to the beta for almost 3 months and it is almost always the
right decision. Given that I have neither the time nor the inclination to support what I now
consider to be the legacy release, I think it's high time to either shit or get off the
proverbial pot.

If you, or anybody you know has a deep knowledge of MRI internals and would be willing to help
me address these issues as well as others that may arise, I would love to work with you to
knock 'em down.

So this is why I'm releasing version 0.11.0 of The Ruby Racer today. Of course, I may
come to quickly regret it, but that's what `gem yank` is for right?

[1]: https://github.com/cowboyd/therubyracer
[2]: http://bugs.ruby-lang.org/issues/show/4168
[3]: https://github.com/bdurand/ref
[4]: https://github.com/cowboyd/libv8
[5]: https://twitter.com/dbussink
