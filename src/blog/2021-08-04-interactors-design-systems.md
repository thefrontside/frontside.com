---
templateKey: blog-post
title: >-
  BigTest Interactors: the design systems testing ally
date: 2021-08-04T05:00:00.000Z
author: Charles Lowell, Jeffrey Cherewaty
description: >-
  Components from a design system make building UIs easy. It should be just as easy to test them. Interactors enable more robust tests for component-based UIs, and improve component libraries' maintainability.
tags:
  - testing
  - design-systems
img: /img/2021-interactors-design.png
---

The reusable component libraries shipped with design systems enable developers to use on-brand and battle-tested components. Developers don't have to re-invent the wheel every time they need a common element like an input, modal dialog, or date picker.

![Screenshots of date picker components highlighting clickable areas](/img/2021-08-04-interactors-design-system/date-picker-click-map.png)

If you're building an application with some of these components, you'll want to write some tests. With the date picker component pictured above, a user needs at least four clicks to select a date. That means a UI test will also need to step through those four clicks. Testing this interaction with React Testing Library and Cypress could look like:

```js
cy.querySelector('#date .MuiCalendarPicker-root').within(() => {
  cy.getByLabelText('calendar view is open, switch to year view').click();
  cy.getByText('1992').click();
  cy.getByLabelText('Next month').click();
  cy.getByText('16').click();
});
```

To effectively write a test using this date picker, we had to include specifics about its implementation, like IDs and classes. If the underlying component changes its DOM structure, our tests are suddenly brittle.

There's a well-trod design pattern for fixing this problem: [page objects](https://www.martinfowler.com/bliki/PageObject.html). They're object-oriented classes that serve as an interface. As an application matures alongside its accompanying tests, page objects act as a buffer and a more explicit API for the tests to interact with the application.

## Introducing BigTest Interactors

At Frontside, we've built [BigTest Interactors](https://frontside.com/bigtest/interactors) (`@bigtest/interactor`), a library inspired by page objects that helps teams structure, share, and reuse their UI testing practices.

Interactors evolve the idea of a page object. Modern applications are usually arranged into composable components, and the "page" is no longer the dominant unit of organization. An Interactor is similarly composable, and can abstract any level of object in the DOM hierarchy.

Design systems maintainers can build interactors alongside components to reduce the mental distance between the user interface and its testing-friendly abstraction. In the same way strong typing can make components easier to build with, interactors make components easier to test.

Interactors...

1. ... are composable, so they make tests easier to write, read, and run.
2. ... act as an abstraction layer on top of the component's implementation, improving design systems' maintainability.
3. ... have TypeScript support and provide helpful errors, resulting in an improved developer experience.

Let's take a closer look at each of these advantages.

### Interactors make tests easier to write

We provide basic [built-in Interactors](https://frontside.com/bigtest/docs/interactors/built-in-dom) that correspond to HTML elements, like `button`, `link`, and `checkbox`. Using these alone, you could interact with and assert the majority of cases of a web UI. Take the following example of a collapsable navigation menu test:

```js
import { Button, Link, Heading } from `@bigtest/interactor`;

it('goes to international news page with mobile menu', () => {
  cy.do([
		Button({'aria-label': 'Show Navigation Menu'}).click(),
		Link('International', { 'class' : contains('nav-link')).click()
	])
	cy.expect([
		Heading('News').exists();
	])
});
```

You'll often want to avoid repeating yourself and pack together interactions and assertions that correspond to your design system's components.

It's likely that `Nav` is indeed a component in our design system. Thus, we can create a `Nav` Interactor that queries the nav and has actions that a user can perform with it.

```js
it('goes to international news page with mobile menu', async () => {
  cy.do([Nav().goTo('News')]);
});

it('goes to entertainment news page with mobile menu', async () => {
  cy.do([Nav().goTo('Entertainment')]);
});
```

Note that we can target the `Nav` directly and perform the action we care about in a single line. If the component changes its internal classes or markup, these tests won't break. Its Interactor received updates to account for those changes.

Retaking the example from the introduction, you could provide a `DatePicker` Interactor such that everyone using the pick date component have standard methods to test their features using an interface like:

```js
cy.do(DatePicker.setDate({ day: 16, month: 'August', year: 1992 }));
```

Composable Interactors also respect their lifecycle in the browser. That means that they don't waste time waiting on dead components or looking for new ones when there's no rendering happening.

### Interactors improve maintainability in a design system

Interactors rapidly become design system's maintainers' best friend because they provide freedom by abstracting the testing practice away from the component's implementation. Instead of relying on fragile internal component classes, developers and maintainers can use Interactors as an API contract for the UI.

Typically, developers would target elements in the UI in their tests by reaching into the internals of the components they use. It's common to see tests that target chains of selectors like this one:

`#notes-modal-notes-list [class*="mclRowFormatterContainer--"]`

However, referencing internal selectors couples the test implementation to the HTML structure of the component; a slight change to the markup may cause tests to fail. Thus, tests are fragile and introduce fear in the design system's maintainers because they have no way of knowing what might cause tests to fail. Worst of all, this fragility makes tests unreliable when updating the design system, which is precisely the kind of system-wide change that you write your tests for.

Interactors are the missing contract between the design system's maintainer and its users. The maintainers can control the API that test authors use to interact with the component. The maintainers can freely change the markup of components without worrying about inadvertently breaking tests. And test authors have a more convenient way to write their tests. In the end, the tests are more reliable and provide more confidence to everyone.

### Interactors improve developers' experience while testing

Interactors know more about the components under test than mere selectors, which allows them to provide helpful information while you develop or debug tests. Having an explicit API to test your app provides static checking safety, and understanding that API enables Interactors to provide suggestions when things go wrong in a test.

When you write your test assertions and actions using selectors, you're on your own. There are no checks available while you write the test, or while it compiles. You'll only find out about a typo after running the tests, and inspecting closely why your test is failing although it seems that it should pass.

Interactors bring in static checks for your tests, which means your IDE and compiler can provide more support as you develop:

![Screenshot of IDE showing in-line suggestions and documentation about Interactors](/img/2021-08-04-interactors-design-system/interactors-ide-suggestions.png)

Not everything can be found by static analysis in a test, but Interactors are ready to provide helpful suggestions for common small mistakes that are usually hard to debug. For example, if you were looking for a login button in your test case, but forgot for a moment that the button actually reads "Log In", Interactors will hint that to you:

![Screenshot of interactors suggestion similar elements to the one that was not found](/img/2021-08-04-interactors-design-system/interactors-error-suggest-not-found.png)

Interactors not only check for presence before committing an action in the UI, they also check if the [element is visible](https://github.com/thefrontside/element-is-visible)—through various heuristics—and that it is enabled. For example, if Interactors did find the button and it is visible but not enabled, it will throw an error like this:

![Screenshot of interactors failing a test because the target element was visible but not enabled](/img/2021-08-04-interactors-design-system/interactors-error-disabled-element.png)

## Try out Interactors!

If you're still not sure about trying out BigTest Interactors, take a look at this [pull request in FOLIO](https://github.com/folio-org/stripes-testing/pull/112), an open-source project, adopting Interactors in their component library:

![Screenshot of code diff resulting in refactoring a test using React Testing Library to use Interactors](/img/2021-08-04-interactors-design-system/diff-react-testing-library-vs-interactors.png)

The selectors are difficult to follow and are quite fragile, while the Interactors are easier to read and focus on testing the app as a user would use it.

You can start using Interactors as part of your current test setup, they're compatible out of the box with Cypress and Jest, so it's easy to [get started!](https://frontside.com/bigtest/docs/interactors).

<aside class="posts-list-list">
  <h2>Related articles:</h2>
  <div class="posts-list-entry">
    <h3 class="posts-list-title">
      <a href="/blog/2021-18-02-there-and-back-again-testing-and-upgrades/">
        There and Back Again: Testing and Stack Upgrades
      </a>
    </h3>
    <p>
      Upgrading your application stack to new major versions can be terrifying, especially when you have a massive application with 75 developers working on features non-stop. However, a good testing strategy gives you confidence to make bold moves that take your organization to heretofore unexplored lands.
    </p>
    <a href="/blog/2021-18-02-there-and-back-again-testing-and-upgrades/" class="post-link">
      Continue reading
      <span class="post-link--arrow">→</span>
    </a>
  </div>
  <div class="posts-list-entry">
    <h3 class="posts-list-title">
      <a href="/blog/2021-04-07-helping-designers-and-developers-storybook/">
        Unleashing the Genie: Helping both designers and developers with Storybook
      </a>
    </h3>
    <p>
      Good documentation is key to design systems. However, what "good" means varies according to the reader. This article will go through tips to generate documentations for designers and developers from a single Storybook—keep everyone happy with minimum effort!
    </p>
    <a href="/blog/2021-04-07-helping-designers-and-developers-storybook/" class="post-link">
      Continue reading
      <span class="post-link--arrow">→</span>
    </a>
  </div>
</aside>
