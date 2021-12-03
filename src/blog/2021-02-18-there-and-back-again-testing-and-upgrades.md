---
templateKey: blog-post
title: >-
  There and Back Again: Testing and Stack Upgrades
date: 2021-02-18T05:00:00.000Z
author: Taras Mankovski
description: >-
  Upgrading your application stack to new major versions can be terrifying, especially when you have a massive application with 75 developers working on features non-stop. However, a good testing strategy gives you confidence to make bold moves that take your organization to heretofore unexplored lands.
tags:
  - testing
img: /img/2021-testing-rings.png
---

Upgrading your application stack to new major versions can be terrifying, especially when you have a massive application with 75 developers working on features non-stop. The situation gets more complicated when you also have important deadlines pressing down on you, new defects popping up every day, mounting tech debt, and 30% of the team is new to the company. What should be prioritized and what can wait? My call in 2018 was none of the above. Instead I reached for J. R. R. Tolkein for inspiration to find the one “ring” that would address all these issues in one fell swoop. After surveying the options I put automated testing at the front of the queue. But unlike in _Lord of the Rings_, automated testing didn’t cause more problems than it solved – in fact my decision paid off big time.

I was hired by a major bank who had recently acquired a development firm in India and was facing tough challenges within their engineering organization. They had brought in several consulting firms to do staff augmentation, and everyone was doing their best to keep hitting delivery targets. But every step forward seemed to be met with two steps backward, and the quality of the product was in decline. They started to look a lot like Frodo and Sam going in circles on their way to Mordor. 

It turned out that part of the problem was that the application was being built on top of an early and balkier version of modern JavaScript. A newer version of the framework allowed lazy loading parts of the application, which could solve performance issues that they were experiencing. Upgrading was both necessary and urgent so the team could use open source solutions that were available without requiring them to completely rewrite the application.

But how do you go about upgrading an application that is under active development? First of all, you need a way to tell that everything works properly throughout the upgrade process. There were more than 10 rounds of upgrades to perform to take the app to the most recent one, and each one might prove to introduce complications rivaling those that Saruman put in the way of the Fellowship of the Ring. Frodo and Sam went on foot to Mount Doom, but as anyone familiar with the epic knows their journey was interminably long. Manual tests would face the same fate, making the upgrade process impossibly slow, especially in light of the size of the app in question.

What we needed was a test suite and a robust one at that. The codebase had a few unit tests sprinkled here and there but they didn’t inspire any more confidence than the “assistance” of Merry and Pippin did. QA had a test suite but it was too slow and unreliable to run on every commit. We needed one that developers could use locally, that would run quickly on CI, and that would give us the confidence that we didn’t break anything. Our tests had to put the whole app under the microscope and ensure everything worked correctly from the users' perspective. This is what I call “testing big.”

Building that test suite was the problem that we had to address first. It took a good deal of convincing to get their technical leadership on board with prioritizing testing in the midst of so much pressure. When I first floated my proposal to switch gears and prepare tests in order to upgrade the application stack, the architects in the room looked at me as if I was as crazy as Frodo in setting out to destroy the ring.

Yet I was confident that robust testing and a sound tech stack was the most urgent need for the company to address. Developing a test suite is relatively predictable, and once you have tests that you can trust, even scary upgrades become predictable. My confidence in testing did not come from a false belief in my own ability but like Frodo from a belief in those around me. In this case it stemmed from the experience of the entire Ember.js community and ecosystem, which had made testing a fundamental part of their mindset. The framework the client was using was Ember 1.13 and we were aiming for 2.8 – an impossible task in the eyes of many at the company. But what they were not aware of was the framework’s hidden strength: seamless upgrading thanks to automated testing. The combination of the two is very effective, and community surveys show that [41% of the users use the most recent version, and more 80% use the latest major version](https://emberjs.com/ember-community-survey-2019/#MS_Q401).

I was on site in Bangalore leading the team who would be responsible for writing this first test suite. The client assigned six engineers to the newly formed team – those who had the most knowledge about the app. We had six weeks to succeed or die trying.

We first developed a test harness, which required creating simulation mechanisms for authentication and the backend responses. The process was a great learning experience, as we discovered patterns in the app and found implementation problems in several sections. By the end of our time together we had finished the test harness, refactored the application to use tests, and had guidelines for creating new tests. After a celebratory dinner of masalas I’ll never forget (no lembas bread for us) I returned home to Canada. In the meantime, the team managed to merge all the new features that had been put on hold while they were writing tests. Better yet was the fact that they were able to use the test suite to make sure that the new features didn't break anything in the app – a wholly new experience for the team. They additionally had developed strict testing policies to accept new PRs.

Once the codebase was fully tested and stable, I returned to Bangalore to drive the upgrade process. The process was predictable as we were following deprecation warnings progressively, and fixing failing tests as we moved along. The team discovered many unpleasant surprises in the codebase as we refactored through the app. Just as Frodo grew in his knowledge as a result of his journey, I used those cases as learning opportunities to explain to the team why change in their development process was necessary. But we were able to go through two years of evolution of the framework smoothly in just six weeks. 

Not only did we do a massive upgrade, we had tested the entire application and developed a testing mindset across the frontend team. And this was all done by a small team who had no prior experience testing or upgrading tech stacks. 

Long story short: investing in your test suite pays off, but you need to make sure that that investment is covering your business value: your users. Testing big gives you confidence to keep pushing forward, knowing that you can try new things because your app functionality is protected. Without the fear of costly mistakes your creativity increases, and like Frodo you have more time to make bold moves that take your organization to heretofore unexplored lands. 

<aside class="posts-list-list">
  <h2>Related article:</h2>
  <div class="posts-list-entry">
    <h3 class="posts-list-title">
      <a href="/blog/2020-triple-threat-to-testing-part-1-speed/">
        The Triple Threat to Testing — Part 1: Speed
      </a>
    </h3>
    <p>
      Speed, reliability, and relevance constitute the mains pillars of a robust testing strategy. The faster a test suite can diagnose an issue in its application, the more value it renders. In this article, we navigate through the most significant causes of slow tests and suggest ideas to deal with them.
    </p>
    <a href="/blog/2020-triple-threat-to-testing-part-1-speed/" class="post-link">
      Continue reading
      <span class="post-link--arrow">→</span>
    </a>
  </div>
</aside>
