---
title: Learning Javascript from the Command Line
date: 2006-07-08
author: Charles Lowell
tags: javascript
---

<p>In the <a href="http://www.drunkandretired/podcast">Drunk and Retired Podcast</a>, <a href="http://www.drunkandretired.com/2006/07/08/drunkandretiredcom-podcast-episode-59-lightside-v-darkside-plus-learning-javascript-the-language-not-the-javascript-the-browser-scriptus/#comments">episode  59</a> I spoke about learning your way around javascript the language independently from the browser, and how you can use the command line tools that come with the various javascript engines to interactively explore the javascript runtime.</p>

<p>When most folks think about javascript, they think about scripts that they embed into their web pages, but the truth is that it is a general-purpose programming language <em>that has absolutely nothing to do with HTML</em>. In fact, the javascript runtime is so orthogonal to other web browser functionality, that mozilla offers the javascript interpreter that it uses in Firefox and friends as a <a href="http://www.mozilla.org/js/spidermonkey">completely separate download</a>. It's available as both .deb or .rpm package, and just to show it: Here's the wonderful hello world program, as entered into the shell.</p>

    cowboyd@subzero:~$ js
    js> alert('hello world')
    1: ReferenceError: alert is not defined
    js>    

<p>OK, so I boobie-trapped that example in an attempt to beat the point I've been making to death. It's an error because `alert()` isn't actually part of javascript. In the context with which we're familiar(DHTML), it's a function that's <em>defined by the browser</em>. Of course, it just so happens that every browser implements `alert()` to behave in almost exactly the same way, but the function itself has nothing to do with the javascript core. Implementing our own version of alert is simple enough though.</p>

    js> var alert = function(message) { print(message)}
    js> alert('hello world')
    hello world
    js>            

<p>Personally, I love the command line because it let's you dig your fingers deep into the computer's brain and, by pushing its buttons directly, see what's going to work and what isn't. Every time I have a question about how the javascript interpreter is going to behave, I don't look up the spec, or write something into my programs that I'm not sure how it will work. Instead, I fire up my trusty interpreter to discover <em>empirically</em> how the system works. Need to know if a RegExp is going to match? Don't guess. Ask the interpreter.</p>

    js> "foo".match(/bar/)
    null
    js> "foo".match(/oo/)
    oo
    js> "foo".match(/oo$/)
    oo
    js>             

<p>Wonder what the built-in "constructor" property of an object is? The runtime can tell you. It's his business after all.</p>

    js> function A() {}
    js> var a = new A()
    js> var o = new Object()
    js> a.constructor

    function A() {
    }

    js> o.constructor

    function Object() {
        [native code]
    }

    js> o.constructor == Object
    true
    js> a.constructor == A
    true
    js>                            

<p>Sure, you could write an in-browser script to do all this and throw output at yourself in the form of alerts, but the beauty of the javascript command line is that you can collapse the whole edit-save-reload-alert scripting cycle into a single step; type in the next line and see what happens. It's that super-tight feedback which let's you learn that much faster.</p>
