---
templateKey: blog-post
title: >-
  Simplified local development and testing with Auth0 simulation
date: 2022-01-13T05:00:00.000Z
author: Paul Cowan
description: >-
  Auth0 can be difficult to manage in local development and within testing environments such as CI/CD pipelines. An Auth0 simulator can save you from branching your code or maintaining mocks in your tests.
tags:
  - dx
  - javascript
img: /img/2022-auth-simulator.png
---

Auth0 is an excellent service that lets you focus on your app instead of trying to stay up to date with the latest safe and secure authentication practices. However, what’s not so great is having to use Auth0 as part of your local development process or within end-to-end tests.

Recently I had a tough time using Auth0 while running tests that required authentication in a continuous integration environment with no access to the internet. The issue emerged because adding logical branches to my code targeting specific environments and stubbing functions at the test level leaves room for undesired effects.
There are many ways you can address the issue, but most of them are a disaster. Probably the worst solution is to write conditionals that check which environment the code is currently running against. Consider this example:

```ts
if (process.env.NODE_ENV !== 'production') {
  redirectToFakeAuthentication();
} else {
  auth.client.loginWithDefaultDirectory({
    username: email,
    password,
  // etc.
```

This kind of conditional forks your app by environment, leading to bugs escaping into production because developers and tests don't really assess the same app that ends up being deployed but a version catered for them only.

Unfortunately mocking or stubbing calls to Auth0 in a unit or end-to-end test never ends well either. It usually leads to an explosion of mocking code that you must maintain through every change. It may start small, as in the following snippet:

```ts
const mockConfig = (config) => {
  jest.doMock(
    '../auth_config.json',
    () => ({
      domain: 'test-domain.com',
      clientId: '123',
      ...config,
    }),
    { virtual: true }
  );
};
```

But further down the line, you'll find yourself writing mock JSON web tokens (JWTs) and specifying key algorithms, which means wasting precious development time. Before you know it, token checking code has crept into the tests (and who wants to maintain test helpers like this?):

```ts
export const verifyAuth0Token = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(decoded);
    });
  });
};
```

Packages like [mock-jwks](https://www.npmjs.com/package/mock-jwks) help, but it’s still code that needs to be maintained, and as we all know, the less code we write, the fewer problems we have.
A third solution is creating phony Auth0 accounts for different environments, but that too is a maintainability nightmare. The accounts on each environment must now be kept in sync, which is unlikely to happen.

## Solution

However, the unworkable “solutions” presented above also point to the principle that will guide our workable one: namely that we should always strive to have the same code running in every environment. The only difference should be the configuration.
For example, in production we might have this auth0 configuration:

```JSON
{
  domain: myapp.eu.auth0.com,
  clientId: 'PMkiueyWaFdfsbAKXrIpVPmyBTFs4g5iq',
  audience: 'https://thefrontside.auth0.com/api/v1/',
  // etc.
```

And in non-production environments it might look like this:

```JSON
{
  "domain": "localhost:4400",
  "clientId": "00000000000000000000000000000000",
  "audience": "https://your-audience/"
  // etc.
```

The only discernable difference is the `domain` field, which points to a localhost when running in non-production environments (such as your very own laptop or maybe even in a continuous integration environment (CI) that does not have access to the internet).
Imagine your very own Auth0 server running locally to configure specific scenarios while developing or running tests. What if we called it “auth0 simulator” and allowed you to create fake data without cluttering up your existing codebase?

## Auth0 simulator

As chance would have it, such a beast exists as part of the [simulacrum](https://github.com/thefrontside/simulacrum) suite of tools, created to help simulate complex external bounded contexts such as LDAP or Auth0.

The [@simulacrum/auth0-simulator](https://github.com/thefrontside/simulacrum/tree/v0/packages/auth0) package is your very own Auth0 simulator that eliminates the need to log into Auth0 while developing in a non-production environment. It is enormously helpful in local development and end-to-end testing – and even features ready-to-use integrations with Cypress!

## Start your engines

To use it you'll first need to set up a simulation. You can either create your simulation using a [GraphQL interface](https://github.com/thefrontside/simulacrum/tree/v0/packages/auth0#graphql) or through the `@simulacrum/client` JavaScript package:

```ts
async function setupClient({ url }) {
  let client = createClient(url);

  let simulation = await client.createSimulation('auth0', {
    options: {
      audience: 'https://your-audience/',
      scope: 'openid profile email offline_access',
      clientId: 'YOUR_AUTH0_CLIENT_ID',
    },
    services: {
      auth0: {
        port: 4400, // port for the auth0 service itself
      },
    },
  });

  console.log(`auth0 service running at ${simulation.services[0].url}`);
  let person = await client.given(simulation, 'person');
  console.log(
    `username = ${person.data.email} password = ${person.data.password}`
  );
}
```

Fake users are created through `client.given` with random values assigned by default. You can also supply the values if you want:

```ts
let person = yield client.given(simulation, 'person', {
  email: 'bob@gmail.com',
});
```

## Local Development

The goal of `@simulacrum/auth0-simulator` is to behave just like the real Auth0 server does. That means that libraries like `@auth0/auth0-react` should not notice any difference so that you can keep using your regular code and expect it to work without any adjustment when you switch to the real deal. The following snippet would work just as well using the Auth0 simulator and the production environment.

```ts
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};
```

## Testing

Having to redirect to login pages and enter user input when executing unit tests or end-to-end tests would be untenable. What’s especially useful about `@simulacrum/auth0-simulator` is that it makes local simulation instances available to test environments for end-to-end and unit tests without trips to Auth0.

### End-to-end testing with Cypress

Simulacrum has a [@simulacrum/auth0-cypress](https://github.com/thefrontside/simulacrum) package that can silently get an authentication token from the Auth0 simulator often required to run end-to-end tests. In the following example, we'll create an Auth0 simulation instance within a test, enabling the app to run under the config we wish:

```ts
import type { Client, Scenario, Simulation } from '@simulacrum/client';
import { createClient } from '@simulacrum/client';
import auth0Config from '../../cypress.env.json';

describe('log in', () => {
  it('should get token without signing in', () => {
    cy.createSimulation(auth0Config)
      .visit('/')
      .contains('Log out')
      .should('not.exist')
      .given()
      .login()
      .visit('/')
      .contains('Log out')
      .logout();
  });
});
```

### Unit tests

At present, the Auth0 simulator has no official helper for obtaining an access token from the simulation server. But most javascript Auth0 SDKs have helpers for a client login that you can abstract into a helper function and use in conjunction with `@simulacrum/auth0-simulator` in unit tests.

For instance, if you're using `@auth0/auth0-spa-js`, you could use `getTokenSilently` to obtain tokens:

```ts
import configJson from "../../src/auth_config.json";
import { Auth0Client } from '@auth0/auth0-spa-js';

const auth0Client = new Auth0Client({
  audience: configJson.audience,
  client_id: configJson.clientId,
  connection: 'Username-Password-Authentication',
  domain: configJson.domain,
  scope: 'openid profile email',
  cacheLocation: 'localstorage',
  useRefreshTokens: true
});

async function silentLogin({ currentUser }: {currentUser: string}) {
  await auth0Client.getTokenSilently({ currentUser });
});
```

or you could use `loginWithDefaultDirectory` if you're using 'auth0-js'.

## Epilogue

Our Auth0 simulator `@simulacrum/auth0-simulator` makes Auth0’s “pain points” disappear by allowing developers to work locally and test their apps—without introducing fragmentation into their codebase, having to write cumbersome mocking code, or dealing with Auth0 accounts for different environments.
If you are using Auth0 then you really should give [here](https://github.com/thefrontside/simulacrum) a spin.
