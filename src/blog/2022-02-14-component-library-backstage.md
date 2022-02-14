---
templateKey: blog-post
title: >-
  Tutorial: How to use your company’s component library with Backstage
date: 2022-02-14T05:00:00.000Z
author: Taras Mankovski
description: >-
  In this tutorial, Taras will show you how to replace Material UI for your component library in Backstage without losing access to its API.
tags:
  - backstage
img: /img/2022-backstage-components.png
---

One of the first questions that a developer starting a Backstage project has to answer is how to make their developer portal match their company’s corporate style. There are several ways of doing this, but I recommend using an approach that will allow developers to use as much of the Backstage UI as possible so that everyone gets the most value from Backstage. The further the developer portal is from the beaten path, the fewer Backstage elements the development team will have access to.

The approach that retains the most value from Backstage is using a [custom Material UI theme](https://backstage.io/docs/getting-started/app-custom-theme#example-of-a-custom-theme) which allows developers to use **all** of the existing Backstage plugins. If specific components need to be modified, there is the option of [overriding Backstage and Material UI styles](https://backstage.io/docs/getting-started/app-custom-theme#overriding-backstage-and-material-ui-components-styles). Admittedly, this approach can take a fair bit of tweaking and can be somewhat tedious, but will likely result in being able to use all of the existing and future Backstage plugins.

If using the UI components provided by Backstage plugins is less important than using your internal component library, there are still good reasons to maintain access to their data. In addition to Material UI components, the Backstage frontend framework provides a data fetching API for retrieving data from the backend. Even if you’re not using the UI components of Backstage plugins, you can continue to benefit from them by leveraging their data API.

In this tutorial, I will illustrate how to replace Material UI with the [Fluent UI](https://developer.microsoft.com/en-us/fluentui#/controls/web) component library, then use the Catalog Client API and FluentUI’s DetailList to display a list of catalog entities from Backstage's backend. Let’s get started!

## Create a Backstage App

If you don’t already have an instance of a Backstage app, create one by running:

```
npx @backstage/create-app
```

For this tutorial, you can select `SQLite` as your backend database as it will save you the hassle of having to run a local instance of `Postgres`.

## Clean up your app

Before we start adding our theme, we need to do a bit of clean up. Since we’re not going to be using Material UI, there is no need to keep its dependencies. We’ll start by removing those packages:

```
yarn workspace app remove @backstage/theme @material-ui/core @material-ui/icons
```

You can also go ahead and delete everything in the `packages/app/src/components/` directory and create a simple `Home` component that will be our new Home page (without all the Backstage frontend elements):

```tsx
// packages/app/src/components/Home.tsx

import React from 'react';

export const Home = () => {
  return <p>Home</p>;
}
```

Next, you need to remove all the routes and plugins and add the new Home component to your app. There is a lot to remove so I’ll show you what your `App.tsx` in `./packages/app/src/` should look like:

```tsx
import React from 'react';
import { Route } from 'react-router';

import { apis } from './apis';
import { createApp } from '@backstage/app-defaults';
import { FlatRoutes } from '@backstage/core-app-api';

import { Home } from './components/Home';

const app = createApp({
  apis,
});

const AppProvider = app.getProvider();
const AppRouter = app.getRouter();

const routes = (
  <FlatRoutes>
    <Route path="/" element={<Home />} />
  </FlatRoutes>
);

const App = () => (
  <AppProvider>
    <AppRouter>
      {routes}
    </AppRouter>
  </AppProvider>
);

export default App;
```

## Install your component library

Next, install the `@fluentui/react` component library to your frontend by running:

```
yarn workspace app add @fluentui/react
```

This will allow you to use components from the library in the frontend application. We can now modify `Home.tsx` to display a component from `@fluentui/react`:

```diff
import React from 'react';
+ import { PrimaryButton } from '@fluentui/react';

export const Home = () => {
-  return <p>Home</p>;
+  return <PrimaryButton>Press me!</PrimaryButton>;
}
```

If you run `yarn start`, you should be able to see a button with the default Fluent UI style that says “Press me!”.

## Change the theme provider

By default, Backstage’s `createApp` uses a Material UI theme provider that adds Backstage’s specific styles. We want to replace this default theme provider with the one from your component library. To do this, you need to modify `App.tsx`:

```diff
- import React from 'react';
+ import React, { ComponentType } from 'react';
+ import { ThemeProvider, PartialTheme } from '@fluentui/react';
...
+ const myTheme: PartialTheme = {
+   semanticColors: {
+     primaryButtonBackground: 'red',
+     primaryButtonText: 'white',
+   },
+ }
+ 
+ const MyThemeProvider: ComponentType<{}> = ({ children }) => {
+   return (<ThemeProvider theme={myTheme}>{children}</ThemeProvider>);
+ }
+
const app = createApp({
  apis,
+  components: {
+    ThemeProvider: MyThemeProvider,
+  }
})
```

Once you make these changes, your UI is now using your component library. Be aware that if you render any components that come with Backstage, they will not work because the default Backstage theme provider will be missing.

## Use Backstage Catalog API to fetch data and display it in a table

The work that you did so far was to add a new theme to the Backstage component. You did this by modifying the frontend app. Other teams sometimes take a different approach where they create an entirely new Create React App project and import _that_ to their Backstage app. Starting a new project may seem appealing, but in practice you’d be giving up more features than you realize. One of the most important lost features is the ability to call data APIs provided by the Backstage framework.

If your connection to the backend is intact, you can still use the data fetching API provided by Backstage. The Backstage UI components you deleted earlier already had data fetching implemented, which means the `Home` component you created is missing that functionality. I will now show how to use the data API to fetch data from the Backstage backend and display it in a `DetailList` component.

## Make catalog API available in your application

First, install `@backstage/catalog-client`:

```
yarn workspace app add @backstage/catalog-client
```

You can make the Catalog API available in your application by adding an API factory to the `apis.ts` file in your `package/app/src/` directory:

```diff
  createApiFactory,
+   discoveryApiRef
} from '@backstage/core-plugin-api';
+ import { catalogApiRef } from '@backstage/plugin-catalog-react';
+ import { CatalogClient } from '@backstage/catalog-client';

export const apis: AnyApiFactory[] = [
+   createApiFactory({
+     api: catalogApiRef,
+     deps: { discoveryApi: discoveryApiRef },
+     factory: ({ discoveryApi }) => new CatalogClient({ discoveryApi })
+   }),
  createApiFactory({
```

Let’s unpack what you see above. You will use the Catalog API reference (which comes from `@backstage/plugin-catalog-react`) to look up the API in your components when using the `useApi` hook. The `AnyApiFactory` factory controls how the Catalog Client is created. `CatalogClient` needs `DiscoveryApiRef`, which provides the factory access to the `DiscoveryApi`. The DiscoveryApi is used to find the URL where the Backstage Catalog API can be found. This piping will make it easy to call the API in future steps.

## Use `useApi` hook to get the CatalogApi

Let’s get rid of the `PrimaryButton` from earlier and make the following additional changes in your `Home` component:

```diff
- import { PrimaryButton } from '@fluentui/react';
+ import { catalogApiRef } from '@backstage/plugin-catalog-react';
+ import { useApi } from '@backstage/core-plugin-api';

export const Home = () => {
-   return <PrimaryButton>Press me!</PrimaryButton>
+   const catalogApi = useApi(catalogApiRef);
}
```

This provides your component with access to reference to the Catalog API. As a result, we can call this API to retrieve data from the Catalog API.

## Use `useAsync` hook to call the CatalogApi

To call the CatalogApi, we need to call `catalogApi.getEntities` function. This function needs to be called with our component renders. We can use the `useAsync` hook to call `catalogApi.getEntities`:

```diff
+ import useAsync from 'react-use/lib/useAsync';

export const Home = () => {
  const catalogApi = useApi(catalogApiRef);
+   const {
+     value = { items: [] },
+     // loading,
+     // error,
+   } = useAsync(() =>
+     catalogApi.getEntities({
+       filter: {
+         kind: 'Component',
+       },
+     }),
+   );
}
```

We could implement the same thing with `useEffect` and `useState` but it’s a lot more work. `useAsync` automatically gives us `loading` and `error` values so we don’t need to handle those situations manually.

## Use `useMemo` hook to convert result from CatalogApi into items for `DetailsList`

FluentUI’s `DetailList` needs to convert results from the CatalogApi. The data needs to be in a specific format so that we can display it in the table:

```diff
- import React from 'react';
+ import React, { useMemo } from 'react';

export const Home = () => {
  ...
+   const items = useMemo(
+     () =>
+       value.items.map(item => ({
+         key: item.metadata.uid,
+         name: item.metadata.name,
+         description: item.metadata.description,
+       })),
+     [value],
+   );
}
```

`useMemo` allows us to covert the response from a CatalogApi response format to DetailList format and cache the result. The caching part is important because without it the list will re-render every time anything in that component changes.

## Render `DetailList` with items

The final step is to import `DetailList` from `@fluentui/react` and render it. Making this last change should generate a list of items from the catalog using the Catalog API and rendered in the components from FluentUI library:

```diff
+ import { DetailsList } from '@fluentui/react';

export const Home = () => {
  ...
+   return <DetailsList items={items} />;
}
```

To check to make sure these new changes are working properly, run `yarn dev` (you’ll need the backend to be running too).

This whole process is a bit involved but doing it this way saves you a lot of trouble in the long run by allowing you to use the data fetching APIs that come with Backstage plugins.

## Conclusion

In this tutorial, I showed you how to clean up the frontend application in preparation for using your own component library, install a component library other than Material UI, override the theme provider to use your component library’s theme provider, and use Backstage’s data fetching API provided by the Catalog API plugin.

This is the “right” way to use your company’s component library because it allows you to use it without completely eliminating all of the benefits that the Backstage framework provides in the frontend application. You might not be able to use the components that Backstage plugins provide because they are tied to Material UI, but you can still use the data fetching APIs that idiomatic Backstage plugins include. 

I hope you enjoyed this tutorial and learned something about Backstage. You can find me on [Twitter](https://twitter.com/tarasm), [GitHub](https://github.com/taras), or via email - tarasm@frontside.com. All of the code from this tutorial can be found in https://github.com/taras/backstage-custom-frontend
