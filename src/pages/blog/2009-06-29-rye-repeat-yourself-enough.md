---
templateKey: blog-post
title: "RYE: Repeat Yourself Enough"
date: 2009-06-29
author: Charles Lowell
tags: 
  - proskillz
directory_index: false
---


Lately, I've been practicing the exact opposite of the DRY principle. Yup, you read that right:  I repeat myself constantly, and in as many different contexts... including code, database schemas, test-plans and even documentation. The reason: So I won't have to repeat myself. It's not that I don't buy into the DRY principle, or that I'm somehow skeptical about the value its proper application yields. I just find it difficult to achieve in practice.

According to the <a href="pragmaticprogrammer.com">Pragmatic Programmers</a> who coined the term:

DRY says that every piece of system knowledge should have one authoritative, unambiguous representation. Every piece of knowledge in the development of something should have a single representation. A system's knowledge is far broader than just its code. It refers to database schemas, test plans, the build system, even documentation.

Essentially it is an empirical measure against which to gauge the proper level of abstraction in your system. If you have not made the right abstractions, then you will be found to be repeating yourself, whereas if you *have* made the right abstractions, then you won't. This is because abstractions *directly encode* the system  knowledge that DRY talks about no less than 3 times in its definition.

The benefits of good abstractions are many and well known, and I'm not going to go into them here (there's always the internet for that), but what I've taken particular heed of lately is that abstraction is a double-edged sword that should not be wielded lightly. Get it right, and the previously intractable dissolves to simplicity in an instant... but get it wrong, and a snarl of complexity gridlocks your code base just as fast.

You see, I wasn't telling the whole truth when I said before that abstractions directly encode system knowledge. It would be more correct to say: *Good* abstractions directly encode system knowledge. *Bad* abstractions directly encode *system ignorance.*

The problem is that the DRY principle, while still very valid and useful, doesn't help us here because  it assumes system knowledge as its input. But really valuable system knowledge isn't just lying around, it must be carefully constructed with significant amounts of research and analysis. That is to say, it must be learned. And what better way is there to learn something than by doing it over and over again until you know it inside and out? What better way is there than trial and error to really *get at the physics* of a phenomenon until you can use it to easily analyze it in all its forms? The fact is, you've got to repeat yourself over and over enough times until you can say with confidence: *This I know to be true.*

You can think of it like doing your math homework, or being like Daniel-San: waxing Mr Miyagi's car again and again until you know karate by instinct. In fact, I'm convinced that there's no other way to generate *real* knowledge.

Ironically, I repeat myself a lot these days because I hate repeating myself. I loathe it with an almost pathological passion, and sometimes (more often then I'd like to admit) it plays to my disadvantage. In my obsessive/compulsive rush to not repeat myself I'll introduce a bad abstraction based on flawed or incomplete system knowledge, and worse still, I won't know that I took the wrong fork in the road until it's way late in the game and it's hard to find the way back home.

That's why I'm playing it cool lately and making sure that I repeat myself enough to *perfect* the system knowledge required to keep myself DRY.
