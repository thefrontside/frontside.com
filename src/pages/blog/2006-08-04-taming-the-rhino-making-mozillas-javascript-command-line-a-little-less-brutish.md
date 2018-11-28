---
templateKey: blog-post
title: Taming the Rhino
author: Charles Lowell
date: 2006-08-04T12:00:00.000Z
tags: 
    - javascript
directory_index: false
---

<p>I recently <a href="learning-javascript-from-the-command-line">described</a> how to use the one of the <a href="http://www.mozilla.org/js/">freely available shells</a> as a great way to explore your javascript runtime. There are two implementations of the javascript interpreter sponsored by the Mozilla project, <a href="http://www.mozilla.org/js/spidermonkey">Spider Monkey</a> an interpreter implemented in C, and <a href="http://www.mozilla.org/rhino/">Rhino</a>, an interpreter implemented in Java. With respect to the javascript runtime itself, these two implementations are almost identical, and so what works in one, will generally work in the other. They diverge, however, when it comes to embedding objects and functions that are implemented in a language other than javascript. Naturally, Spidermonkey is better suited for embedding objects implemented in C, while Rhino excels at embedding objects implemented in Java.</p>

<p>What exactly is "embedding" an object implemented in Java? If you don't know what this means already, I could try to describe it to you, but why not show it live and in the flesh with the Rhino command line? That's the exploratory technique that I find so valuable.</p>


    cowboyd@subzero:~$ java -classpath js.jar org.mozilla.javascript.tools.shell.Main
    Rhino 1.5 release 5 2004 03 25
    js> var javaString = new java.lang.String("Hello World")
    js> javaString.hashCode()
    -862545276
    js> javaString.startsWith("Hello")
    true
    js> javaString.startsWith("World")
    false
    js> var jsString = new String("Hello World")
    js> jsString.startsWith("Hello")
    js: "<stdin>", line 5: uncaught JavaScript exception: TypeError: startsWith is not a function. (<stdin>; line 5)
    js>

As you can see, javaString is a reference to an actual `java.lang.String` object, and has access to all the methods of that class, many of which are not contained in the native javascript `String`.

Embedding goes two ways. Not only can you instantiate and use java objects from javascript, but you can also pass in javascript objects as parameters to java methods. You can even extend objects and implement interfaces in javascript! Once again, the command line shows this in action. In this example, we'll implement the `java.lang.Runnable` interface in javascript

    cowboyd@subzero:~$ java -classpath js.jar org.mozilla.javascript.tools.shell.Main
    Rhino 1.5 release 5 2004 03 25
    js> var impl = new Object()
    js> impl.run = function() {print("Yeah that's right, you better run!")}

    function () {
        print("Yeah that's right, you better run!");
    }

    js> var runnable = new java.lang.Runnable(impl)
    js> var thread = new java.lang.Thread(runnable)
    js> thread.run()
    Yeah that's right, you better run!
    js>

<p>This is all well and good, but that's quite a bit of code to get right the first time! Chances are, if you're just starting out with the Rhino command line, you're not going to have as much luck, especially if you're using it as a tool to learn javascript in the first place, and unfortunately, this is where Rhino comes up <em>way</em> short. Rather than have a forgiving <a href="http://en.wikipedia.org/wiki/Command_line_interface">CLI</a>, Rhino punishes you for every syntactic and semantic error that you make by not collecting command history. Even worse, hitting the up and down arrows result in bizarre character literals output directly to the prompt. You can't even correct a mistake that you've made in the current line you're typing without backspacing all the way to the error, and then re-typing from that point on.</p>

<p>In this example, I'd like to arrow-left so that I can correct my misspelling of "java.lang"</p>

    cowboyd@subzero:~$ java -classpath js.jar org.mozilla.javascript.tools.shell.Main
    Rhino 1.5 release 5 2004 03 25
    js> var r = new java.lng.Runnable(^[[D^[[D^[[D^[[D

<p><strong>Ugh!</strong> Or what happens if the shell didn't take my last command because it was slightly bogus? I'd like to retrieve the command with the up-arrow, edit it a little bit in-place and then try again because after all, it was only <em>slightly</em> bogus. Watch me try and recover from this minor syntax error...</p>


    cowboyd@subzero:~$ java -classpath /usr/share/java/js.jar org.mozilla.javascript.tools.shell.Main
    Rhino 1.5 release 5 2004 03 25
    js> var f = function() {print("oops I forgot to close these parens"}
    js: "<stdin>", line 29: missing ) after argument list
    js: var f = function() {print("oops I forgot to close these parens"}
    js: ...............................................................^
    js: "<stdin>", line 29: missing } after function body
    js: var f = function() {print("oops I forgot to close these parens"}
    js: ...............................................................^
    js: "<stdin>", line 29: Compilation produced 2 syntax errors.
    js>
    js> //I know. Up-arrow to the rescue!
    js> ^[[A^[[A^[[A^[[A^[[A^[[A //drat, foiled again!

<p>These problems are in particularly nasty contraposition to the technique of exploration via the shell which I advocate because the the cost for failure is so expensive. Indeed, what is so wonderful about most modern shells is that the cost for a syntax error is so small. For some reason, the implementors of the Rhino CLI decided to implement their shell with the typical functionality circa 1962.</p>

<p>It's not a problem for me though, thanks to one of my favorite unsung java libraries, <a href="http://jline.sourceforge.net/">JLine</a>. JLine hits a super sweet spot in that it takes somewhere around 0 effort to add loads of standard functionality to your command line interfaces. It seems that no one in the java world bothers with a decent CLI; tragic in my opinion, but probably because it's considered well-understood, non-trivial and therefore tedious. With JLine, building that CLI comes at around 0 cost. What's really cool about JLine is that a program doesn't even need to be written with it. It can transparently intercept the console input for <em>any</em> java program and seamlessly splice on any and all functionality you'd expect from a hot shell: in-place editing, command history, you name it. In a word: <em>perfect</em> for a beast like Rhino.</p>

    cowboyd@subzero:~$ java -classpath js.jar:jline.jar  jline.ConsoleRunner org.mozilla.javascript.tools.shell.Main
    Rhino 1.5 release 5 2004 03 25
    js> prnt("oops let me try that again")
    js: "<stdin>", line 1: uncaught JavaScript exception: ReferenceError: "prnt" is not defined. (<stdin>; line 1)
    js> print("oops let me try that again")
    oops let me try that again
    js> //trust me, that was easy. Just like it should have been in the first place.
    js>

<p>JLine truly is a healing salve for your chafing CLI woes. Did I mention that it's cross-platform?</p>

<p>While the barrier to entry is extremely low, the path to upgrade is but a mild upward slope. If you do end up wanting nice extras such as TAB-completion or custom key bindings, it has a simple configuration mechanism, and <a href="http://jline.sourceforge.net/apidocs/index.html">Java API</a> to make the pain of writing custom code as minimal as possible. But that's another bedtime story altogether.</p>

<p>I hope you enjoy JLine with Rhino, or with any other impolite java command lines you may use!</p>
