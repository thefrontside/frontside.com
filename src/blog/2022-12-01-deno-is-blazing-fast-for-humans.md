---
templateKey: blog-post
title: >-
  Deno is "blazing fast" for humans
date: 2022-12-01T05:00:00.000Z
author: Charles Lowell
description: >-
  Every systems claims to be "blazing fast", but does that actually mean faster development?
tags: [javascript, deno]
img: /img/2022-12-01-deno-is-blazing-fast-for-humans.png
---

Are you old enough to remember back in the day when Node.js was the new kid on the block? I am. I remember the excitement of having a dead-simple way to run JavaScript on the server. I remember being intrigued by the prospect of running the same code run on both the frontend and the backend. But above all else, I remember the promise that it was going to be fast. Like, really, really fast. And it was…. sort of.

The code ran quickly enough. The separation of every single I/O operation via callbacks meant absolutely no wait time was introduced into a program without you explicitly asking for it, and compared with other prominent scripting languages of the day like Ruby and Python it was quite the coup. I still recall the first time I ran a node-based CLI and being impressed by the complete absence of any gap between when the command was invoked and when it produced its first output. Here was a tool which not only felt familiar to JavaScript developers, but which also let you build programs that felt really responsive. The response time was so far below the threshold of perception that it soon became customary (to the point of parody) to label every new application or library written for Node.js as “blazing fast.”

But a funny thing happened over time as the ecosystem of “blazing fast” applications ballooned in size: while they ran faster than ever, individually they each became slower and more painful to write and maintain. I often wonder what my 2010 self would say to me if he learned about how regularly I would spend 30 minutes of my day just waiting for a JavaScript codebase to build – sometimes multiple times a day! What would his face convey as I explained to him all of the daily “necessities” that gradually and relentlessly chipped away at his joy?

“yarn install," I imagine myself saying to him a tad defensively. “It’s absolutely critical to maintain dependencies.  You can’t live without it.”

I see him staring back at me impassively, saying nothing.

“TypeScript,” I offer. “JSX too. You don’t know about either of these yet, but trust me, they are incredible time-savers.”

Silence. I’m beginning to feel uneasy.

“Babel?” I say almost sheepishly. “Webpack?”

His face is impassive, save for the single tear that slowly slides down the side of one cheek.

“ESLint!” I shout. “Prettier!” I’m aware of the shrill edge creeping into my voice, but I can’t help it. I’m beginning to feel desperate.

“Thirty minutes?” he whispers, his voice nearly inaudible.

“Relay Compiler!” I plead. “Look, I know that Jest has its own completely parallel build toolchain that is unrelated to production, but it’s a really handy, popular tool!”

He glances down at his watch, shakes his head, and turns away from me.

“Why can’t he see it?” I think to myself. Of course, each little tool we use in our projects these days comes with its own small overhead, and yes, they come with their own configuration mechanisms, and no, they don’t always play nice with each other and cause you to lose a day here and there untangling them from each other, but surely he can see the value in them can’t he?

Unfortunately, the dispute between us can never really be resolved to either of our satisfaction and the reason why is that we’re both right.

From my perspective in 2022, I can plainly see all the clear wins that things like TypeScript and JSX offer, not to mention modern comforts like an established testing framework that Jest provides. But just as relevant to that class of time savers is the feeling of fleetness that Node imbued. And that's his point: how many hours – no, days – have I spent waiting for the code to build? I’ll never get those back.

Luckily now there’s a tool that both of us can get behind. Deno brings together the best parts of 2010 and 2022 and fuses them together for an outstanding developer experience without compromises. You have all the power and speed of a modern JavaScript runtime but none of the time-intensive install and build steps that you have to intermittently run during every portion of the development process. With Deno, you just get the code and run it.

Why and how is that possible? Because Deno is more than a JavaScript runtime. It’s a fully formed software development kit that contains all the tools you need baked right in.

Want to just run a JavaScript file? Easy.

Or perhaps TypeScript? Same.

Linter? Formatter? Yup.

Bundler? Task Runner? Test Framework? Language Server? Check. Check. Check…. and let’s see… yup, check.

It even comes pre-rolled with a cross-compiler to turn scripts into platform binaries, and there’s more pieces of the SDK puzzle being added to it every day.

As a result of all the wins baked in, working on a Deno codebase feels nearly frictionless. The time between when you clone a repository to when you’re running tests or even starting it up is barely noticeable.

So yeah, it’s time to resurrect the cliché – only this time it’s really true. Deno _is_ blazing fast. It runs code quickly to be sure, but even more important than the rate at which it can shove bytes through a CPU is how Deno optimizes _my_ time – and I appreciate that more than anything. That’s what I mean when I say that Deno is blazing fast and why it’s quickly become my tool of choice for JavaScript development.
