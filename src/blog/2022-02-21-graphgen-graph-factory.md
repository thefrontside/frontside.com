---
templateKey: blog-post
title: >-
  Announcing GraphGen: the search for the graph factory
date: 2022-02-21T05:00:00.000Z
author: Charles Lowell
description: >-
  Creating fake datasets that resemble real ones is nearly impossible today. That's why Frontside is working on a tool that can generate graphs with coherent data and relationships
tags:
  - dx
  - simulation
img: /img/2022-graphgetn.png
---

From the very beginning of my career until the present day I have relied on fake data. That may sound odd to the uninitiated—especially in a world where that seems overrun with fake data—but it’s true for me and every other developer I know. We couldn’t do what we do—build reliable applications that work every time—without high-quality fake data. 

The first such set I can remember using was `tinydata.sql`, an SQL file that contained an aggressively curated list of INSERT statements that reconstructed a complete and realistic dataset from scratch. “Tiny Data” was quite revered by the developers in the team because it was so critical to both testing and developing apps. Indeed, I had so much respect for Tiny Data that I would often sing to it in the tune of Elton John’s “Tiny Dancer.” Not only did it allow you to see fake high-fidelity receipts and product data for the point of sale application we were writing, but it also let you write tests that could rely on certain records always being present. You were in big trouble if you made a change to the application that was incompatible with Tiny Data because it would instantly disrupt the workflows of more than thirty developers. They would not be happy about it at all.

There has been a lot of progress since those days. We now recognize the value of high-quality fake data, and we intentionally place it at the center of our development practice. Instead of static hand-curated datasets we use factories, and instead of obviously fake names like “Test User 1” we use tools like faker.js to generate random yet realistic values. However, despite these improvements, other problems remain as vexing now as they were back then.

Though I didn’t know the name for it at the time, Tiny Data was what we now call a fixture. And while we all did our very best to make sure that it was always in sync with the app we were developing, we somehow managed to break it pretty often. Invariably the breakage had to do with relationships between rows—or in the parlance of SQL, maintaining the foreign keys. For example, if you wanted to add a `receipt`, then it wasn’t just enough to add a row to the `receipts` table. You also needed to make sure and add a corresponding `product`, `store`, and `clerk`. If you didn’t, otherwise it wouldn’t truly be valid: it might work just fine in the context of a daily receipt listing, but then break if you tried to navigate through to the receipt details page. 

Fast forward twenty years, and it is still the relationship between records that causes the most problems with fake data. Isn’t it odd that while we’ve gotten good at generating realistic data structures, we still run into problems when trying to relate those data structures with each other? Why is that so? And what can we do about it? 

Consider for a moment the critical innovation of tools like faker.js—you use a randomly selected value and yet it feels real. You reach your hand into a bag and draw out a name, an address, whatever you need. But what if we could reach our hand into a bag and draw out a fully formed and realistic graph? In other words, what if the network itself was the fake data and not the individual nodes within it? What would that look like?

This was the question we decided to try and answer in late 2021. The result was `@frontside/graphgen` (https://github.com/thefrontside/graphgen). Like faker.js, it uses a probabilistic approach to generating values—except now the values generated are graphs instead of names or addresses.

Much to our surprise, even in its most rudimentary implementation the tool was instantly powerful. Using a single generated graph, we were able to drive a GitHub simulator, an LDAP simulator, and a custom GraphQL simulator, all of which reported a state of the world consistent with each other. The same user data could be found in LDAP, GitHub, and the custom API.

Most posts announcing a new tool do so at the end of a long journey after which a finished product is presented with a bow on top for general availability. This is not that, because that’s not how we do things at Frontside. Instead, we’re announcing graphgen at the beginning of its creation. We don’t know what form it will take eventually, and there are undoubtedly many challenges to overcome along the way. But we are sure that we’ll create a future where you can summon—in the blink of an eye—a fake dataset nearly indistinguishable from production.
