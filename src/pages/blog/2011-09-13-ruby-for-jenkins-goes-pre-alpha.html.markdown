---
title: Ruby for Jenkins Goes Pre-Alpha
date: 2011-09-13
author: Charles Lowell
tags: java, ruby
directory_index: false
---


To quote Dave Bowman, "something wonderful happened" last week during the weekly [Jenkins-Ruby hack session][1].

We were able to boot a [plugin written in pure Ruby][2] into a Jenkins server just by executing a single command from the command line (rake server). Furthermore, this command did not involve a compilation step, and the plugin that it booted did not bare a trace of evidence that it was to be loaded into a server written in Java.

That's right. Using nothing but good 'ol Bundler and Rake, we hoisted a pure Ruby plugin into the Jenkins runtime.
And I can tell you that after hacking on this for almost a year: it felt... so.... good.... man.

It's not time to declare victory yet, but at least the first two of [our major goals][3] have been realized, and that is definitely a cause to celebrate.

Practically, this means that rubyists can check out the source and get hacking without needing any knowledge of
Java or any Java toolchain. That's why I think it's safe to officially declare the project to be in
a ***pre-alpha*** state.

It isn't yet for the faint of heart, and you're sure to find many things confusing and
difficult. But at least those who know only Ruby can contribute bug reports, identify pain points, and contribute
to the creative process.

It's 8:20am, but it still feels like Miller time.


[1]: http://wiki.jenkins-ci.org/display/JENKINS/Jenkins+plugin+development+in+Ruby  "Jenkins Ruby Hacking"
[2]: https://github.com/cowboyd/jenkins-prototype-ruby-plugin "Prototype Ruby Plugin"
[3]: /2011/05/12/what-it-take-to-bring-ruby-to-jenkins "What it takes to bring Ruby to Jenkins"
