---
templateKey: blog-post
title: How Healthy Is Your Build? 
description: "Staying healthy is a lot of work.  Maybe you hit the treadmill before going into the office, and then on the way home you pick up some organic groceries.  But be honest, you probably don't.  Thankfully, maintaining your web application's build health is much easier, and the rewards can be huge!  Take a few minutes to check your build health today: you might regret it if you don't."
author: "Joe LaSala, Ginger Whalen, Elrick Ryan"
date: 2017-08-04 17:43 UTC
tags: continuous, integration, deploy, ci, cd, build, test
image: /blog/2017/08/04/the-importance-of-build-health/creative-commons-heart.png
directory_index: false
published: true
---

When’s the last time you went in for a checkup with your family doctor?  Do you know what your cholesterol level is?  Your blood pressure?  It’s unfortunate that many people can’t answer those questions quickly and honestly.  It usually takes a health scare to prompt people towards that dreaded waiting room with the stale air and old magazines.

Regular checkups are an essential part of healthy living, so why do we put them off?  Why do we ignore symptoms?  Is it because we’re too busy?  Are we afraid of what we might find out?  

We all know what it takes to stay healthy:  be proactive,  practice good habits, monitor your health closely.  We also know that these things are much easier said than done.  I mean, come on!  Who has time to take care of every little wrinkle in the moment, right?  Thankfully, applying these healthy practices to your application’s build health is far less arduous.  That you can handle, and we can show you why it’s worth it.  Let’s get out of the red and into the green!

Our goal?  Master builds that are validated by a comprehensive test suite and pass 100% of the time. In other words, a perfect world.  But hey, it’s easier than eating more kale, cutting out the bacon, and exercising three times a week.
 
So, let’s do a quick checkup.  Don’t worry, no stethoscopes: this is a build check up.  Off the top of your head, do you know how many times your application failed to build last week?  If that number is greater than zero then you just failed your checkup.  If you don’t know the number, you may need to see a specialist.

Fear not!  We can write you a prescription that will get that number out of the danger zone.  Side effects may include happier engineers, happier users, and an increase in code and product quality.  

In order to make a diagnosis, we first have to ask you some questions...

**About your test suite...**

- What is your current test coverage?  Do you enforce a coverage threshold?
- Are you writing good tests?  There are many articles devoted to the finer points of what makes a test “good”, so we’ll leave it up to you to find a definition that makes sense for your team.  Whatever that definition ends up being, make sure you question it regularly and revise it if necessary.
- Are you writing appropriate tests? Do you understand the difference between unit tests, integration tests and acceptance tests?  What about “end-to-end” tests or “smoke” tests?  The nomenclature around these concepts is often overloaded and the concepts themselves are frequently conflated.  Try not to get lost in the woods.
- Are you testing your own code, or vendor code?  Think about it.  You may be surprised.

Hmm, OK.  I see.  Moving on...

**How about your testing strategy?**
 
- Do you have one? What is it?
- Is it just a concept in your procedures manual, or is it a reality every time new functionality is added to your application?  
- How often do you revise your strategy?  How often do you set aside time to discuss it with your team?  Is your testing process as important as development process?
- How often does automated testing take a backseat to feature deadlines?

OK.  Let me just mark that last bit in my chart...  

**Finally, with regard to continuous integration and deployment...**
 
- How often do you push new code to your production environment?
- When you do push to production, how do you do it?  Is there a clear process in place?  How much of that process is handled manually?  Every manual step in your deployment is susceptible to human error.
- Does your deployment pipeline include a CI/CD service like Jenkins, CircleCI or TravisCI?
- Is your CI/CD environment in relative parity with your development environments?

Alright, that should do it!  Thanks for your honesty.  Well, reader, if any of these points gave you pause, then I regret to inform you that your build may be in poor health!  Luckily we caught it early.  You can address this problem now by making a few lifestyle changes.

Good build health starts with a goode test suite.  “System Integration Tests”, “User Acceptance Tests”, “Deployment Pipelines”... if you're not a software developer these terms might as well be medical jargon.  For now we'll just give you the big picture: you have an application, people use the application.  Your test suite needs to account for both sides of that relationship.

We recommend that you pay special attention to acceptance tests, which are tests intended to mimic real user interaction with the application.  Why?  While the benefits of simulating realistic user interaction should be obvious, somehow acceptance tests often get overlooked.  For example, [this survey](https://embersurvey.typeform.com/report/GmJTvy/S9Nt) showed that only _24%_ of respondents were testing their Ember addons with acceptance tests.  That number should shock you.  Out of all the varieties of tests that a developer can write, acceptance tests are those that most closely mimic user interaction.  What’s more important than the real-world user interaction?

Finally, remember that a good test suite will benefit your employees, your users, and your stakeholders.  In fact, an automated test suite is really just one expression of a concept that probably permeates your organization more than you realize.

- When a product manager writes requirements for a new feature based on customer feedback, they’re writing "acceptance criteria".  What are acceptance criteria if not a human-readable test suite?  
- When the engineer sits down to write the feature, the corresponding acceptance tests should closely resemble the acceptance criteria laid out by the product manager.  
- A QA specialist can use these specifications as a roadmap for testing the feature manually.  
- A technical writer can use this outline as a jumping-off point for user-facing help documents.

This same pattern appears, in one form or another, at nearly every level of the modern software development workflow.  If you can understand this pattern as a “common language” between your departments, you will also understand how much the individual units of your team depend on each other.  That means that a healthy build can lead to increased efficiency across the board, but neglecting your application’s build health can jeopardize your product at many levels.

Nobody likes surprises.  Not at the doctor’s office, and not when deploying an application.  So get on the right track to good build health today!  Say goodbye to white-knuckle releases and on-call experts.  Imagine the peace of mind that comes with comprehensive test coverage.  Imagine all the time you'll save with a realiable, automated deployment pipeline!  That’s time that you could use to maintain your _actual_ health.  Take this advice and you’ll be able to hit that _merge_ button with confidence, then hit the treadmill while your application hits the web.

<hr/>

Interested in talking more with us build health, or anything else software related? Get in touch [on our website](/contact), or reach out to us on twitter at [@thefrontside](https://twitter.com/thefrontside). We'd love to hear from you!
