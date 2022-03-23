---
templateKey: blog-post
title: >-
  Testing Backstage Catalog's ingestion
date: 2022-03-24T05:00:00.000Z
author: Charles Lowell
description: >-
  In order to test whether the Backstage is setting up the Catalog properly, you must start a Backstage server, wait for a while, and assert. This feat is easier said than done, but Charles will guide you through it in this article.
tags:
  - backstage
  - testing
img: /img/2022-backstage-ingestion-test.png
---

A test is a mechanism to answer a simple yes or no question. In my case, the question I want to ask is, "When my Backstage server runs, is it going to ingest stuff into the Catalog properly?" 

It seems to me that there is only one way to find an honest answer:
1. Start a backstage server.
2. Let it run for a while.
3. Query its Catalog API over HTTP to see if it contains the records we want.

It's a small ask that can nevertheless be quite difficult to satisfy. Not only are operating system processes difficult enough to manage already, but also "let it run for a while" is an easy thing to say that is quite hard to put into practice.

Fortunately, by using [structured concurrency](https://frontside.com/blog/2021-10-26-effection-async-await/) coupled with the novel application of [eventual consistency](https://en.wikipedia.org/wiki/Eventual_consistency) from database theory, you can write tests for your backend that are expressive of this question and are both fast and reliable. I'll show you the technique what we use at Frontside with large Backstage codebases to achieve this.

For this article, I've applied the same technique to a sample application scaffolded with `npx @backstage/create-app` (you can find it in [ github.com/cowboyd/backstage-testing-example](https://github.com/cowboyd/backstage-integration-testing-example)).

Our approach works the same whether we're testing the humblest starter kit or the most heavily customized Backstage instance because the tests only interact with Backstage as an *OS process* and an *HTTP server*.

Here is what a test looks like to check that the sample data is ingested into the Catalog. I'll go over each section in turn, but as you read it, take note that the test really is telling you what it is doing.

```tsx
import type { CatalogApi } from '@backstage/catalog-client';
import { describe, beforeEach, it } from '@effection/jest';
import { createBackstage } from './support';

describe("catalog ingestion", () => {
  let catalog: CatalogApi;

  beforeEach(function* () {
    catalog = yield createBackstage();
  });

  it.eventually('ingests the artist lookup component ', function*() {
    const component = yield catalog.getEntityByRef('component:artist-lookup');
    expect(component).toMatchObject({
      metadata: {
        name: 'artist-lookup',
        description: "Artist Lookup",
        tags: ["java", "data"],
      },
      spec: {
        type: 'service',
        owner: 'team-a',
        system: 'artist-engagement-portal'
      }
    });
  });
});
```

This test does what I stated initially: start a backstage server, let it run for a while, and then query its catalog API over HTTP to see if it contains the records I expect. Let's break down how this is accomplished.

## Controlling the Server

The first thing we do is to start a Backstage server with the following declaration:

```tsx
  let catalog: CatalogApi;

  beforeEach(function* () {
    catalog = yield createBackstage();
  });
```

This deceptively small piece of code bears quite a bit of weight. It starts a Backstage server and returns a reference to a Catalog API pointing to that server so that we can query its state.

`createBackstage` starts a completely fresh backstage server, with a completely new database *for every single test case*. The Backstage logs are persisted on a per-test basis in a special `tests/logs` directory to aid in debugging what went wrong whenever there is a failure.

This way, you achieve isolation, foster transparency, and avoid [hidden dependencies](https://stackoverflow.com/a/333704/218137) between your tests. It may seem like a tall order, but this is where [structured concurrency](https://vorpus.org/blog/notes-on-structured-concurrency-or-go-statement-considered-harmful/), and in particular, the application of its principles [to javascript](https://frontside.com/effection) can help out.

Structured concurrency ties the lifetime of the Backstage process to the test. If the test passes, Backstage is shut down. If the test fails, Backstage is shut down. If the test errors or times out, Backstage is shut down. In other words, no matter the test's outcome, the Backstage server process will always be terminated. And importantly, at no point did we have to tell it to do so via an `afterEach` hook or some other explicit teardown mechanism.

These process guarantees give you incredible flexibility by allowing you to embed the Backstage server anywhere in your test case and not worry about how it is cleaned up.

### Assertions Made Simple

Now that the server process is running, how can you make assertions against it that will be fast and reliable? Ideally, assertions should be as simple, fast, and reliable as if you were unit testing a pure synchronous function.

The problem, of course, is that, unlike a pure function, a server is a kinetic mass of state that is in continuous flux. Nevertheless, if you wait long enough, its internal motion will carry it to the point where we will reliably observe the state you expect to see, which is to the presence of the artist lookup service in the Catalog. Now is when the "wait a while" comes into play. The main question is, how long should the test wait? 

Believe it or not, the answer is "long enough."

You could try an explicit wait via `setTimeout()`, but that is a well-documented antipattern. Alternatively, you could get some callback from Backstage that fired after each ingestion cycle was complete, but that adds an internal API used only for testing and means that we can no longer treat our server as a black box.

It turns out the theory of [eventual consistency](https://en.wikipedia.org/wiki/Eventual_consistency) and its concept of "state convergence" can determine how long is long enough with relative ease.

In a regular synchronous assertion, there is no delay between cause and effect:

![Diagram of an assertion at the right time](/img/2022-03-24-backstage-ingestion-testing/assertion-after.png)

The effect of any action is immediately observable, and so when an assertion runs, it can always see that effect, making it simple and reliable.

However, in a highly asynchronous environment such as a Backstage server, you will likely try to run an assertion *before* an action's effects have yet to settle and become externally observable.

![An assertion yielding a false negative](/img/2022-03-24-backstage-ingestion-testing/false-negative.png)

This would result in a false negative, where if you'd just had the patience to wait just a wee bit longer, you could have observed the effect, but instead, you made your assertion too soon, and the test failed.

Here is when eventual consistency comes to the rescue. If you assume that the server state is not immediately available, but is instead only in the process of converging onto some expected state, then instead of making a single observation at the right time, you continually make the same observation again and again until it eventually becomes true.

![Converging assertion](/img/2022-03-24-backstage-ingestion-testing/convergent-assertion.png)

Convergence guarantees that if the state you expect can be observed, it will be observed and that you'll wait just long enough to observe it and no longer. If there is something wrong, and the state never is achieved, then the test case will time out, and you'll be presented with the last failed assertion.

That may seem like a lot of conceptual overhead, but it's all put on the table so that when it comes to writing and reading test cases, your assertions are as simple as though your Backstage server were just another object.

```tsx
it.eventually('ingests the artist lookup component ', function*() {
    const component = yield catalog.getEntityByRef('component:artist-lookup');
    expect(component).toMatchObject({
      metadata: {
        name: 'artist-lookup',
        description: "Artist Lookup",
        tags: ["java", "data"],
      },
      spec: {
        type: 'service',
        owner: 'team-a',
        system: 'artist-engagement-portal'
      }
    });
  });
```

Except for the `eventually` marker, that's the kind of assertion you would expect if you were testing a pure function.

### The Dividend

The upshot of all this is that you now have a test suite that can answer the most critical question and crystal clear in how those questions are expressed. Not only that, but it does so reliably and without any need to account for the timing of internal server processes.

As a result, we have converted our Backstage server from an "environment" that needs to be set up, torn down, and carefully managed throughout our suite into a lightweight resource to be instantiated and tested according to the usual fashion.

### Up Next

Not all Backstage ingestion is done with simple YAML files as the Catalog. Often it can be a complicated process involving integration with many third-party services. Building on the test suite in this article, we'll show how you can test these integrations without resorting to fixtures, mocking, stubbing, or other hacks.