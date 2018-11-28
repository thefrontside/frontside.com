---
templateKey: blog-post
title: Live Stylesheets
author: Charles Lowell
date: 2006-07-15T12:00:00.000Z
tags: 
   - dhtml
   - javascript
directory_index: false
---

<p>Even after working with DTML for over a year, I'm still constantly astounded by how <em>dynamic it actually is</em>. The most important thing to keep in the back of your head as a DHTML programmer is that the same mechanisms used by the browser to build an HTML document at load time are available to your in-page scripts. So, really, the static loading of your pages when you access a url is just the HTML parser invoking the same methods on the same objects that are available to your javascript code.</p>
<!--break-->
<p>Take this static HTML code:</p>
<code type="html">
<html>
<body><div id="foo">This is my div</div></body>
</html>
</code>

<p>The same result can be achieved dynamically:</p>
<code type="html">
<html>
<body onload="addFoo()">
<script type="text/javascript">
function addFoo() {
   var foo = document.createElement('div')
   foo.id = "foo"
   var fooContent = document.createTextNode("This is my div")
   foo.appendChild(fooContent)
   document.body.appendChild(foo)
}
</script>
</body>
</html>
</code>

<p>Nothing mind-blowing there; indeed, this technique is the cornerstone of DHTML. But it takes awhile to let it sink in to the point where using it is one of your first strategies to solving a problem. Specifically, you can use it not only to dynamically change layout-related HTML elements (span, div, ul, table, et al...), but also to create/modify <em>behavioral elements</em>(link, script, meta, etc...)</p>

<p>That said, I was recently trying to create a CSS stylesheet at runtime, and enable it so that its rules would be active in the page. At first, I was trying to use the <a href="http://www.w3.org/TR/DOM-Level-2-Style/ecma-script-binding.html">W3C DOM CSS interface</a>, the idea being to  create a stylesheet object, add a bunch of rules to it corresponding to the rules that I wanted, and then put it into the stylesheets array. Unfortunately, doing this in a cross-platform way is <a href="http://www.quirksmode.org/dom/w3c_css.html">borderline impossible</a>. After pounding my head against that for awhile and getting nowhere,  I figured, "why not just create the whole thing as a top-level html element, and let the browser just take it away from there?" The basic strategy is this: create a <code>style</code> DOM Element dynamically, add text content to it representing the actual stylesheet, and then pop it into the HTML DOM. With a few caveats, it works like a charm. The browser parses the text as CSS, and links in into the live cascade.</p>

<p>I mentioned caveats.. well, of course there are the obligatory cross-browser compatibility issues to be aware of:</p>

<ul>
  <li>In Internet Explorer, you can't just append a Text Node to a Style element, you have to use some trickery to get it to work.</li>
  <li>KHTML &amp; Safari do not honor <code>style</code> elements that are not contained in the HEAD element of the document.</li>
  <li>While IE and Mozilla always create a HEAD element for you if one doesn't exist, Opera and KHTML do not.</li>
  <li>While Opera will honor a dynamically created HEAD element, KHTML will not. (That's a bug in KHTML as far as I'm concerned as it violates the DHTML principle that I've been talking about.)</li>
</ul>

<p>All in all, they're nothing to worry about and do not stand in the way of the fundamental technique. I've created a <a href="/bitbucket/live-stylesheet.html">demo page</a> showing this code in action. As a nice side effect, it works as quick way of playing around with CSS properties and how they effect the styling of elements.</p>

<p>Here is the source snippet implementing the technique I've described here:</p>
<code type="javascript">
   var style = document.createElement('style')
   style.setAttribute('type', 'text/css')

   var cssText = $('cssText').value
   if (style.styleSheet) { //IE only
      style.styleSheet.cssText = cssText
   } else {
      //for some reason this fails in IE.
      var text = document.createTextNode(cssText)
      style.appendChild(text)
   }
</code>
