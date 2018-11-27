---
title: Global Accessibility Awareness Day
date: 2016-05-17 05:35 UTC
tags: accessibility, ember.js, community
published: true
image: http://www.globalaccessibilityawarenessday.org/img/gaad-logo.png
author: Robert DeLuca
directory_index: false
---

Thursday May 19th marks the fifth
[Global Accessibility Awareness Day](http://www.globalaccessibilityawarenessday.org/). The
goal for Global Accessibility Awareness Day (or GAAD for short) is to
get people who work in technology to start talking, thinking, or
learning about accessibility.

If you're not familiar, accessibility is about building solutions for
those who have disabilities. For the web, it means considering those
who are deaf, blind, colorblind, or have motor skill disabilities in
your design and development.

A group of people that deeply care about accessibility and
Ember.js have banded together. That group is called
[ember-a11y](https://github.com/ember-a11y). Our goal is to make ember
accessible by default as much as we can, and the first step in that
direction is our
[ember-a11y](https://github.com/ember-a11y/ember-a11y) addon that
fills the gaps of the Ember router. Before this addon, those who rely
on screen readers would never know the page updated when switching
routes. [Here is a quick video demonstrating this.](https://www.youtube.com/watch?v=1BGmTj4j3ms)

That's only the start of what we want to accomplish as a
team. We're putting together a website that isolates and compiles some
of the top ember addons on [Ember Observer](http://ember-observer.com)
so you or assistive technology providers can test them. You can
[find the website here](https://ember-a11y.github.io/a11y-demo-app/).

For GAAD 2016 we would love your help adding as many of the
[top component addons from ember observer](https://emberobserver.com/categories/components)
as possible. To stop work duplication,
[add an issue](https://github.com/ember-a11y/a11y-demo-app/issues/new)
**BEFORE** you start implementing the addon. That way, if someone else has
already started work on the addon you wanted to implement, you would know.

If that doesn't strike your fancy and would like to contribute to
addons,
[check out this spreadsheet.](https://docs.google.com/spreadsheets/d/1q4DkaNwH8mh7xZJa1TmrHNcFuFuWdQ80iG88c7N4QII/edit#gid=0)
Here we've started a list of addons that need accessiblity work. The
list can range anything from adding a `role` attribute to a
div acting as a button, to pushing accessibility through for the
wildly popular date picker component, Pikaday. To start working on
something from the spreadsheet, place your name in the "assignee"
column and highlight the row according to the legend at the bottom of
the document. You can also add things to the spreadsheet you find from
testing other addons!

You could also catch this Google IO event about Accessibility titled
["Accessibility is My Favorite Part of the Platform".](https://events.google.com/io2016/schedule?sid=38631cfd-0bef-e511-a517-00155d5066d7#day2/38631cfd-0bef-e511-aI517-00155d5066d7)
It is a great talk that we can learn a lot from.

If none of that looks interesting to you, at the very least spend 10-15
mins with a screen reader on any of your favorite sites. Try closing
your eyes or dimming the screen and navigating only using the screen
reader. This will help you understand how anyone who relies on a
screen reader uses a website. **This might be one of the most valuable
things you do on GAAD.**

If you're an OS X user,
[WebAIM has a excellent tutorial on how to use VoiceOver](http://webaim.org/articles/voiceover/). Use
CMD + F5 to toggle VoiceOver on or off. You can also toggle VoiceOver
on your iPhone if ask Siri to turn it on or off.

If you're on Windows, you can use
[JAWS on a free trial](http://www.freedomscientific.com/downloads/jaws)
or [NVDA](http://www.nvaccess.org/download/) which is free. JAWS is
the most popular screen reader
currently. [WebAIM also has a great JAWS tutorial](http://webaim.org/articles/jaws/)
and [NVDA tutorial.](http://webaim.org/articles/nvda/)

For me, this Global Accessibility Awareness Day will be sponsored by
The Frontside. I'm going to try to give back to the community as much
as possible. My day is going to be split into 3 parts:

- Push accessibility through [for Pikaday](https://github.com/dbushell/Pikaday/pull/458)
- Pairing hours [1-3pm]
- [Add template linting for common accessibility mistakes](https://github.com/rwjblue/ember-template-lint/issues/41)

I would like to pair with as many people as possible in 3 hours. Each
pairing session will be 25 minutes long and we can work on anything
accessibility-related you would like. This could be dropping the
ember-a11y addon into one of your apps, solving an issue from the
spreadsheet, or using a screen reader on websites. Sound interesting?
[Sign up here!](http://pair.ember-a11y.com) We're going to be using Screenhero or Skype for
screen sharing.

I'll be around all day to help. Feel free to reach out on twitter
([@robdel12](http://twitter.com/robdel12)) or on Slack (robdel12)! For Slack you
can snag me in the [web-a11y Slack](https://web-a11y.herokuapp.com/)
or the
[Ember community slack](https://ember-community-slackin.herokuapp.com/). What
are you waiting for? Let's get out there and make the web a little more
accessible! :)
