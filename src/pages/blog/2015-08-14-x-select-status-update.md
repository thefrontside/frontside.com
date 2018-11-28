---
templateKey: blog-post
title: X-Select Status Update
date: 2015-08-14 17:52 UTC
author: Robert DeLuca
tags: oss, ember, ember-addon, x-select
published: true
directory_index: false
---
At The Frontside, we love open source, and maintaining OSS projects is a high priority.

`emberx-select` has grown in popularity. [Even the ember deprecation guide recommends it](http://emberjs.com/deprecations/v1.x/#toc_ember-select). We are aiming to keep this component up to date with the latest versions of Ember.

Before Glimmer (1.13) compatibility, we are making a release for Ember 1.12 or below.

## What's new in 1.1.3?

- Title attr bound to an option or select. [PR](https://github.com/thefrontside/emberx-select/pull/32)
- Blockless improvements [PRs: [1](https://github.com/thefrontside/emberx-select/pull/31), [2](https://github.com/thefrontside/emberx-select/commit/46c7acca9f7bd3a67b08f1fc1f6174759d47f465)]
- Default tabindex to 0 to make it tabable. [PR](https://github.com/thefrontside/emberx-select/pull/37)
- Test helper [PRs: [1](https://github.com/thefrontside/emberx-select/pull/14), [2](https://github.com/thefrontside/emberx-select/pull/27)]
- Improved testing coverage

See the [diff here](https://github.com/thefrontside/emberx-select/compare/v1.1.2...v1.1.3).

Thank you to everyone that has helped by submitting issues and pull requests! 1.1.3 will be the last version released that's compatible with Ember 1.12 or below.

## What's new in 2.0?

In x-select 2.0 we dropped support for the blockless form. While it is useful for transitioning
from `Ember.select`, we strongly prefer to standardize writing `selects` in Ember as in HTML.
We no longer bundle x-select with the blockless form. To continue using blockless x-select, [use this addon](https://github.com/thefrontside/emberx-select-blockless) it from x-select.

x-select 2.0 arrays are now immutable. Every user selection creates a new state of the selected content.
Previously, multi-selects required updating content as a user interacts with the select component. This was unstable especially with async ember data relationships.

Expect Glimmer/Ember 2.0 compatability in x-select 2.0 thanks to [this PR](https://github.com/thefrontside/emberx-select/pull/33)
from James Rosen!

### Known Glimmer issue with x-select

To use x-select with Glimmer (Ember 1.13.x) requires 1.13.4+. Anything below
1.13.4 will throw `Error: Assertion Failed: x-option component declared without enclosing x-select`
because non-dirty component child views are not getting the correct parentView. You can see the related
ticket [here](https://github.com/emberjs/ember.js/pull/11651).

We also applied a [small hack to work around](https://github.com/thefrontside/emberx-select/commit/843f76d6a033f587f9b5edb5fb0758c05e5629c3)
form attribute bindings which are broken in Ember 1.12-1.13.2 and fixed in Ember 1.13.3.
Ember data bindings are lost, so the parent form should not change. If data bindings are still necessary, call `rerender()` on the component after the data change.

Once again, thanks to all the contributors that helped make the `x-select` component better for everyone!

### Using x-select-blockless

To use `x-select-blockless` you'll need to install both `x-select-blockless` and `x-select` ember addons. This is because
[we rely on](https://github.com/thefrontside/emberx-select-blockless/blob/master/package.json#L42) x-select.


### Compatibility Table

|  x-select | Ember   |
|-----------|---------|
| v1.1.4 and before    | 1.12 or lower |
| v2.x.x and after     | 1.13.4 or higher |
