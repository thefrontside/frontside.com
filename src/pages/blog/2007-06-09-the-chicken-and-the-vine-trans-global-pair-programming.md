---
templateKey: blog-post
title: Trans-Global Pair Programming
author: Charles Lowell
date: 2007-06-09
tags: proskillz
directory_index: false
---

<p>The Frontside Software is a three person company with "offices" in Michigan, Finland, Massachusetts, and New Jersey. We're don't see each other every day, and we're rarely in the same room, but we still do a significant portion of our development work in pairs. Despite many other competing setups, we still do this with the not-so-new, not-so-exciting, yet extremely flexible and reliable <a href="http://www.realvnc.com/what.html" title="Real VNC">VNC</a> combined with a voip product like <a href="http://skype.com" title="Skype VOIP">skype</a>.</p>

<h3>How it works</h3>
<p>One of us (the driver) runs a vnc server which transmits everything that is rendered on his display to one or more vnc clients (passengers) being run by the other half of the pair. That way, the client can see everything that goes on while the driver is coding, including  his code editor, his web browser, his terminal windows, etc... Meanwhile, you've got real-time audio so that you can talk about the work you're doing as you're doing it.</p>

<h3>Is there something better?</h3>
<p>Not yet. We've seen some new collaborative coding tools like <a href=
"http://www.codingmonkeys.de/subethaedit/" title="SubEthaEdit Site">SubEthaEdit</a> and <a href="http://gobby.0x539.de/trac/" title="Gobby Trac Site">Gobby</a> come down with some very slick features. Specifically, the updating and syncing of editor state between the two machines is very fast, and effectively coordinates multiple people editing the same document, with as few clashes as possible. The way in which they do this is impressive, but after having given it several abortive attempts as a real solution for remote pair programming, we went back to good old VNC. Here's why:</p>
<ol>
<li><strong>Lack of editing features:</strong> The collaborative editors of today are good at one thing: editing text collaboratively. The problem is that when you're pair-programming, you're not editing text, you're editing code, and code is only a simple sequence of text to a computer. There are lots of editors these days that leverage the semantically rich structure of the documents on which they operate like TextMate, Emacs, Eclipse.... everybody has a favorite, and because your collaborative editor is not your favorite, that means it sucks ;-)</li>
<li><strong>Lack of environment:</strong> Of course, there are a scant few collaborative editing plug-ins for existing IDEs which would seem to address this problem, but adding on another layer, development is about more than just coding. It's about browsing documentation, running servers, invoking build scripts from the command line, and about a million other tiny tasks. In effect, your <em>actual</em> IDE is not just one application, it's your whole computer, and if the only thing being shared is a single app, then it cuts your pair out of a lot of important context. With VNC, everybody sees what's going on all the time. They can see not only the code, but also the running program.</li>
<li><strong>Editing the same document at the same time isn't really helpful anyway</strong>: If you've done much pair-programming, then you realize that the real value doesn't come from having two sets of fingers on the keyboard at the same time. In fact quite the opposite: Both participants are following the thread of development, but one of them is freed entirely from the act of coding so that they can think about high-level architectural issues, or lookup api docs, or google for resources --all in parallel. Having both people pounding on the keyboard actually hinders this dynamic.</li>
<li><strong>VNC is cross platform</strong>: This is a biggie. There are vnc clients and servers for Windows, OSX, and Linux (we code on all three), and they all interoperate with each other. That's a pretty hard feature to top, especially for single-platform apps like SubEthaEdit and Gobby which run on OSX and Linux respectively.</li>
</ol>

<p>About the only drawback to pair programming with VNC is that there can be some fairly significant lag (between 1-4 seconds) depending on network load on either end, but even so, when it comes to <em>actually</em> developing collaboratively, VNC and Skype are our daily tools of choice.</p>

<h3>VNC Clients/servers</h3>
<ul>
<li><strong>OSX client</strong>: <a href="http://sourceforge.net/projects/cotvnc/" title="Chicken of the VNC">Chicken of the VNC</a></li>
<li><strong>OSX server</strong>: <a href="http://www.redstonesoftware.com/products/vine/server/vineosx/" title="Vine Server">Vine Server</a></li>
<li><strong>Windows/Linux client/server</strong>: <a href="http://www.tightvnc.com/download.html" title="Tight VNC">http://www.tightvnc.com/download.html</a></li>
</ul>
