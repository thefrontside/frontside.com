---
templateKey: blog-post
title: >-
  The Triple Threat to Testing — Part 2: Reliability
date: 2020-04-30T05:00:00.000Z
author: Robbie Pitts, Taras Mankovski, Jeffrey Cherewaty, Charles Lowell, Jorge Lainfiesta
description: >-
  Flakiness: one of the biggest pain-points of any test suite. From app complexity to incident management, we explore some of the most common causes of unreliable tests.
tags:
  - testing
img: /img/2020-triple-threat-to-testing-part-2-reliability-social.png
---
![The Triple Threat to Testing — Part 2\: Reliability](/img/2020-triple-threat-to-testing-part-2-reliability-intro.png)


Imagine you have agreed to carpool with a friend. The first couple of weeks it’s all good: you go to their place to pick them up, the next time they pick you up. But one day you’re waiting in front of your building and it’s getting late. You decide to call your friend and hear them say: “Oh, I’ve been waiting too. I thought it was your turn.” You’re both frustrated with each other, and if this happens a few more times, you know you’ll drop carpooling entirely. But since you want to reduce your carbon footprint, you come up with solutions to try to make it work. Perhaps you set up a shared calendar, or create alarms on each other’s phones, or create a text message strategy. Even if your strategies aren’t foolproof, there are actionable steps you can take to significantly increase the reliability of your carpooling partner.

<aside class="blog-post--saga-box">
This article is the second one in our <em>Triple Threat to Testing</em> saga. If you haven't, check out the first part about <a href="https://frontside.com/blog/2020-triple-threat-to-testing-part-1-speed/" target="_blank">Speed as a make-or-break factor of any test suite</a> and tips to improve it.
</aside>

More often than not, test suites are like that unreliable friend. Almost every developer has encountered a test that passes several times and then unpredictably fails without having made any change in your codebase. It turns out test flakiness affects practically every team, even those with robust test suites. For instance, [in 2016 Google reported](https://testing.googleblog.com/2016/05/flaky-tests-at-google-and-how-we.html) an average of 1.5% of flaky tests on their suites despite their constant efforts to fight them. And test flakiness remains one of the top concerns of developers according to [The State of Testing 2019](https://static1.smartbear.co/smartbearbrand/media/pdf/third-annual-testing-community-survey-report.pdf) survey.

The level of trust that your test suite brings to you and your team is directly proportional to its value. When your test suite is reliable, you can move forward confidently after you see all the green checks in your Pull Request. There’s no need for you or your colleagues to manually check the whole application each time someone makes a change. That lets you iterate faster and focus the conversation on improving the quality of your app instead of wondering if the new code works at all.

Conversely, once flaky tests start to become normalized, it’s a short step to the health of the test suite progressively being abandoned. Developers begin to view writing tests as a burden that makes them less productive. But if test unreliability becomes normalized, teams wind up treating as unimportant the thing the suite was testing for. Developers thus risk putting less attention on the potential issues that the test suite should be discovering—issues that were important enough to check for in the first place. 

The impact of flaky tests is not unlike the sensation of being stuck back in high school on an endless treadmill of ultimately meaningless tests. The problems run deeper than simply the lost time having to re-run tests after one fails to deliver an actionable outcome. It’s built into the DNA of developers to be problem-solvers, but flaky tests causes everybody to frustrated and annoyed at just another pointless exercise – and that robs your team of critical momentum and energy that could be directed at productively solving the issue.

## What’s causing flaky tests?

All developers have experienced flaky tests. But understanding why tests are unreliable goes a long way to solving the issue. Flaky tests can be diagnosed, handled, and in many cases prevented. In this section, we’ll have a look at common sources of flakiness and strategies to make tests less prone to be unstable. 

<nav class="table-of-contents">
  <h2>Common sources of flakiness:</h2>
  <ul>
      <li>
          <a href='#complexity-and-test-size'>Complexity and test size</a>
      </li>
      <li>
          <a href='#asynchrony-in-the-app'>Asynchrony in the app</a>
      </li>
      <li>
          <a href='#environment-and-preconditions'>Environment and Preconditions</a>
      </li>
      <li>
          <a href='#unmanaged-tests'>Unmanaged tests</a>
      </li>
  </ul>
</nav>

### Complexity and test size  

Web applications are part of sophisticated systems. Long gone are the times of `<marquee>` where the web was composed of single html files with table-based layouts. Even the now trendy simple-looking JAMStack is backed by advanced infrastructure. But with the ever-increasing complexity of codebases comes difficulty in determining precisely why a test is failing to produce a result. An end-to-end test will touch on many layers of an application, and while a positive result means that the application is working, a negative result might mean anything from a dropped internet connection to the server restarting.

The bigger the test—in the sense of how much of the application stack it touches—the more unpredictable it becomes. For example, several routes to an e-commerce application will be visited and large portions of the code exercised in executing a test that evaluates the whole shopping experience. Compared to a small test that checks if a single button works, the uncertainty introduced by a big test like for the shopping experience is orders of magnitude higher. Don’t take our word for it: [Jest Listfield at Google](https://testing.googleblog.com/2017/04/where-do-our-flaky-tests-come-from.html) found a strong correlation between test size and the resources required to run it with flakiness.


*Right now you can do the following in order to manage non-determinism caused by complexity*: 

- **Prioritize which results matter most to your team**: if you work on a frontend team, you most likely won’t get much value of tests failing over network errors or QA environments set up by other teams. Instead, you may find more valuable assessing that your work is correct, even if that implies opening the risk of a ‘false positive.’ 
- **Coordinate testing strategies with other teams**: If the back-end team has a great test suite that covers their endpoints, the front-end team should focus on tests that do not touch on the real back-end. Bigger tests that involve both ends can be maintained independently, so their inherent non-determinism doesn’t interrupt the other end team.
- **Simulate parts of your stack**: Simulation is a great way of removing complexity from your test without compromising a realistic outcome. We have had good results by investing in simulators for RESTful and GraphQL back-ends as well as Bluetooth devices.

### Asynchrony in the app

Web applications put together many moving pieces: browser renderings, APIs loading, events triggering, loggers recording, and more. It’s therefore not a trivial thing to be precise about when to run an assertion for a test. Sometimes you wait too long, other times not long enough. In both cases we not only [compromise the speed of our test](https://frontside.com/blog/2020-triple-threat-to-testing-part-1-speed/#waiting-too-much-waiting-too-little), but we can end up having a flaky test suite.

It is at the level of browser asynchrony where testing tools often promise “flake free” experiences. Testing tools do a great job at detecting when changes are done in the DOM, but have a harder time dealing with pending promises and relevant network requests. It’s not surprising when we eventually get non-deterministic requests within the UI.


*Right now you can do the following in order to reduce flakiness induced by asynchrony in the app*:

- **Avoid fixed waiting times**: if you have any `wait(500ms)` in your test, you’re bounding your assertions to something that may fail. Oftentimes using wait is a desperate measure that slows down test suites and leads to non-deterministic outcomes.
- **Investigate poll-based waiting**: Consider instead waiting until a specific criterion is met like a selector appearing on the DOM. For example, in [Capybara](https://rubydoc.info/github/jnicklas/capybara/master/Capybara/Node/Finders), you can `find` an element and provide additional information on what exact match you’re waiting for, while [TestingLibrary](https://testing-library.com/docs/dom-testing-library/api-async) provides mutation-based waiting through `waitFor`.
- **Analyze API request waiting options**:  HTTP requests are one of the most significant sources of test flakiness, but how to handle it depends on how you’re setting up the API layer in your tests. For example, if you use [Cypress](https://docs.cypress.io/api/commands/wait.html#Arguments) to simulate requests, their library provides `wait(alias)`, which allows you to wait for an HTTP request to be ready instead of having to rely on UI effects to know if the request is done loading.
- **Opt for framework-native waiting**: Check for smarter ways that your library offers to wait. Some tools, like Ember (with `andThen`) and React (with `act`), provide functions that reach into internal framework functionality to achieve more efficient waiting.

### Environment and Preconditions 

Let’s say you’re looking to find the new hip café in a part of town you’re not familiar with. Your phone’s navigation is not behaving now: time for some old-school navigation. You ask a seemingly friendly person for directions. “Oh sure, turn left in the next block, and you’ll see it.” You easily find the café. But if you were not standing at the location where you were given the directions, “turn left in the next block” would have led you somewhere else entirely. Similarly, if a test executes actions starting from a different initial state, its results will most likely differ from what you intended. This is a common cause for flaky tests: non-deterministic initial states, often caused by state changes leaking from other tests.

Ideally each test should be self-contained, as you want to be able to get the same results from tests regardless of the order in which you run them, or whether you run all your tests or just a subset. But changes in the application state tend to slip through the thinnest cracks: databases, local storages, application data, sessions, and other forms of data persistence.

*Right now you can do the following in order to reduce the chances of non-determinism caused by polluted preconditions or global variables*:

- **Determine if you have interdependent tests**: Look for tests that require being run in a particular order (deliberately or by chance) as this kind of interdependence may cause headaches sooner than you think. Reconsider if you can write your tests in a different way so each of them is self-sufficient.
- **Experiment with a randomized order**: Some tools allow you to run your tests in a random order to test the isolation of your tests. For example, in Jest you can configure a [testSequencer](https://jestjs.io/docs/en/configuration#testsequencer-string) to run tests in a random order.
- **Reset your data sources**: Find out what’s the most reliable (and fast) way to return your data storages to a default state after each test. For instance, Jest can monkey patch modules so that if they have shared global state they won’t leak between tests; in Ruby on Rails you can use a [DatabaseCleaner](https://github.com/DatabaseCleaner/database_cleaner) to reset the state explicitly.

### Unmanaged tests 

Flaky tests are like invasive weeds in your garden. They will keep popping up despite your best efforts. Yet if you stop plucking them out regularly, they threaten your precious vegetables because they will consume many resources. Similarly, if you don’t manage your flaky tests effectively, they will accumulate rapidly and compromise the entire test suite’s value. For this reason, it is important for your team to have an effective process to keep tests effective and flake-free. 

Of course if unreliable tests are so damaging, why haven’t more resources been poured into making them more effective? The main reason is that flakiness is a symptom of other problems in the application and test suite. Flakiness can come from application code, dependencies, environments, or tools. Figuring out what’s causing the issue can be time consuming, which it is common to “temporarily” sweep issues under the `skip` rug. But dead tests silently increase the test suite liability, and without a defined process on how to handle skipped tests, the opportunity to improve the app is lost.

*Right now you can do the following in order to manage your test suite*:

- **Automate the identification of flaky tests**: Some companies like Google and Facebook automate detection by logging every single test run in their CI system so they can flag tests as non-deterministic. While useful, it is unlikely that this strategy alone can help during active development or when preparing a Pull Request. For this reason, [Spotify introduced FlakyBot](https://labs.spotify.com/2019/11/18/test-flakiness-methods-for-identifying-and-dealing-with-flaky-tests/), which developers can invoke in their PR to generate a report on the reliability of the test suite.
- **Handle flaky tests as issues**: For instance, when you detect a test is non-deterministic, you (or your bot) can create a ticket explaining what is known about that test, and flag it in your test suite as it may be necessary to skip it during the normal test runs until it is fixed. Your team should then develop a plan to deal with tests that have been reported as flaky, checking on such open tickers at least quarterly. 
- **Learn and Prevent**: As you encounter more flaky tests, your team's understanding of what causes them grows. Prevention is the distilled result of managing your tests methodologically, so document the findings that come out of dealing with flaky tests to identify the patterns used by the team in a specific area or to flag a certain technology as unreliable.

---

Carpooling is a great solution when it’s designed to work, and at Frontside we think that everyone should feel the same way about tests. By checking for complexity, addressing asynchronicity, investigating preconditions, and managing their tests, developers can effectively strategize to minimize the impact of flaky tests and return them to their rightful status during the development process as a useful tool rather than an obstacle to be overcome.

As [The Coding Gang says](https://hackernoon.com/flaky-tests-a-war-that-never-ends-9aa32fdef359), flakiness is a war you can't win, and non-determinism will appear from time to time. But we think teams can work to make these scenarios the exception rather than the rule, and learn valuable lessons when non-determinism appears to minimize the impact of flaky tests moving forward. 

### Up next...

Like speed, reliability is essential to a test suite, but you need to address all three legs of the testing threat in order to develop a balanced response. That means we need to talk about the final essential make-or-break factor in testing: relevance. With limited tooling to manage it, relevance relies almost entirely in human judgment, but there are steps you can take to avoid wasting resources in tests that don’t yield any value for your team. 

---

*At Frontside, we think effective testing is vital for successful software teams. We can help your team develop testing best-practices so they can deliver features confidently. [Give us a shout if you’d like to work with us](https://frontside.com/contact).*
