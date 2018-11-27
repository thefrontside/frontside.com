---
title: In Search of a Better Autogrowing Textfield
date: 2008-12-16
author: Charles Lowell
tags: dhtml
directory_index: false
---

Autogrowing textfields are a nice piece of flash for any web application. They conserve precious screen real-estate, but grow to a height just big enough to accomodate the text the user actually typed without resorting to unsightly things scrollbars.

There are a number of solutions out there, but since I'm using <a target="_blank" href="http://jquery.com">jQuery</a> on my current project, the two that I evaluated were <a href="http://plugins.jquery.com/project/Growfield" target="_blank">Growfield</a> and <a target="_blank" href="http://plugins.jquery.com/project/Autogrow">Autogrow</a>.

While those two plugins often did what they were supposed to do, they also had tons of quirks and edge cases that prompted me give it a go myself. Specifically, I found that depending on the browser and operating system I would encounter:

* eye-jarring jitter wherein the textfield would expand and contract my 1 or 2 pixels with every keystroke</li>
* resizing of the textfield to 0 pixels, when there was no text in the box
* intermittent loss of focus on some browsers</li>

But most importantly, it seemed that more often than not, the text did not actually grow correctly in any of the real-world environments that I tried in my production application.

As I discovered, the main reason for this was that the technique used was to fill a hidden DIV element with the text from the textfield, and then use the height of that DIV to determine how tall the textfield should be. That works great except for one nasty detail: most browsers use native widgets for text inputs, and those native widgets have their own word-wrap and layout code, so even things like font, line-height and letter spacing being equal, you can still get different word-wrap behavior from OS to OS.

In an attempt to side-step all of these issues, I thought "what if instead of using a DIV element to calculate the height, I could use a native textfield?" After all, if native textfields use a different word-wrap and layout algorithms, can't I just try and harness those algorithms, whatever they might be? At first this seems perfectly circular i.e.: I don't know what the ideal height of a textarea should be, so I'll use the height of a texarea to find out. Of course there's a twist, and the wonderful little property that makes it all possible is the <a target="_blank" href="https://developer.mozilla.org/en/DOM/element.scrollHeight">scrollHeight</a>.

lines, not heights.
