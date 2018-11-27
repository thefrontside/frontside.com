---
title: We must come together to honor the command line
date: 2010-11-14
author: Charles Lowell
tags: ruby
directory_index: false
---

I reap no joy from writing command line interfaces in Ruby, and about 5 minutes before leaving RubyConf this year I realized that I am not alone.

It's not angst I feel so much as a general _"meh"_: There's a fairly decent out-of-the-box way to do it in `OptionParser`, but the minute you want to introduce commands is when the muddling begins. Sure you can see
your way through it, but it's never robust and you always get smacked in the ass by the edge cases that
inevitably come along.

## It ain't for lack of trying

My own abortive attempts not withstanding, I've tried in the last year at least 3 different libraries for parsing CLI options in my applications and gems. These are
[gli](http://github.com/davetron5000), [thor](http://github.com/wycats/thor) and [optitron](http://github.com/joshbuddy/optitron). I have known and loved each of these libraries in its own way, but ultimately all of them left me feeling unsatisfied. I won't go into my specific dissatisfactions with each here, but suffice it to say that my malaise was shared. The general consensus of the
cohort at the bar was that despite the recent innovations and improvements in the space, we'd really have just been better off with
"`OptionParser` plus commands."

## But we should do better

Better off for sure, but is that still what we want: to just get by?

No. we need a way to write command lines that feels like judo: deploying minimal force to effortlessly sling mountains of code.

I say we can have our cake and eat it too. I say our command lines can be easy. I say our command lines can be sexy. I say our command lines can be so awesome that they crap rainbows and have herds of unicorns come thundering out of their asses.

That's why I'm starting the [optimal](http://github.com/cowboyd/optimal) project. It may lead to nothing. It might even lead eventually to some code... that's not the point right now though. The point is to reach out to everyone who feels strongly about this and ask them to contribute ideas and requirements in order to build a consensus on the next generation of CLI builder that everybody can be proud of.

It certainly will not happen overnight, but for the betterment of all, it's high time to find the true successor to OptionParser: the one the community sees eventually integrated into the standard library.
