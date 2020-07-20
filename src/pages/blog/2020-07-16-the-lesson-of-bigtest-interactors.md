---
templateKey: blog-post
title: >-
  The Lesson of BigTest Interactors: never write a flaky test again!
date: 2020-07-16T05:00:00.000Z
author: Jonas Niklas
description: >-
  To prevent flaky tests, BigTest introduces the Interactor API, designed around the lessons learned in Capybara. This article introduces the benefits of Interactors in BigTest and how to use them to write reliable tests. 
tags:
  - testing
  - bigtest
img: /img/2020-07-16-interactors-social.png
---
![Gihub Actions: a deep dive into pull_request](/img/2020-07-16-interactors-intro.png)


<aside class="blog-post--saga-box">
Jonas Nicklas is the original author of <a href="https://github.com/teamcapybara/capybara" target="_blank" rel="nofollow">Capybara</a>, Ruby’s most popular framework for testing web applications. He is based in Sweden and has been working on BigTest since 2019
</aside>

Testing the frontend of complex applications is often associated with nightmarishly inconsistent test suites, where seemingly random failures cast doubt on the value of the tests themselves and frustrate developers to no end. Our mission with BigTest has been to eliminate flakiness in tests altogether and provide the most stable, easy to use, and best performing test framework out there. 

As the original author of Capybara, an acceptance test framework written in Ruby which has a reputation of being incredibly solid and resistant to flakiness, I know all about how to avoid random test failures. We have taken all of the lessons learned from tweaking Capybara over years and applied them to build BigTest’s Interactor API—a powerful way of defining interactions with your application which allows you to write tests which are even more solid than what Capybara can provide.

We'll be ready to share more about BigTest soon, but for the moment I want to talk about the overarching approach Frontside takes to eliminate flakiness, and what you need to know to write tests which are rock solid and never fail randomly. While there will be significant gains to be had in using Frontside's BigTest, the principles guiding its development are what I want to talk about here: eliminating ambiguities when writing tests in order to ensure stability. Let's see how BigTest is designed to do just that and then apply those insights to test writing in general.

## The Convergence Strategy

The approach BigTest uses is sophisticated in its execution but fundamentally simple in its design: for any interaction we want to perform, or any assertion we want to check, we try it and see if it succeeds; if not we wait and try again. We keep doing this until we either succeed, or some set amount of time has expired and declare the test a failure.

We call this strategy "convergence" and functions which exhibit this waiting behavior “convergent." In order to create convergences in a web UI, we must be able to keep reliable references to the elements we want to act and assert on, which is possible in BigTest through having control over the event loop of the browser.

### Retaining references

The most important detail is that an interaction or assertion must fully capture all of the work that it needs to perform and perform all the same work again and again in the retry loop. The test in other words must run on the same content each and every time. To ensure this, BigTest never uses any outdated references to elements, and everything is always run against the actual DOM.

For example, let's imagine we have a field for a name and this field is within a form. With BigTest interactors we could set the value of this field to look like this:

``` javascript
await Form.byId('login').find(TextField.byId('name')).fillIn('Jonas');
```

We can think of this as roughly performing three steps under the hood:

``` javascript
let form = document.querySelector('#login'); // step 1
let textField = form.querySelector('#name'); // step 2
textField.value = 'Jonas' // step 3
```

Now just re-running step 3 over again and again is not enough. The form element or text field could change, and either of those changes could cause us to retry something which would never work. In order to make this as stable as possible we need to re-run all of the steps every time.

A very simplified algorithm for how this would work looks roughly like this:

``` javascript
while(true) {
  let startTime = new Date();
  try {
    // Run our actual interaction code
    let form = document.querySelector('#login'); // step 1
    let textField = form.querySelector('#name'); // step 2
    textField.value = 'Jonas' // step 3
    // if it fully succeeds, break out of the loop
    break;
  } catch(e) {
    // if there was an error, check if we've already been trying for too long
    if((new Date() - startTime) > MAX_WAIT_TIME) {
      throw e;
    } else {
      // wait a little while
      await sleep(1);
    }
  }
}
```

Now what BigTest's API interactors do is automatically transform the following much simpler instructions into the above algorithm for you:

``` javascript
await Form.byId('login').find(TextField.byId('name')).fillIn('Jonas');
```

Of course there are a number of details that are omitted in the simplified code above. For example, each interactor must be specific enough to match a single element on the page. If there were multiple fields with the id `name` then the interaction above would fail. Designing BigTest this way forces the writer to be specific so that they don't end up interacting with a random element on the page. Otherwise layout changes where the order of elements is altered might lead to broken tests.

### Taming the event loop

One huge advantage that BigTest has over Capybara is that since we are running tests directly in the browser, we can leverage the event loop and ensure that our interactions run fully within the same tick of the loop. This eliminates quite a number of problems that plague Capybara and similar Selenium-based frameworks and tools. By running within the event loop and ensuring that we never release it, we can guarantee that our elements are never stale.

Frameworks that do not have direct access to the event loop often get errors because the elements they were looking for stop “existing” for one reason or another. This loss of reference could happen because the user, the browser, or an external script triggered a change that made the reference disappear. Capybara goes to great lengths to avoid the dreaded `StaleReferenceError`, but BigTest simply avoids the issue altogether. That is because getting a hold of the event loop guarantees that we can run assertions when elements in the page are ready, and before they are changed by other elements.

The Interactors API reflect their event-loop synced nature. Consider, for example, a `TextField` interactor:

``` typescript
const TextField = createInteractor<HTMLInputElement>('text field')({
  selector: 'input',
  locators: {
    byId: (element) => element.id,
  },
  actions: {
    fillIn: (element, value: string) => { element.value = value }
  }
});
```

In most test frameworks, actions such as `fillIn`, would have been asynchronous. But in BigTest both the locator and action functions are synchronous, which means that they do not release the event loop. This allows us to transform them into convergent functions, which can find the element and perform the action using the same reliable reference.

BigTest will also ship with a rich library of interactors already built in, for all of the most common interface elements in web applications, so most users never have to define their own interactors if they don't want to. And yes, all our interactors are fully typesafe because BigTest is written in TypeScript.

## Waiting is not enough: flakiness through ambiguities

We have claimed that our convergence strategy is enough to eliminate flakiness, but as we mentioned as well, having a solid strategy is only part of the solution, the other half of the solution is writing the tests in such a way that they make maximal usage of this solution and avoid inherent
ambiguities that we cannot otherwise resolve.

Let's illustrate what we mean by this with an example: Imagine we have a paginated list with a 'Next' link at the bottom. Whenever we press the next link we will load a new set of rows, and we also update the `href` attribute of the next link to point to the next page.

![Image of a page showing a list and "Previous" and "Next" buttons](2020-07-16-interactors-next.png)

Now imagine a written a test written like this:

``` typescript
await Link('Next').click();
await Link('Next').click();
```

Which page will we end up on? Intuitively we would say that we should end up on the *third* page, but unfortunately the actual answer is "it depends". The first click on `Next` will start a request to the server which will complete after some time, and this will change the `href` of the link. But if our second click happens *before* the request completes, we will navigate to the second page *twice*, and we actually end up on the *second* page.

### A naïve solution: Guessing

A common way to work around this issue is to try and guess when an interaction is "done" – for example, by checking if there are any active requests to the server and waiting for those to complete. This was the original strategy used in Capybara, but we realized that this strategy has a fatal flaw and moved away from it. Here’s the problem:

Let's imagine that the event loop is released between the request completing and the DOM being updated. Our second click could now occur in this small window of time. What we have done is made the window of time for flakiness to occur smaller, but we have not eliminated it. This still might seem like a win on the surface, but in fact making the window smaller is actually *worse*, because it means that this issue will occur more rarely, and therefore in actuality will be harder to track down and fix.

### A better solution: Anchoring

A better solution would be to "anchor" the second interaction by adding an assertion which ensures we have transitioned to the second page beforehand:

``` typescript
await Link('Next').click();
await ListItem('This item is on the second page').exists();
await Link('Next').click();
```

We can now be sure that we have transitioned to the second page. It is unlikely that the modifications to the DOM of rendering the second page and updating the link will occur in separate ticks of the event loop, so most likely this will be enough to eliminate the problem.

### The best solution: Fixing the UI

But there's an even better solution. The problem stems from the fact that the UI itself is ambiguous. If the user of the application did hit the 'Next' link twice in rapid succession, what would happen? The result is as equally undefined as the result of the test is.

If we fix the UI to disable the 'Next' link while the request for the second page is loading, we don't need to change our test at all. When the request completes and updates the `href`, it will also enable the link again, and since we will keep retrying to find and click the link, we will then see the newly enabled link and click it.

By making our UI less ambiguous we have also made our tests more stable. We have effectively discovered a flaw in our UI and fixed it, made our application better, and fixed our test in the process.

Of course we don't always have control over our application or the ability to make this type of tweak. In those cases "anchoring" is a good alternative.

## Conclusion

Strategies like these are why BigTest is going to be such a significant step forward in test design. BigTest’s Interactor API will make it as easy as possible to write stable tests, but in the meantime we are committed to providing explanations like these to help you understand how to achieve similar results.

<aside class="posts-list-list">
  <h2>Related article:</h2>
  <div class="posts-list-entry">
    <h3 class="posts-list-title">
      <a href="/blog/2020-triple-threat-to-testing-part-2-reliability/">
        The Triple Threat to Testing — Part 2: Reliability
      </a>
    </h3>
    <p>
      Flakiness: one of the biggest pain-points of any test suite. From app complexity to incident management, we explore some of the most common causes of unreliable tests.
    </p>
    <a href="/blog/2020-triple-threat-to-testing-part-2-reliability/" class="post-link">
      Continue reading
      <span class="post-link--arrow">→</span>
    </a>
  </div>
</aside>
