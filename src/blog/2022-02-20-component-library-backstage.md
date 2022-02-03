---
templateKey: blog-post
title: >-
  How to use your company's component library with Backstage
date: 2022-02-20T05:00:00.000Z
author: Taras Mankovski
description: >-
  WIP
tags:
  - backstage
img: /img/2022-backstage-dev-containers-windows.png # replace later
---

One of the first questions that a developer starting a Backstage project has to answer is how to make their developer portal match their company’s corporate style. There are several ways of doing this. I would recommend that you use an approach that will allow you to use as much Backstage UI as possible, so you and your team get the most value from Backstage. Further, you go away from the beaten path, fewer pieces of Backstage you’ll be able to use. 

The approach that retains the most value from Backstage is using a [custom Material UI theme](https://backstage.io/docs/getting-started/app-custom-theme#example-of-a-custom-theme) which allows you to use all of the existing Backstage plugins. If you need to modify specific components, you can try [overriding Backstage and Material UI styles](https://backstage.io/docs/getting-started/app-custom-theme#overriding-backstage-and-material-ui-components-styles). Admittedly, this approach can take a lot of tweaking and can be somewhat tedious, but you have a pretty good chance of being able to use all of the existing and future Backstage plugins.

If using the frontend component provided by Backstage plugins is less important to you than using your own component library, then there is something else you should know. In addition to Material UI components, the Backstage frontend framework provides a data fetching API for retrieving data from the backend. You can use your component library instead of Material UI but I would strongly recommend that you continue to use the data fetching Apis that come with Backstage plugins. This will allow you to still use Backstage plugins even if you’re not using the components that they provide.

In this tutorial, I will show you how to replace Material UI with [Fluent UI](https://developer.microsoft.com/en-us/fluentui#/controls/web) component library, then use Catalog Client API provided by the Catalog plugin to display a list of entities from the catalog in FluentUI’s DetailList. Let’s get started!

## Clean up your app

Before we start adding our theme, we need to do a bit of clean up. Since we’re not going to be using Material UI, there is no need to keep its dependencies. We’ll start by removing `@backstage/theme`, `@material-ui/core` and `@material-ui/icons` packages. We’ll also remove all of the components that are created with Material UI which includes all of the plugins that come from Backstage. You can see the carnage in full glory [in this commit](https://github.com/taras/backstage-custom-frontend/commit/c3cd35041aeb0f8a148d8ee130002175cefa582a#diff-9fa008865bef344ab2f931a4ddf20163882b86ee764718adacf098dc19991946). Make sure to run `yarn` to generate a new `yarn.lock` file with removed dependencies. I created a `Home` component that will be our new [Home page](https://github.com/taras/backstage-custom-frontend/commit/c3cd35041aeb0f8a148d8ee130002175cefa582a#diff-506c6e0446e3a8a3fd0e200ca38bef375238189a79b7a32bfeeef93f464abb33) without all of the Backstage frontend goodness. To access this component, I created a route and removed all of the other routes [from App.tsx](https://github.com/taras/backstage-custom-frontend/commit/c3cd35041aeb0f8a148d8ee130002175cefa582a#diff-2d6eea6932e73947413887c8547a8756f34d08cb3c08ae70d70922e5c3f2102aL58).

## Install your component library

Now we can install the new component library by adding the `@fluentui/react` to package.json in `packages/frontend` by running via `yarn add @fluentui/react`. This will allow us to use components from the library in our frontend application. You should now see `@fluentui/react` in your package.json as we have [here](https://github.com/taras/backstage-custom-frontend/commit/3f0a54ee6f041f1e0d8c917ce781b6a58ed78210#diff-9fa008865bef344ab2f931a4ddf20163882b86ee764718adacf098dc19991946). We can now modify the Home component to display a component from `@fluentui/react` library as [we’ve done here](https://github.com/taras/backstage-custom-frontend/commit/9e365e06478c386dcf6724d498c71604c691fe02#diff-506c6e0446e3a8a3fd0e200ca38bef375238189a79b7a32bfeeef93f464abb33R5). If you run `yarn start`, you should be able to see a button with the default Fluent UI style that says “Press me!”.

## Change the theme provider

By default, Backstage’s `createApp` uses a MaterialUI theme provider that adds Backstage specific styles. We want to replace the default theme provider with your component libraries’ provider. To do this, you need to modify `App.tsx` to replace the ThemeProvider component. You can see this [here](https://github.com/taras/backstage-custom-frontend/commit/a0f944a93e0fdc0baa65f51ad844b5a2c940efd7#diff-2d6eea6932e73947413887c8547a8756f34d08cb3c08ae70d70922e5c3f2102aR24). Once you make this change, your UI is now completely using your component library. Be aware that if you render any components that come from Backstage, they will now not work because the Backstage theme provider will be missing.

## Use Backstage Catalog API to fetch data and display it in a table

The work that we did so far was to include the new theme in our Backstage component. We did this by modifying the frontend package that comes with Backstage. This is a different approach than I’ve seen some teams take where they create a completely new Create React App project and add their component library to this package. Starting a completely new project might seem appealing but in practice, they’re giving up more than they know. One of the features that the Backstage framework provides is the ability to call data APIs provided by plugins. Even though we’re not using Material UI, we still need to fetch data. If our connection to the backend is intact, that means that we can still use the data fetching APIs provided by Backstage plugins, even when we’re not using the components that plugins provide. Starting from scratch means that your frontend app won’t know how to access the backend.

I will now show you how to use the data fetching API that the catalog plugin provides to fetch data from the catalog and display it in a DetailList component provided by FluentUI. 

This is done in a few steps,

1. Make catalog API available in your application

This is done by adding an API factory to apis.ts file. The catalog API reference comes from the `@backstage/plugin-catalog-react` package. This reference will be used to look up this API in your components when using `useApi` hook. This factory controls how the Catalog Client is created. CatalogClient needs DiscoveryApiRef which provides the factory access to the DiscoveryApi. The DiscoveryApi is used to find the URL where the Backstage Catalog API can be found. This is the piping that makes it easy for us to call the API in future steps. You can see this change in [api.ts file](https://github.com/taras/backstage-custom-frontend/commit/a457860483d5c29d97ebe0c1a197717f9abda90f#diff-e1f1ba7d9f1db6d569baf11331bff52d2eba3e0b445ae27a45411a34008c12e5R10-R20).

2. Use `useApi` hook to get the catalog api

const catalogApi = useApi(catalogApiRef); ([see](https://github.com/taras/backstage-custom-frontend/commit/a457860483d5c29d97ebe0c1a197717f9abda90f#diff-506c6e0446e3a8a3fd0e200ca38bef375238189a79b7a32bfeeef93f464abb33R32)) 

This provides your component with access to reference to the catalog API. Now, we can call this API to retrieve data from the catalog API. 

3. Use useAsync hook to call the CatalogApi

To call the CatalogApi, we need to call `catalogApi.getEntities` function. This function needs to be called with our component renders. We can use `useAsync` hook to call `catalogApi.getEntities` as we do [here](https://github.com/taras/backstage-custom-frontend/commit/a457860483d5c29d97ebe0c1a197717f9abda90f#diff-506c6e0446e3a8a3fd0e200ca38bef375238189a79b7a32bfeeef93f464abb33R33-R43). We could implement the same thing with `useEffect` and `useState` but it’s a lot more work. `useAsync` automatically gives us `loading` and `error` values so we don’t need to handle those situations manually. 

4. Use useMemo hook to convert result from CatalogApi into items for DetailsList

This is something that FluentUi’s DetailList needs. The data needs to be in a specific format so that we can display it in the table. `useMemo` allows us to covert the response from CatalogApi response format to DetailList format and cache the result. The caching part is important because without the caching, the list will re-render every time anything in that component changes. You can see how we did that [here](https://github.com/taras/backstage-custom-frontend/commit/a457860483d5c29d97ebe0c1a197717f9abda90f#diff-506c6e0446e3a8a3fd0e200ca38bef375238189a79b7a32bfeeef93f464abb33R45-R53).

5. Render DetailList with items

The final step is to import DetailList from [`@fluentui/react` package](https://github.com/taras/backstage-custom-frontend/commit/a457860483d5c29d97ebe0c1a197717f9abda90f#diff-506c6e0446e3a8a3fd0e200ca38bef375238189a79b7a32bfeeef93f464abb33R2-R9) and [render it](https://github.com/taras/backstage-custom-frontend/commit/a457860483d5c29d97ebe0c1a197717f9abda90f#diff-506c6e0446e3a8a3fd0e200ca38bef375238189a79b7a32bfeeef93f464abb33R65-R71). This should give a list of items from the catalog using the Catalog Api and rendered in the component from FluentUI library. 

This whole process is a bit involved but doing it this way saves you a lot of trouble by allowing you to use the data fetching Apis that come with Backstage plugins. 

## Conclusion

In this tutorial, I showed you how to clean up the frontend application in preparation for using your own component library, install a component library other than Material UI, override the theme provider to use your component library’s theme provider and use Backstage’s data fetching Api provide by the Catalog Api plugin. 

This is the “right” way to use your company’s component library because it allows you to use your company’s component library without completely eliminating all of the benefits that Backstage framework provides in the frontend application. You might not be able to use the components that Backstage plugins provide because they are tied to Material UI, but you can still use the data fetching Apis that idiomatic Backstage plugins include. 

I hope you enjoyed this tutorial and learned something about Backstage. You can find me on Twitter at tarasm, GitHub as taras or via email - taras@frontside.com. All of the code from this tutorial can be found in https://github.com/taras/backstage-custom-frontend
