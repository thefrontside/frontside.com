---
templateKey: blog-post
title: Quickly Build Component Libraries with Storybook
author: Jeffrey Cherewaty
date: 2017-12-29T23:00:00.000Z
description: >-
  Design systems have become an effective way to maintain consistency and
  improve feature delivery time. What can developers on smaller teams do to
  apply design system concepts?
tags:
  - design systems
  - component library
  - style guide
  - storybook
image: /img/2017-12-29-quickly-build-component-libraries-with-storybook_storybook.jpg
---

As long as humans have been building things, we've tried to break up the work. When we can carve out smaller tasks, we can share the work among more people and focus on the quality of each little piece.

Tools and technologies have reached a point where nearly everyone building for the web is thinking in components. But when you've got a large team all creating and using components, how do you keep the usage consistent? Designers have had a tool for that problem for decades. Style guides set down rules and guidelines for projects, so they spoke with a consistent look and voice.

By combining a style guide with a library of components, you can create a comprehensive design system.

## Enter Storybook
Prominent companies that have built large design systems usually have to build all new tools for their component libraries. When you have multiple templating languages to deal with and dozens of different product teams, your design system has constraints that no out-of-the-box solution provides.

At Frontside, we're frequently working on brand-new projects instead, so we push open-source solutions that let developers immediately focus on delivering features. For component libraries featuring Vue or React, there's now a one-size-fits-most tool: [Storybook](https://storybook.js.org).

## Writing Stories
With Storybook, developers create "stories" that illustrate and describe different versions of each component. In practice, it feels a lot like writing tests: what are all the possible iterations of this component? Because it aligns with test-driven development philosophy, Storybook makes a great base for adding visual regression testing.

```
import React from 'react';
import { storiesOf } from '@storybook/react';
import Checkbox from './Checkbox';

storiesOf('Checkbox', module)
  .add('Basic Usage', () => (
    <Checkbox
      onChange={() => {}}
      checked=true
      label='Check Me'
    />
  ));
```

[Storybook Docs: Writing Stories](https://storybook.js.org/basics/writing-stories/)

## Addons
Storybook's addon architecture is where the benefits of having an open-source project really pay off. There's a whole ecosystem of pre-built addons, along with the ability to create your own.

### README addon
The codebase we're working with already had great documentation for many of its components. With [`storybook-readme`](https://github.com/tuchk4/storybook-readme), just a couple lines of configuration had each component's README appear in the Storybook environment

```
import Readme from './README.md';

storiesOf('Checkbox', module)
  .addDecorator(withReadme(Readme))
```

### Add a knob
Another useful Storybook addon: [`storybook-knobs`](https://github.com/storybooks/storybook/tree/master/addons/knobs). Component props can be edited within the Storybook UI.

```
import { withKnobs, text } from '@storybook/addon-knobs';

storiesOf('Checkbox', module)
  .addDecorator(withKnobs)
  .add('Basic Usage', () => (
    <Checkbox
      onChange={() => {}}
      checked=true
      label={text('Label', 'Check Me')}
    />
  );
```

### Add an action
[`storybook-actions`](https://github.com/storybooks/storybook/tree/master/addons/actions) help drive component action development. Component actions get stubs that show up in the Storybook UI.

```
import { action } from '@storybook/addon-actions';

storiesOf('Checkbox', module)
  .add('Basic Usage', () => (
    <Checkbox
      onChange={ action('checkbox-toggle') }
      checked=true
      label='Check Me'
    />
  );
```

## Evolving Tools
Storybook is a big landmark for developing component libraries for the web, and we're looking forward to its evolution, and eventually the next set of tools for design systems.

Check out this [Lunch and Learn](https://youtu.be/RHacQsTxnQ4) to see Storybook in action.

Need help creating your own design system? [Reach out to Frontside.](https://frontside.io/contact/)
