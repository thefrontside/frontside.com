---
title: What it takes to bring Ruby to Jenkins
date: 2011-05-12
author: Charles Lowell
tags: java, ruby, jenkins
directory_index: false
---

"Jenkins Ruby Plugins" are at an important, yet fragile stage of their life. Over the past several months, we have made
tremendous progress towards making extending Jenkins with nothing but Ruby a blissful reality. However, at this moment,
they exist only as a collection of hacks, or, to frame it more kindly, "proofs of concept" all buried quite deeply in a
[terribly named repo on github](http://github.com/cowboyd/fog.hpi).


To name a few of them, we are now able to

* automatically discover Ruby plugins and register them
* work with Jenkins internals like BuildWrapper, RootActions, etc.. via a native Ruby-like API
* persist mixed hierarchies of Java and Ruby objects transparently as Jenkins configuration
* use ERB to template views, while still having access to the standard UI helpers
* extend the Jenkins REST API from Ruby

This is by no means an exhaustive list, but I want to stress just how far we've come before I talk about where it is that
we need to go.

While the work done so far represents some phenomenal accomplishments, in the end, they are only technical accomplishments which do not together create a coherent developer experience. So now, for this endeavor to succeed, we must focus our attention on making that *entire experience*, from project start to release after release, as frictionless as possible.

To that end, I propose the following high level goal for the Jenkins Ruby Plugins project:

>To provide the facility to create, develop and release extensions for Jenkins with nothing but knowledge of the language, tools and best practices of the Ruby community.

This is, I think, the most important ideal to aspire to when claiming to provide a Ruby development experience. Unless it feels like the real McCoy, then you aren't really developing Ruby at all, you're just scripting Java with JRuby. You won't fool anybody, and there will be far less enthusiasm and adoption.

That said, several things follow logically from this thesis, the first of which is:

### Absolutely, Positively, No Maven!

This is not an ideological stance on the value of Maven as a <strike>wretched pile of toad sick</strike> software development tool. Rather, it is an explicit acknowledgement that it is not a Ruby tool, it doesn't fit with the community's style, and if you're using it
you might not be doing Java, but you *certainly* aren't doing Ruby. Instead, we should turn to the Ruby tools that
occupy this same space: Rake for scripting the build, and Bundler for dependency management.

### Ruby-Like Project Structure

If we aren't going to use Maven, then why should we be constrained by the project directory structure that it imposes. `src/main/resources/what?` Nope. Just one glance at Jenkins Ruby Plugin's layout in an editor or file system browser
should put a Rubyist's mind right at ease. You see that? There's your `Gemfile` just
where you left him. And oh, your pals `lib/` and `spec/` are there too. Let's get right to work!

### Managing The Project Life-Cycle

From inception to release, you should be able to manage all aspects of your Jenkins plugin with Ruby. There must be single
commands (or rake tasks) to

* conjure a new plugin into existence
* generate model/view boilerplate
* run a server with the plugin loaded
* package, push, tag and release a plugin to update-center

### Testing

The importance of testing in the Ruby community cannot be overstated. The Ruby Tools need to provide a clear path to
testing the plugin at both the unit and functional levels.

### Documentation

The "Ruby-like" API that plugin development provides is similar, but not equivalent to its native Java equivalent.
It is critical that this API be well documented, so that developers can understand it, and do not find themselves constantly
referring to the JavaDoc, which they may very well not understand (it being Java), and might be misleading given the natural
asymmetries of the two APIs.

## Heed the Call!

There are plenty of people who would love to see this project get done, but don't know where to start. I know this because I was one of them. The upshot is that now, as I've just described, there is plenty of work to be done that doesn't require any knowledge of Java and very little knowledge of Jenkins internals. That means that *you* can contribute in a meaningful way!

Next week, I'll be publishing some specifications in the form of Cucumber scenarios for some of the features up above that we can discuss and then hopefully start implementing.

But the most important thing that you can do is to join in on the conversation!

[irc](irc://freenode.net/jenkins), and [email](http://groups.google.com/group/jenkinsrb) are just a few of the ways to reach out!

> Update. I have posted the first scenario: [creating a plugin](https://github.com/cowboyd/jenkins.rb/blob/ruby-plugin-development/features/plugins/create-new-plugin.feature).
> The first bounty is officially posted.
