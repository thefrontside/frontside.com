---
templateKey: blog-post
title: >-
  Testing Backstage Catalog's Ingestion Part 2: Safely Refactoring An LDAP Integration
date: 2022-04-26T05:00:00.000Z
author: Charles Lowell
description: >-
  This is the second part in a series on how to achieve real confidence in your backstage ingestion via testing. We’ll be relying on the techniques introduced there to test a non-trivial external application. What follows may not make much sense without a grasp of those techniques, so I highly recommend starting there first and then coming back.
tags:
  - backstage
  - testing
img: /img/2022-04-26-ingestion-test-in-backstage-part-2.png
---

In our article on [testing your Backstage catalog ingestion](https://frontside.com/blog/2022-03-24-testing-backstage-catalog-ingestors/), we demonstrated the technique of using the concepts of *structured concurrency* and *eventual consistency* to test a backstage server solely via its external interfaces: as an operating system process and a http server. The payoff for organizing your tests that way is that they end up at the ideal sweet spot intersection: replicating how the server actually runs and behaves in production while still maintaining desirable test properties such as speed, isolation, and repeatability. Rather than reaching into the guts of your ingestion code and testing the inputs and outputs of individual viscera, this approach instead embeds your server as a single holistic unit directly into your test cases. This means that not only can you test anything in your server using the exact same test harness, but also you are free to re-organize the internals of the server as you see fit, and your test cases need never change.

In this article we’ll demonstrate this by refactoring to upgrade a Backstage server from the legacy LDAP org processor to the new LDAP entity provider, all without changing a single line of the test case.

If you recall, the fundamental strategy of the basic ingestion test case for locations defined in a fixed YAML was as straightforward as we dared to make it:

1. Start a Backstage server
2. Let it run for a while
3. Check to make sure that the entities we expect were ingested

We’ll use the exact same strategy as before with the only difference being that instead of checking that service components are ingested from our YAML files, we’ll check that our user entities are properly ingested from our LDAP server.

## Taming our dependencies

But wait: there’s a problem here. How are we going to make our tests isolated and repeatable when they depend on an external data source like LDAP? Before it was easy when our only external dependency was some static YAML files, but an LDAP server is a different beast altogether. What if the content of its directory changes in between test runs? What if it sits behind a firewall that can’t always be accessed on a developer’s machine or in a CI enviornment? What if it goes down altogether? How will we run our tests in those situations?

Those are all legitimate concerns, but happily they all have a common solution. We can use a *test double* instead that starts a simulation of the LDAP server. The simulation doesn’t need to do everything that the LDAP server does – it only needs to replicate what Backstage’s LDAP Entity Provider and Processor use.

![Backstage Simulated ldap](/img/2022-04-26-ingestion-test-in-backstage-part-2/backstage-simulated-ldap.png)

Using a simulator as a test double means that we get all the benefits of isolation and repeatability when using a mock or stub, but without having to sacrifice any of the confidence in the viability of our test because it’s actually using 100% of the production code with no additives or substitutes.

In fact, we’ve developed an [LDAP simulator](https://www.npmjs.com/package/@simulacrum/ldap-simulator) just for this purpose, which we can use inside of our test case. With this tool in hand, we can start up a simulated LDAP server instantaneously – right before we start our Backstage server – so the only thing that is different is that our test goes from this:

```tsx
yield createBackstage();
```

to this:

```tsx
yield createLDAPServer();
yield createBackstage();
```

That was easy! Now that we have our very own LDAP server embedded in our test case, all we have to do is seed it with user and group data, and then use our convergent assertions to confirm that those records were ingested in the catalog

```tsx
let catalog: CatalogApi;

beforeEach(function* () {
  yield createLDAPServer({
    users: [{
      cn: 'cowboyd',
      uid: 'cowboyd',
      name: 'Charles Lowell',
      uuid: 'xyz123-cowboyd',
      mail: 'cowboyd@example.com',
      password: 'password',
      avatar: 'https://avatars.dicebear.com/api/open-peeps/cowboyd.svg'
    }]
  });
  catalog = yield createBackstage();
});

/// other catalog tests

it.eventually("ingests users from LDAP into the catalog", function*() {
  let user = yield catalog.getEntityByRef('user:cowboyd')
  expect(user).toMatchObject({
    spec: {
      profile: {
        email: 'cowboyd@example.com',
        picture: 'https://avatars.dicebear.com/api/open-peeps/cowboyd.svg',
        displayName: 'Charles Lowell'
      }
    }
  })
});
```

## Upgrade with confidence

![Terminal Test Running](/img/2022-04-26-ingestion-test-in-backstage-part-2/tests-running-part-2-big.gif)

One of the main points I’ve been stressing is that this style of test only ever uses the *public API* of Backstage, which means that no matter what is going on under the covers, our test case verifies the most important aspect of its behavior: what it will do when you actually use it. And because our test only uses the “outside” of Backstage, it means that we have a free hand to change whatever is inside without worrying that we might break our tests.

In the [example repository](https://github.com/cowboyd/backstage-integration-testing-example), our initial LDAP integration used a Processor combined with a [custom user transformer](https://github.com/cowboyd/backstage-integration-testing-example/blob/ldap/packages/backend/src/plugins/catalog.ts#L17-L27) in order to map the fields from our LDAP user entry into a Backstage user entity. Here is our transformer that maps the `name` and `avatar` fields from our entry into the `spec.profile.displayName` and `spec.profile.picture` fields of our user entity.

```tsx
async userTransformer(vendor, config, entry) {
  let user = await defaultUserTransformer(vendor, config, entry);
  return merge(user, {
    spec: {
      profile: {
        displayName: vendor.decodeStringAttribute(entry, 'name')[0],
        picture: vendor.decodeStringAttribute(entry, 'avatar')[0],
      }
    }
  });
}
```

But [this is the old way](https://backstage.io/docs/integrations/ldap/org#using-a-processor-instead-of-a-provider). The new way is to use an entity provider, and a simple set of field mappings in your `app-config.yaml`. We want the transformation to look like this:

```yaml
users:
  map:
   displayName: name
   picture: avatar
```

Let’s start with a passing test suite:

```
PASS  src/catalog.test.ts (18.847 s)
  catalog ingestion
    ✓ can connect to the catalog (5348 ms)
    ✓ ingests the artist lookup component  (4469 ms)
    ✓ ingests the example user from ldap into the catalog (4298 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        19.208 s
Ran all test suites.
```

If we first migrate our catalog to use the entity provider instead of the processor, but don’t add the field mappings yet, our test suite automatically fails:

```
FAIL  src/catalog.test.ts (21.039 s)
  catalog ingestion
    ✓ can connect to the catalog (4318 ms)
    ✓ ingests the artist lookup component  (4700 ms)
    ✕ ingests the example user from ldap into the catalog (9063 ms)

  ● catalog ingestion › ingests the example user from ldap into the catalog

    expect(received).toMatchObject(expected)

    - Expected  - 2
    + Received  + 1

      Object {
        "spec": Object {
          "profile": Object {
    -       "displayName": "Charles Lowell",
    +       "displayName": "cowboyd",
            "email": "cowboyd@example.com",
    -       "picture": "https://avatars.dicebear.com/api/open-peeps/cowboyd.svg",
          },
        },
      }

      45 |   it.eventually('ingests the example user from ldap into the catalog', function*() {
      46 |     let user = yield catalog.getEntityByRef('user:cowboyd')
    > 47 |     expect(user).toMatchObject({
         |                  ^
      48 |       spec: {
      49 |         profile: {
      50 |           email: 'cowboyd@example.com',

      at Object.<anonymous> (catalog.test.ts:47:18)
      at produce (../../../node_modules/@effection/core/src/future.ts:115:15)
      at Promise.race.then.produce.state (../../../node_modules/@effection/core/src/controller/promise-controller.ts:11:9)
          at runMicrotasks (<anonymous>)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 2 passed, 3 total
Snapshots:   0 total
Time:        21.514 s
Ran all test suites.
```

Not only has it detected that something is amiss, but it has also told us *exactly* what went wrong. The record has been found, but the `spec.profile.displayName` and `spec.profile.picture` fields are no longer being populated correctly. However, if we add those mappings to our `app-config.yaml` the tests re-run and pass again:

```
PASS  src/catalog.test.ts (17.195 s)
  catalog ingestion
    ✓ can connect to the catalog (4962 ms)
    ✓ ingests the artist lookup component  (5102 ms)
    ✓ ingests the example user from ldap into the catalog (4223 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        17.645 s, estimated 22 s
Ran all test suites.
```

We completely changed the mechanism for ingestion of users from LDAP, and yet our tests did not change by a single line. Don’t believe me? [Check the diff!](https://github.com/cowboyd/backstage-integration-testing-example/compare/ldap...ldap-entity-provider)

## Focus on what matters

We know tests are important, but they can be so difficult to set up and such a nightmare to evolve along with your codebase that most of the time we don’t even bother. But a workable and efficient solution is to imagine the simplest, most durable test you can, and then put the work in to attack the complexity, separating that from being able to express that simple, durable test in code. In the case of ingestion, the simplest thing that could possibly work is to turn it all on and see what happens, and take a “wait and see” attitude toward complexity.
