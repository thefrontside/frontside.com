---
templateKey: blog-post
title: Patiently waiting for JavaFX
author: Charles Lowell
date: 2008-06-05
tags: java, jafafx
directory_index: false
---

About a year ago, SUN announced a "new" platform for developing embeddable applications on the web, and they called this platform JavaFX. In reality, this new platform seems to me less of an innovation and more of a rehabilitation of the applet infrastructure which they allowed to languish over the last decade.

That's not a criticism, it's a compliment. I'm happy that they're going to give applets another go. Heck, I'm even glad they're calling it JavaFX too. "Applet" always sounded too effete anyway. In any case I've always like the applet model, and wished it were a more viable option for web development. Given the success of Flex, which also uses the applet model, other people must feel this way too.

But I digress.

As far as I can tell (I've only been able to get my hands on some demos and a little open source compiler) JavaFX involves upgrading some of the more boorish aspects of the  java browser plugin. To name a few: faster download and initialization of application and JRE code, tighter integration and communication with the rest of the DOM, modern video and audio codecs.... All those are necessary upgrades to ensure the viability of the platform, but they can hardly be called innovative

That said, one new and curious aspect of JavaFX is that it will (for the most part) <em>not</em> be written in Java. Instead, SUN is promoting a completely new and aptly named scripting language: JavaFX script.

Of all the new features it was the specification of this language that impressed me most. I'm not sure how this little gem of a language managed to come out of SUN, but it's absolutely loaded with modern language features to make programming in it clear and concise.

I'm talking about
<ul>
<li>closures</li>
<li>pure functions</li>
<li>lazy evaluation</li>
<li>list comprehensions (that put ruby's to shame)</li>
<li>optional declarative syntax</li>
<li>rolled in query language for searching and modifying data structures</li>
<li>data binding supported at the language level</li>
<li>tons of stuff I'm sure I don't even know about....</li>
</ul>

Overall it seems like JavaFX script is like 4 separate languages existing in harmony in one neat package, and as I read more and more about it, I kept thinking to myself "This is not just some standard UI scripting language with a little sugar and a few extra hooks for writing GUIs. This is positively <em>avante-garde</em>.

I like the idea that SUN can challenge their developers to think in new ways, but I can also imagine a backlash, or more mildly put, an general aversion in the developer community, since this is not any old language research project, but the centerpiece in SUN's product in the battle over the browser VM.

So where did this decision come from to go with such a departure from the norm when it came to defining JavaFX script? I like it alot, but I worry that SUN is going to chicken out, and go with something a little less sexy but a little more digestible (at least in the short term) to its current developers as well as the developers of competing platforms like Adobe Flex or Microsoft Silverlight.
