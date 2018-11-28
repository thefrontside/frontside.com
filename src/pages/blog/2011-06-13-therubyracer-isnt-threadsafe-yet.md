---
templateKey: blog-post
title: The Ruby Racer isn't threadsafe... yet.
date: 2011-06-13
author: Charles Lowell
tags: javascript, ruby, therubyracer
directory_index: false
---

>
> <strike>In which I explain problems unique to running The Ruby Racer in a multithreaded environment,
> which users are affected by these problems, and what is to be done for them.</strike>
>
> UPDATE: This issue has been resolved with [version 0.9.1](http://rubygems.org/gems/therubyracer/versions/0.9.1).
> You should be able to stop reading here, update your Gemfile, and have a great day. That said, please don't
> let me discourage you from continuing down the page. It's riveting.

There have been a number of crashes reported in [several](https://github.com/cowboyd/therubyracer/issues/79) [different](https://github.com/rails/rails/issues/1667) [places](http://redmine.ruby-lang.org/issues/4821) for which [The Ruby Racer](http://github.com/cowboyd/therubyracer) is the culprit. For the most part, these are people running an Rails 3.1 application in a multithreaded webserver such as WEBrick, but as we'll see, it could be anybody that is using The Ruby Racer in a mulithreaded environment. In order to speak to these and future issues
in one place, as well as prevent the spread of any misinformation or impressions, I wanted to very quickly explain what exactly is causing these crashes, who is affected by them and where, and finally how we're going to make them go away.

## Background

When an instance of V8 starts running, it associates all of its global state with the currently running native OS thread. By global state, I mean things like heap storage, stacks, callbacks... everything that it needs to make JavaScript happen. Every time you `eval()` a script or you allocate an object with `new`, it retrieves that state from the executing thread to perform that operation.

In a single threaded application, that's the end of the story. This is because every V8 operation happens from the same thread as the rest of your code, so the V8 state is always right there ready at all times. If you're running your app in a rack server like Passenger or Unicorn that uses a multi-process model to achieve concurrency, you'll never see this crash because you don't use threads. Also, if you're running on MRI 1.8.7 which uses green threads, you will also not be affected. While you may have more than one Ruby thread in your application, you still only have one *native* OS thread which is what V8 will use.

The problem comes in when you are using Ruby 1.9 in a multi-threaded environment and you access V8 from more than one thread. This is because 1.9 uses native OS threads under the covers for its own threading API. When The Ruby Racer starts up V8, it uses whatever thread happens to be running as the home for its runtime data. Then, when you try and do some JavaScript operation from another thread, V8 can't find its state, freaks out and crashes your entire process.

Luckily, V8 does give us some help here. It provides a [locker API](http://bespin.cz/~ondras/html/classv8_1_1Unlocker.html) as a way to deal with threading issues. It acts as both mutex on a V8 instance while at the same time providing a facility to access it from different threads.
We can wrap calls that touch V8 with a `Locker` in order to prevent these crashes. e.g.

    V8::C::Locker() do
      #... code that calls V8
    end

That sounds simple enough: just never access V8 without a lock and you're good. In fact, [ExecJS does this](https://github.com/sstephenson/execjs/blob/b67a563ab4c6e26dc468e948d523456d531463f9/lib/execjs/ruby_racer_runtime.rb#L70-86) whenever it invokes its therubyracer runtime, and it works... almost.

## I would have gotten away with it too if it hadn't been for you pesky GCs

If ExecJS locks V8, then why am I still crashing, and at seemingly random intervals?

The problem comes when we need to run garbage collection. The awesome thing about The Ruby Racer is that it
lets you hold on to V8 objects from Ruby. It does this by using a proxy --a ruby object that implements all its behavior by delegating to an underlying JavaScript object. As long as Ruby holds a reference to that proxy, the proxy will in turn hold a reference to its underlying V8 object. However, when Ruby no longer holds a reference to the proxy and the proxy is garbage collected, we need to tell V8 that we aren't holding a reference to the underlying object anymore. And, as you may have guessed, in order to remove references to V8 objects, you need to hold what? Yep, the V8 lock. To operate properly, GC also needs to lock V8. Sadly, it does not, which explains why crashes continue to happen at random places.

You might be asking yourself, "why not just lock V8 in your GC routines and have done with it?" The answer
is that it would be a terribly dangerous and irresponsible thing to do.

Suppose that thread `A` has V8 locked and is doing some fancy JavaScript stuff. At some point, we do a context switch over to thread `B` which is not doing anything even remotely JavaScriptful like loading ActiveRecords from the database or something. Thread `B` is chugging threw lots of memory, and all of a sudden triggers GC. There are some V8 objects that need cleanup due to our JavaScript activities over in thread `A`, so it tries to lock V8, but uh-oh, thread `A` already holds the V8 lock, so GC may have to wait forever until it becomes available. Deadlock!

The answer is that instead of immediately releasing v8 objects inside the GC thread, we need to equeue them somewhere where they can be released. This probably means starting a thread per V8 instance to consume this reference queue and release them in the context of a V8 lock that isn't contending for any other resources.
While the answer is not trivial, I don't expect it to be that complex.

## What to do? What to do?

In the mean time, there is a [workaround](https://gist.github.com/1011718) for locking V8 with each request, which will ensure that GC running in that request will have already acquired the V8 lock. Bear in mind that this is not a silver bullet, and you still could encounter crashes and deadlocks, but they should be very few and far between. If, as is the case with most people, you are just using a multithreaded server in your development environment but deploy to multi-process model, then this should be sufficient. If on the other hand you run multi-threaded in production, then you should definitely *not* be locking V8 in your middleware since this will effectively synchronize every request. Not a good idea.

No matter which category you fall into, I expect that we'll have a beta fix by the end of this week, and if all goes well, a patch release after another. This may seem like a long time for such a small thing as coordinating locking with GC, but my experience tells me that threading is not a thing best done by humans, and so there will
inevitable stumbles and cursing.

Also, I'm keen to make sure that any solution is both invisible to you the developer, as well as compatible with other Ruby versions and implementations. This deserves some thought.

## What? you're still here?

Alright, time to stop talking and get started with the repairs. I just wanted to take a moment to let you know what the problem was, why it was happening, how're you're affected, what you can do now, and when you can expect a more permanent fix.
