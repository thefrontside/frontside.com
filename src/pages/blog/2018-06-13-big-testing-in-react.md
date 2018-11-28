---
templateKey: blog-post
title: Big Testing in React
date: 2018-06-13
tags: 
  - react
  - open source
  - bigtest
  - testing
author: Wil Wilsman
image: /blog/2018/06/13/big-testing-in-react/bigtest.jpg
description: "When we write and develop our applications, it's with the intent that somebody will use it. We write tests so we can be assured that everything in our app works as expected and is bug free. But how confident are you in your tests?"
---

## Does my application work in real life?

This is a big question, and big questions need big answers. How _do_
we answer that question, though? With **big tests**. When we write and
develop our applications, it's with the intent that somebody will use
it. We write tests so we can be assured that everything in our app
works as expected and is bug free. But how confident are you in your
tests?

A real person using your app is going to use a real browser; do your
tests test your app in a real browser? And not everybody uses the same
browser; do your tests test your app across multiple, different
browsers and devices? What about the network? Chances are your app
talks to the network, and your tests should account for this too,
right? Not to mention a person isn't going to interact with your app
on a component level. They're consuming _the entire app_ , using all
of it together. All of your components working with each other to
create an _experience_.

If your tests don't test the app in the same way a person would use
it, how confident can you really be in them?

Where do we even begin to test our apps like this? There are tools
like [Jest](https://facebook.github.io/jest/), but those tests don't
run in a real browser. There's also [Cypress](https://cypress.io), but
as of this writing, you currently [can't use it outside of
Chrome](https://github.com/cypress-io/cypress/issues/310). There's
also a looming thought that "user tests are slow." Do they have to be?

## Anatomy of a Big Test

When we talk about testing the entire app in a way that a person would
interact with it, we're of course talking about _acceptance tests_, or
_user tests_, or _end-to-end tests_. These types of tests have many
names, but it all refers to the same process of testing your app as if
you were an actual user.

The life of an acceptance test is pretty simple. First, our app is
mounted and we wait for it to load. Then, some interaction is
performed, such as filling out a form, or clicking a button; something
a person would actually do in our app. Finally, we make some
expectations about the state of our app after the interaction is
performed. Maybe this is a success message, or some other
confirmation. If a user does something in our app, they probably
received some feedback. We want to test this interaction and ensure
that it works as _they_ would expect it too.

When a person is interacting with your app, they're using their mouse
and keyboard which is translating to browser events that your app
responds to. They're not calling methods and expecting them to return
certain values, they're actually clicking things and expecting to
achieve results. This is what our app's tests should do too: _send
browser events and assert that there was feedback_.

But how do we actually **do** all of this?

## The Big Setup

Luckily, it's not nearly as hard as it sounds. How we interact with
our app should be so identical to how our tests interact with our app
that the only difference is the entry point.

In development, our entry point imports our app, mounts it, and that's
it! The app is ready for us to start interacting with. If we're
working on a certain feature, we navigate directly to the part of our
app containing it.

In testing, our entry point imports all of our tests and runs
them. It's each test that mounts and interacts with our app. But from
our app's point of view, nothing is any different than if it were
being interacted with by a person. Only, in our tests, we can reset
our app when necessary to make sure we're working with a clean state.

Let's get to some actual code! For example's sake, let's say our app
is built using [React](https://reactjs.org) and
[Webpack](https://webpack.js.org) with [babel-loader](https://),
[style-loader](https://github.com/webpack-contrib/style-loader), and
[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin). We'll
also be using [Mocha](https://mochajs.org/) and
[Chai](http://www.chaijs.com/) to write our tests. The app in our
example is a simple countdown app that accepts a date input through
some custom spinner inputs and displays the time until or elapsed
since the specified date.

Here's a quick look at our example app in action ([direct
link](https://bigtestjs-countdown.surge.sh/)):

<div class="website-embed">
  <iframe src="https://bigtestjs-countdown.surge.sh/"></iframe>
</div>

Our application's entry point looks like this:

``` javascript
// src/index.js
import React from 'react';
import { render } from 'react-dom';
import App from './app';

render(<App />, document.getElementById('root'));
```

If you have other necessary app code in your entry point, consider
moving it into a reusable module. You could even have a `Root`
component with the logic written in lifecycle hooks. The point is:
during development, or in production, our app is only mounted once;
for our tests, we need to be able to remount our app before each
scenario.

Our testing entry point will look something like this:

``` javascript
// tests/index.js

// mocha doesn't support es modules, so we import the pre-compiled assets
import 'mocha/mocha.js';
import 'mocha/mocha.css';

// other setup could be done here too, such as registering chai helpers
mocha.setup('bdd');

// we import our tests using webpack's require.context
// if we just use `import`, it will be hoisted above mocha's bdd setup
const requireTest = require.context('.', true, /-test/);
requireTest.keys().forEach(requireTest);

// run mocha
mocha.run();
```

It's each test's job to mount and interact with the app, so all we
need to do here is import all of our tests and run them. We'll go over
what our tests will actually look like in just a minute. For now,
let's pretend that our tests just do their aforementioned jobs. You
might be able to figure out where I'm going since I've been mentioning
_entry points_. We're going to use our existing Webpack config to
bundle our tests.

``` javascript
// webpack.config.js
module.exports = (env) => ({
  entry: env.testing ? './tests/index.js' : './src/index.js',
  // ... other webpack config
});
```

We're using Webpack v4, which allows us to [export our config as a
function]([Configuration
https://webpack.js.org/configuration/configuration-types/#exporting-a-function). The
first argument of this function, `env`, is populated by the [CLI
argument](https://webpack.js.org/api/cli/#environment-options) of the
same name. This way, when we start our app, we can just call `yarn
start --env.testing` to switch to our testing index. This new bundle
will run all of our tests for us, and we can open this bundle in any
browser on any device to run our tests there as well!

_Note_: in our specific case, Mocha's HTML reported requires a
`#mocha` container in the DOM to output it's report. We're using
[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)
along with
[html-webpack-template](https://github.com/jaketrent/html-webpack-template),
so we can just change the `appMountId` of the template when we're in a
testing environment.

Okay, so we know how to _bundle_ our tests, but how do we actually
_write_ them?

## Writing Big Tests

If we reflect back on our anatomy lesson, our tests do three important
things:

1. Mount/Remount our app
2. Interact with our app in a meaningful way
3. Assert that something happened

To successfully do all of these things, we'll be using a set of
libraries developed specifically for testing big. The
[BigTest](https://bigtestjs.io) suite of libraries and framework
extensions help to answer the big question: _does my application work
in real life?_ We'll touch on a few of those libraries in the rest of
this article, but there are some we won't get to, and more planned for
development.

### Mounting Our App

First, to mount our app we can just use `render` from `react-dom`. But
according to the docs: "If the React element was previously rendered
into the container, this will perform an update on it and only mutate
the DOM as necessary to reflect the latest React element." However,
this is not _exactly_ what we want. While this does mount our app, we
actually want to mount a _fresh instance_ of our app every time. To do
this we can combine `render` and `unmountComponentAtNode`, which will
completely remove a component from the DOM after calling the
appropriate lifecycle hooks.

This is pretty simple to do ourselves in our own `mount` helper, but
to spare us from even more DIY architecture, we can just utilize the
helpers from [`@bigtest/react`](https://github.com/bigtestjs/react)
which already do this. It also provides some other useful things, such
as setting up an in-memory `history` object for our app to provide to
[React Router](https://github.com/ReactTraining/react-router), and
binding this history object to other helpers that allow us to navigate
our app from within our tests.

This is how we would use `@bigtest/react` to mount our app and visit a
route:

``` javascript
import { setupAppForTesting, visit } from '@bigtest/react';
import { expect } from 'chai';

import App from '../src/app';

describe('mounting our app and visiting a route', () => {
  beforeEach(async () => {
    await setupAppForTesting(App);
    visit('/2019/01/01');
  });

  it('shows the date', () => {
    let $date = document.querySelector('[data-test-countdown-target]');
    expect($date.textContent).to.equal('January 1st, 2019');
  });
});
```

We can reduce some boilerplate for all of our tests by creating a
helper file and combining the React helpers with Mocha hooks. This way
we also won't have to import our app into every test file.

``` javascript
// tests/helpers.js
import { setupAppForTesting } from '@bigtest/react';
import App from '../src/app';

export { visit, location } from '@bigtest/react';

export function setupApplicationForTesting() {
  beforeEach(async function() {
    this.app = await setupAppForTesting(App);
  });
}
```

We could have other helpers in this file, or do further setup such as
creating a mock server. Once we have an easy way for our tests to
mount our app on demand, we can interact with it.

### Interacting With Our App

Again, we're not testing that some function returns some value or
calls some other function. **We want to interact with our app like a
real person would.**

To do this, we're going to use
[`@bigtest/interactor`](https://github.com/bigtestjs/interactor) to
send real browser events to our app. I won't go into too much detail
here, but interactors are a very powerful, composable, way to interact
with the DOM. Interactors will wait for elements to exist before
interacting with them, so we don't have to worry about timing our
tests correctly to sync up with any run loops.

If you're familiar with the [page object
pattern](https://martinfowler.com/bliki/PageObject.html), you'll know
that they can abstract the internal structure of a page away from the
user-facing functionality. They also reduce a lot of boilerplate
around the UI in our tests, so that if changes are necessary, only the
page objects need to be updated. You can think of interactors as
composable page objects for modern components.

Let's create an interactor for the custom spinner input in our app:

``` javascript
// tests/interactors/spinner.js
import { interactor, clickable, value } from '@bigtest/interactor';

export default @interactor class SpinnerInteractor {
  // common helpers provide easy to define interactions
  prev = clickable('[data-test-spinner-prev]');
  next = clickable('[data-test-spinner-next]');
  value = value('input');

  // complex interactions can be expressed as methods
  select(option) {
    let self = this;

    // for each letter in `option`, send a keypress event
    // that will trigger the spinner's typeahead feature
    for (let key of option) {
      self = self.trigger('keypress', {
        charCode: key.charCodeAt()
      });
    }

    // methods that return a new instance of itself are chainable
    return self;
  }
}
```

And we can use this interactor like so:

``` javascript
// interactors are lazy, so we can initialize them without anything
// actually existing in the DOM yet
const year = new SpinnerInteractor('[data-test-year-field]');

// when accessing properties, an error might be thrown if the element does
// not exist; this can be more useful than typical expectation failures
expect(year.value).to.equal('2019');
//=> Error: unable to find "[data-test-year-field]"

// methods return new interactors that can then be chained from one another
let selectYear = year.select('2019')
let selectYearThenPrev = selectYear.prev();

// interactions do not start until `interactor.run()` is called, or when
// used with the async/await syntax; they will resolve once the element
// exists and has been interacted with, or when the timeout ellapses
await selectYearThenPrev;
await year.next();
```

We can then take these smaller interactors and compose them to create
more complex interactions.

``` javascript
// tests/interactors/form.js
import { interactor, scoped } from '@bigtest/interactor';
import SpinnerInteractor from './spinner';

export default @interactor class DateFormInteractor {
  // the default scope allows us to omit the selector when calling `new`
  static defaultScope = '[data-test-date-form]';

  // interactors are composable and nested methods return an instance
  // of the top-most interactor for chaining
  year = scoped('[data-test-year-field]', SpinnerInteractor);
  month = scoped('[data-test-month-field]', SpinnerInteractor);
  day = scoped('[data-test-day-field]', SpinnerInteractor);
  hour = scoped('[data-test-hour-field]', SpinnerInteractor);
  minute = scoped('[data-test-minute-field]', SpinnerInteractor);
  submit = scoped('button[type="submit"]');

  // getters can also be used for computed properties
  get value() {
    let date = `${this.year.value}/${this.month.value}/${this.day.value}`;
    let time = `${this.hour.value}:${this.minute.value}`;
    return `${date}@${time}`;
  }
}
```

You'll notice our use of `data-test-*` attributes. This is because, if
using element IDs or CSS selectors, updates to the app's design or
markup mean your tests will most likely break. By using data
attributes, we can make our tests and interactors resilient to future
changes. We can also use a babel transform like
[`babel-plugin-remove-jsx-attributes`](https://github.com/wireapp/babel-plugin-remove-jsx-attributes)
to remove our testing attributes in production.

Now that we've successfully set up some interactors, we can use them
to start interacting with our app in our tests.

### Making Assertions About Our App

Making assertions sounds pretty straightforward, but since real apps
typically have some async operations associated with them, making
assertions at the correct time can be cumbersome and
headache-inducing.

For example, let's say we need to test that when a user clicks a
button they are shown a random message. When does the message appear
in the DOM so that we can make an assertion about it? After the user
clicks, sure, but how long after the user clicks? In React, it's
whenever the render loop gets around to rendering that specific
message. What if the app makes a network request for this message
first? Well, now we need to also wait for a response before making our
assertion.

Interactors wait for elements to exist in the DOM before interacting
with them, but can we do the same thing with our assertions? Well, yes
we can! Interactors use
[`@bigtest/convergence`](https://github.com/bigtestjs/convergence)
under the hood, and we can utilize convergences for assertions too.

What's a convergence? To put it simply, it's a pure assertion that can
run repeatedly until either it passes, or a timeout has been
exceeded. And pure assertions are expectations that do not cause side
effects.

``` javascript
import { when } from '@bigtest/convergence';

// will only continue once the expectation is true
await when(() => !app.state.isLoading);

// works when throwing errors as well
await when(() => {
  expect(foo).to.equal('bar');
  expect(baz).to.be.undefined;
});
```

Convergent assertions will be called several, maybe even hundreds of
times, depending on the timeout and if the assertion ever passes. So
having side effects in our assertions could cause unintended behavior
that may also result in some serious slowdown.

In regard to our tests, if we make sure all of our assertions are all
pure by keeping our interactions inside of hooks, we can use
[`@bigtest/mocha`](https://github.com/bigtestjs/mocha) to
automatically turn all of our `it` statements into convergences for
us.

``` javascript
import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';

import { setupApplicationForTesting, location } from './helpers';
import DateFormInteractor from './interactors/form';

describe('Date Picker', () => {
  const form = new DateFormInteractor();

  // for our example app, this function also stubs the date to a constant value
  setupApplicationForTesting();

  it('defaults to the current date', () => {
    expect(form.value).to.equal('2018/1/1@0:0');
  });

  describe('submitting a date and time', () => {
    beforeEach(async () => {
      await form
        .year.select('2019')
        .hour.select('12')
        .minute.select('30')
        .submit.click();
    });

    // if this fails, @bigtest/mocha's `it` will keep rerunning until it
    // passes or a timeout has been exceeded
    it('goes to the date countdown', () => {
      expect(location().pathname).to.equal('/2019/01/01/12:30');
    });
  });
});
```

And there we go! We've officially written some big tests that properly
interact with our app how a user would.

## The Big Finale

Alright, so we've written our tests and we can run them just by
running our app in a testing environment. Our tests interact with our
app just how a user would, and all of our tests pass with flying
colors. But we have real projects with CI/CD pipelines and these tests
need to be automatically run, reported, and tracked for us.

Thankfully again, we don't have to do this
ourselves. [Karma](https://github.com/karma-runner/karma) is a
framework agnostic test runner that can automatically launch browsers
and generate reports for us. It has plenty of plugins to work with the
browsers and frameworks we're already using. For our test suite, we're
going to be using
[`karma-webpack`](https://github.com/webpack-contrib/karma-webpack),
[`karma-mocha`](https://github.com/karma-runner/karma-mocha), and
[`karma-mocha-reporter`](https://github.com/litixsoft/karma-mocha-reporter). To
launch our browser, we'll use
[`karma-chrome-launcher`](https://github.com/karma-runner/karma-chrome-launcher).

There are a couple things we need to change first to get our Karma
plugins working smoothly:

1. `karma-webpack` takes a Webpack config, but will disregard our
   `entry` and use the file defined in our Karma config instead. This
   means some of the testing setup we did in our Webpack config won't
   be necessary anymore.
2. `karma-mocha` will automatically set up Mocha and run our tests for
   us, so we'll need to remove the Mocha imports and initialization we
   manually did in our testing index.

Our new testing index will now look something like this:

``` javascript
// tests/index.js
// other setup could be done here too, such as registering chai helpers
const requireTest = require.context('.', true, /-test/);
requireTest.keys().forEach(requireTest);
```

And our Karma config will look like this:

``` javascript
module.exports = (config) => {
  config.set({
    frameworks: ['mocha'], // sets up the Mocha framework automatically
    reporters: ['mocha'], // reports back to the CLI formatted like Mocha
    browsers: ['Chrome'], // automatically launches chrome to run our tests

    files: [
      // karma-webpack will watch our files
      { pattern: 'tests/index.js', watched: false }
    ],

    preprocessors: {
      // tells Karma that we'll be using Webpack to process this file
      'tests/index.js': ['webpack']
    },

    // Mocha reporter options
    mochaReporter: {
      showDiff: true
    },

    // our webpack config exports a function
    webpack: require('./webpack.config')(),

    // webpack dev middleware options
    webpackMiddleware: {
      stats: 'minimal'
    },

    // for more Karma config options, check out the documentation
    // http://karma-runner.github.io/2.0/config/configuration-file.html
  });
};
```

With all of that set up, we can run `karma start` to launch our
browser and automatically start our tests! For our CI/CD integration,
we can add the flag `--single-run` to exit after running our tests in
the specified browsers. To add other browsers, we simple just have to
install other launchers like
[`karma-firefox-launcher`](https://github.com/karma-runner/karma-firefox-launcher)
or
[`karma-safari-launcher`](https://github.com/karma-runner/karma-safari-launcher). We
could even use any of the browsers and devices available on
BrowserStack via
[`karma-browserstack-launcher`](https://github.com/karma-runner/karma-browserstack-launcher)!

---

With a little bit of manual setup, and through testing big, we've
answered the question: _Does my application work in real life?_
However, we've only scratched the surface in this article. We glossed
over some things like convergences and interactors, and we didn't even
get to touch on server mocking with
[`@bigtest/mirage`](https://github.com/bigtestjs/mirage).

Our countdown app lives in the [BigTest examples
repository](https://github.com/bigtestjs/examples/tree/master/react/countdown)
where you can check out the rest of our tests and the entirety of our
configuration files. There will be more examples to come, including
other frameworks and more complicated test setups. Keep an eye out in
the future for more BigTest blog posts and guides, and feel free to
follow and contribute to all of the projects over at the [BigTest
GitHub organization](https://github.com/bigtestjs).
