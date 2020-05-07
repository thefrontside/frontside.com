---
templateKey: blog-post
title: >-
  The Triple Threat to Testing — Part 1: Speed
date: 2020-04-06T05:00:00.000Z
author: Charles Lowell, Robbie Pitts, Taras Mankovski, Jeffrey Cherewaty, Jorge Lainfiesta
description: >-
  Speed, reliability, and relevance constitute the mains pillars of a robust testing strategy. The faster a test suite can diagnose an issue in its application, the more value it renders. In this article, we navigate through the most significant causes of slow tests and suggest ideas to deal with them.
tags:
  - testing
img: /img/2020-triple-threat-to-testing-part-1-speed.png
---
![The Triple Threat to Testing — Part 1\:Speed](/img/2020-triple-threat-to-testing-part-1-speed.png)

Writing tests is like paying taxes. And much like how attitudes vary towards paying taxes, attitudes diverge widely in development circles about writing tests. Some people dread paying their taxes; much in the same way as some developers would rather cut off their arm than spend time testing an app. Other people willingly pay their taxes because of the benefits they confer, like drivable roads, health care and national defense. In similar fashion there are those developers that look forward to testing because of the protection in gives against regressions and the confidence it inspires when making changes. You'll even find people who argue that there’s something inherently good in paying taxes and writing tests—a moral obligation if you will.

But just like people debate the merits of taxes, developers argue over the value of tests. Some claim that they don’t need tests while others think they are so important you should write them before anything else. There’s no consensus in part because tests vary widely across technologies, projects, teams, and organizations. One thing is for certain, however; just like taxes take money out of your pocket, testing imposes a variety of costs on your organization and your development team. 

We’re not writing to convince you about the value of testing any more than we’re here to convince you to pay your taxes. But I think we can all agree, that if you _are_ going to pay taxes, then you should expect the _best governance_ in return. So when it comes to testing, our experience has show us that if you _are_ going to invest in tests, there are three essential make-or-break factors that will dramatically affect how much benefit they will bring in exchange for how much burden they pose. 

The first factor is the most obvious: speed. Slow tests are literally a drag on teams and organizations.

<aside class="blog-post--saga-box">
The second part is out! Check out how <a href="https://frontside.com/blog/2020-triple-threat-to-testing-part-2-reliability/" target="_blank">Reliability directly impacts your test suite</a>, as well as common causes of test flakiness.
</aside>


## Why Speed Matters

In the stock market, information services offer different pricing schemes around speed. You can wait and get information for free in a minute or pay to get data within seconds. But if you want information with minimum latency the price tag goes through the roof. Why? The infrastructure to make this possible is more expensive and the value of knowing something before others is very high. 

Speed gives brokers a competitive advantage, and the same is true when it comes to testing. How rapidly a test can diagnose issues in your application can make all the difference. Because tests determine the minimum rhythm at which developers can discuss the results of their code, the speed of a test suite scales up to affect the entire organization. A Pull Request whose test suite takes 1 hour to run sets a plodding pace not just for the development team but product and design teams as well.

What’s worse is that when tests don’t deliver results fast enough, a developer working on a feature loses the thread of the problem the test was intended to help solve. This dynamic quickly leads to frustration and causes developers—who are inherently problem-solvers—to find work-arounds that essentially avoid testing altogether. Whatever you think about testing, we can all agree that a test suite should be fast enough not to break the context under which it’s being run. An unused test suite isn’t a test suite at all.

With this level of dysfunction you’d think that improving test speed would be at the top of everyone’s to-do list. Yet if you ask around it seems like we have just accepted that tests are slow and have learned to adapt to their plodding pace. Some teams decide to run only a few tests on every PR through CI, reserving the whole suite for ‘important’ builds. Other teams choose from time to time to not even bother running tests locally. 

These reactions are typical and even make sense: waiting for a test suite to run is boring and non-productive, like standing in line at the Department of Motor Vehicles. What’s worse is that you have to go to the back of the line time and time again when the scripts you are running produce results that are flaky. It’s depressing when the development process—which at its core is an essentially creative process—has come to feel bureaucratic as a result of testing.

## What’s slowing down the test suite? 

We have all experienced slow test suites. Maybe you’re even reading this article while your PR is running tests. Understanding why tests take the time they do allows developers to pre-emptively act and make them more effective and useful while also making them faster. In fact here are things developers can do right now both application-wise and with regard to test strategies to improve the speed of tests.

### "Slow" Front-end Apps 

User interfaces are supposed to be used by humans, but when a machine uses them they reveal their underlying performance issues. A person furiously tapping your app buttons as fast as they can will not match the speed of a machine. Not even developers themselves – who know exactly where each button is located – can assert the state of the app as fast as a script. That’s why slow loading and reacting UI elements are invisible to us most of the time.

When you run a test the machine will always be limited by the speed of the application. On every simulated interaction and on every assertion, the test runner waits: it waits for code to be loaded and parsed, for elements to appear, for APIs to load, or for interactions to happen. Repetition scales up the natural latency of an app until it becomes noticeable. 

*Right now you can do the following in order to streamline front-end apps*: 

- **Check the [Time to Interactive](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive) of your application** You may be loading too many things on the entry point of your app: user profile, dynamic navigation segments, analytics scripts, and more. Consider if there’s something you shouldn’t be using within the test context (like pixel scripts for marketing).
- **Disable non-test-related latency**: for example, unless you’re testing the animation itself, you can consider disabling animations in the testing context. Animations just mean waiting time for the test runner in most cases.
- **Evaluate the overall performance of your app**: this seems obvious, but sometimes it pays to stop and contemplate what's right in front of you. If the test are painfully slow, then perhaps your app is slow, and an investment in making it more peppy will yield dividends for both your developers and your users.

### Slow Build times

The first step of a test suite usually involves generating a fresh build of your app in the context that you choose. Although this is a time cost that the test suite generally only has to pay once, it is still a major factor in how soon developers can get test results. A fresh build can take up to several minutes – the equivalent of eons in computer time.

Most applications today use a bundler like webpack to take the application code (and its libraries) and transpile it, minimize it, optimize it, modularize it, and do whatever other cool process the development team has chosen. As the application grows, the build time may grow non-linearly if they are not mindful of how they create the bundle itself. And if running a test requires spinning off a Kubernetes instance or installing a full-blown database, you can expect even longer wait times before you get any results from your test suite.

*Right now you can do the following in order to speed up build times*:

- **Budget for performance improvements**: build times tend to be a boiling problem: as features are constantly added, the time increases without anybody noticing. Performance improvements are typically triggered only after somebody complains about the tools being too slow. We recommend having a performance budget to proactively improve the build times; otherwise you might find yourself returning to re-write the build script again and again.
- **Evaluate your test environment**: check with your team if you can simulate parts of the test environment (for instance, use a tool like [Mirage.js](https://miragejs.com/) instead of using a real database).

### Not specific enough entry points

Web applications are attractive because you don’t need to install anything to use them: you just hit a URL and you’re ready to do what you want. The URL is the entry point for a web application. Most people access the app through the root `/` and then navigate their way around. Advanced users may even know the URLs they care about and go straight to it (`/p/{my-crush}` or even `/p/{my-crush}/photos`). Using more specific entry points saves time of navigation to users, and can save time when testing. 
 
Let’s imagine a developer wants to test a confirmation modal that shows up after a user attempts to change their Address in the user Profile, under the Personal Details tab. If, you have to manually follow all the interactions from the homepage to check if that the modal appears (as in the code below) your tests will take longer.

```js
visit('/');
click('[navigation-login-button'];
waitFor('[login-form'];
fillIn('[login-username]', 'username');
fillIn('[login-password]', 'password');
click('[login-submit']);
waitFor('[logged-in-user]');
click('[navigation-my-profile]'];
waitFor('[profile-navigation]');
click('[profile-navigation-personal-details]');
waitFor('[personal-details-form]');
// Now we are finally ready to test what we care about
fillIn('[personal-details-form-address]');
click('[personal-details-form-submit]');
assert.ok('[personal-details-confirm-modal]');
```
That’s a lot of actions for one assertion – 10 that are unrelated to the test, and several of them involve waiting. If there are four scenarios you want to test about the behavior of that model, that’s 40 time-consuming and unnecessary actions. 

Instead you can make use of your router and set up an authentication mechanism that allows you to easily set the application in an authenticated state. Then your test would be simplified and much faster:
```js
simulateAuth('user');
visit('/profile/personal-details');
fillIn('[personal-details-form-address]');
click('[personal-details-form-submit]');
assert.ok('[personal-details-confirm-modal]');
```

*Right now you can do the following in order to improve entry points*:

- **Evaluate your routing strategy**: in many cases using more routes with specific contents is not only good for tests but also helps deliver a better user experience.
- **Simulate authentication**: discuss with your team the best strategy to simulate authentication in your application, from using a framework specific tool to manipulating local storage directly (while not forgetting to take security considerations into account).

### Waiting too much, waiting too little

Asserting the state of a web application is like playing the street basketball game 21. The first team to score exactly 21 points wins; but if they go over their score is reduced by 11. Assertions are similar in that you must make them at a specific moment in time: if you don’t hurry up you lose precious time, but if you miss the mark you’re stuck with more waiting and have to try again. 

Web applications perform a lot of tasks asynchronously: loading files, fetching images, calling APIs and recording analytics to name a few. That’s why waiting is such a tricky part of testing user interfaces. There’s no exact fixed time intervals in the way elements are rendered because they depend on many other elements and which client is being used. There’s also external dependencies like server requests that may take variable amounts of time.

Sometimes developers can set tests to wait too much. For example, to make sure an element was rendered in the page we can make our test wait for a fixed time interval like `wait(‘500ms’)`. But if that element appears in `25ms`, we would be wasting `475ms` which add up rapidly through the whole test suite. Other times developers can waste time setting the test to wait on the wrong element, which could imply waiting longer than the minimum required for what we care about for a particular assertion.

Of course other times developers wait for too little time, using a fixed time interval that simply wasn’t long enough to render the element and causing an error when interacting with it. Depending on the tool we’re using, we can try again and re-run the waiting or get a test failure. In both cases we lose time because of inadequate waiting. 

*Right now you can do the following in order to find the sweet spot for waiting*:

- **Check for fixed waiting times in your test suite**: try to replace fixed waiting times for other heuristics that can be resolved earlier. 
- **Discourage arbitrary waiting via tooling**: you can set up linting rules to warn developers when they try to use fixed waiting functions. 
- **Understand how your test runner handles waiting**: you may have quick wins available by leveraging the waiting strategies your test runner is built for. For example, Cypress offers [route aliases](https://docs.cypress.io/guides/guides/network-requests.html#Waiting) to help you wait precisely for API responses.

### Resource-intensive testing scenarios

You can vary just how close to reality you test a web application in. For example, to provide data to the app, you can use an API deployed on a QA environment, or spin-off a local database seeded with data samples, or even pack mocks as part of the test. The closer to production that we emulate the testing scenario, the more resources – and time – will be needed.

The most significant advantage of getting a test environment closer to production is that you gain confidence that your tests are diagnosing your application realistically. However, running a test suite against real APIs represents a major challenge in terms of time and cohesiveness. The same can be said of other external dependencies (like Bluetooth connectivity) for your application. 

*Right now you can do the following in order to select the right testing scenario:*

- **Assess the level of realness your team needs**: perhaps your data needs are not too complex, and your application doesn’t handle critical operations, so mocks would suffice. If your business requires more sophisticated data management, you may need to invest in tools that can help you ensure your tests cover such cases.
- **Consider simulation**: simulation is an intermediate point between mocks and real APIs that provides the velocity of mocks with the complexity of real backends. You can simulate database queries, as well as errors, using tools like [Mirage.js](https://miragejs.com/).

---

Everybody feels better about paying taxes when they can see results. At Frontside we think everyone would feel better about tests if they could see their results faster. By addressing both application concerns (time to interactive, build time, routing granularity) and testing strategies (waiting precision, realness) developers right now can win back precious seconds, minutes, and even hours of time spent on slow tests.

We think it’s worth the effort to improve testing, as speedy test suites shorten feedback loops and add up to increase the organization’s velocity. And that maximizes the dividend you get for your investment in tests.

### Up next...

Speed is critical to a healthy testing strategy, but it won't work without the other pillars of the testing triple threat. Next we focus on the second essential make-or-break factor in testing: reliability. Tests can be flaky, but there are strategies you can take now to detect, fix, and even prevent having non-deterministic tests in your application.

Keep on reading, [The Triple Threat to Testing — Part 2: Reliability](http://localhost:8000/blog/2020-triple-threat-to-testing-part-2-reliability/).

---

*At Frontside, we think effective testing is vital for successful software teams. We can help your team develop testing best-practices so they can deliver features confidently. [Give us a shout if you’d like to work with us](https://frontside.com/contact).*
