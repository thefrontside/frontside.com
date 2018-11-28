---
templateKey: blog-post
title: "Functional Templating in Ember"
description: "See how easy it is to build a fully formed image upload widget complete with preview and progress bars when you apply functional programming techniques to your handlebars templates"
author: Charles Lowell
date: 2016-01-22 04:11 UTC
tags: 
  - ember
  - javascript
image: /blog/2016/01/22/functional-templating-in-ember/lisp-all.png
published: true
directory_index: false
---
<!-- <% content_for :head do  %>
  <%= ember_stylesheet_link_tags "2016-01-22-functional-templating-in-ember" %>
<% end %>
<% content_for :foot do  %>
  <%= ember_javascript_tags "2016-01-22-functional-templating-in-ember" %>
<% end %> -->

> TL;DR --  Avoid using "magically bound" internal component properties in your templates at all costs. Instead be explicit about only passing values around through actions and block params. This will engender a new level of breeziness to your UI.

Implementing a file upload in your web application is just the worst, am I right?

I mean, once you get your server set up, it’s on to choosing which
off-the-shelf JavaScript Hairball ™ widget you’re going to use to
actually walk the user through the upload process. And no matter which
one you choose it never seems to fit quite right over the long-term
does it? Let’s forget for a moment that they usually come with their
own markup and style which is either difficult or impossible to
replace with your own. As irritating as that is though, it’s something
that we can perhaps live with, or at least wrestle into a submission
hold. But where one-size-fits-all solutions really start to fall down
is when you want to customize the actual file upload workflow. And
even the simplest file upload workflows are involved aren’t they?

There’s not just the transfer of the bytes. First, there is the file selection process. If the file is an image, at the very least, you may want to show users a preview of that image. In some cases, you want to initiate the file upload immediately and without further action on the part of the user, but then again in others, you may need to stop and perform some intermediate work such as image resizing and cropping, and only then begin the transfer of the file to the server. If you’re uploading other MIME types like spreadsheets, there might be other intermediate preview-modify-and-confirm workflows altogether.

And so if you’re like me up until about a year ago, your experience with it was a constant and simmering frustration of whacking the square peg of an upload widget into the round hole of your application’s unique workflow, and caulking around the inevitable gouges and gaps with healthy dollops of JavaScript. In a word: Exhausting. Exhausting to stand up in the first place, and exhausting to maintain over the long haul.

So what would you say if I told you that with Ember components that are available on NPM right now you could build your own image upload widget, complete with preview and progress bars using nothing but about fifteen lines of Handlebars? Furthermore, what if I told you that you had complete freedom to use whatever markup and styling you saw fit, and beyond that, you could do it without a single line of JavaScript?

With the technique I’m going to outline, you’ll see that these are not outlandish claims, but rather the happy, daily reality of working with what I like to call _functional templating_. What makes a template functional? It's simple really. All it means is that the only way a name becomes bound to a value is via function application. That is to say, as a block parameter, or via a `mut` action.

A key construct underlying functional templating is the component that has little or no visual presence in terms of markup, but whose sole purpose is to manage a single piece of state and present it to a template.

I'm going to be using three functional components today to build our file uploader, the first of which is the _file chooser_. The file chooser is a component whose sole responsibility is to capture a [FileList][1] object and present it to the templating context. What happens to the files is not the concern of the file chooser however. That can be left up to other components later on down the road.

Let's see it in action! Click the "choose files" button below to select any number of files and have their metadata displayed in the area below the button.


<div data-component="demo-pane" data-attrs='{"name": "file-chooser-only", "title": "Selecting Files"}'></div>

In this example, the `x-file-input`'s action emits a `FileList` object every time that the user selects a group of files. By binding `(action (mut files))` to that action, we can inject that `FileList` into the handlebars scope, so that now it's available as a templating variable just the same as any other. Once it's in scope, the `{{each}}` iterates over the files and lists its metadata.

Notice how the `x-file-input` component in our chooser places very little restriction on the markup that activates the dialog. In this case we chose a button, but we could have made it a link, or a label, or picture of a cat.

<style type="text/css">

 .demo-pane {
   margin-bottom: 2em;
 }

 figure {
   display: inline-block;
   margin-bottom: 1em;
 }

 figure img {
   border: 1px solid #ddd;
   border-radius: 3px;
   background-color: rgb(248,248,248);
   padding: 15px;
   margin: 0 !important;
   border: 1px solid rgb(249,249,249);
   box-shadow: #ccc 1px 1px 10px;
 }
 figcaption {
   padding: 10px 10px 10px 0;
   font-size: 90%;
   font-style: italic;
   border-bottom-left-radius: 2px;
   border-bottom-right-radius: 2px;
 }
</style>

<figure alt="picture of data flow from file input to template scope">
  <img style="background-color: rgb(248,248,248); padding 15px; border 1px solid #ddd;" src="/blog/2016/01/22/functional-templating-in-ember/file-chooser-only.svg">
  <figcaption>Fig 1: Data flows from file input into template scope</figcaption>
</figure>

Selecting the files and viewing all the metadata about them is great, but in our case, where we're headed is a full featured file upload complete with preview. In order to get there, we'll use two more functional components.

### Preview All the Images

In order to preview our image, we'll need to display it in the browser. Luckily, the [File API][5] provides a [createObjectURL][6] method to help you do just that. Call it with a [Blob][3] object, and it hands you back a url that you can use for links, images, or any other place a url might be prone to go. When you're done with it, you call [revokeObjectURL][7] so that the browser knows it doesn't need to hang onto that Blob anymore.

And in order to present this url to our templating context? Yep, you guessed it. We'll use a functional component. We've written an `object-url` component which is responsible for managing an object url. It creates the url out of its `blob` attribute, and then revokes that url when either it receives a new `blob` attribute, or the component itself passes out of scope. Let's see it in action.

> Note: In this example, the file input has been restricted to only image mime types by setting the `accept` attribute.

<div data-component="demo-pane" data-attrs='{"name": "choose-files-with-preview", "title": "Choose Images With Preview"}'></div>

All we do is allow the `file` attribute to flow right into the `object-url` component which yields the url we need into the template to make the image preview.

Again, `object-url` has no markup of its own. Instead, its only job is to yield the model that makes the file preview markup possible. In this case, we bind the `url` value yielded by the `x-object-url` to the `background-image` property of a div and we're done.

<figure alt="file value is converted into a url">
  <img src="/blog/2016/01/22/functional-templating-in-ember/choose-files-with-preview.svg">
  <figcaption>Fig 2: object-url :: Blob -> String</figcaption>
</figure>

Finally, we arrive at our destination: the actual upload. To do this, we use a functional component that executes a real life [XMLHttpRequest][4]!

This might seem totally nuts at first, but mostly because we’ve been trained over the years to think that a custom ajax request has  always got to feel “heavy”. It turns out though that your plain vanilla, garden variety XHR is actually a well defined state machine, and as such, it maps pretty neatly onto a functional component.

We'll just let the file object flow into an `x-xml-http-request` component just like it did the `x-object-url`

<figure alt="file object flows into x-xml-http-request">
  <img src="/blog/2016/01/22/functional-templating-in-ember/full-demo.svg">
  <figcaption>Fig 3: x-xml-http-request :: File -> XHR </figcaption>
</figure>

Again, the `x-xml-http-request` has absolutely no markup. Its only job is to continually yield a value into the template that represents the most up-to-date status of the request as it runs. Because of this, we can use it to very quickly model a progress bar! The only thing we need to do is leverage the `xhr.upload.percentage` property within the colorstops of a `linear-gradient`.

> *Heads Up!* The following demo will actually upload images to [posttestserver.com][8] which is a _real_ server on the _real_ internet.  Even though it’s  just a bit bucket that periodically wipes all of its contents, you should still *never* upload anything sensitive to it.

<div data-component="demo-pane" data-attrs='{"name": "full-demo", "title": "Image Upload With Preview"}'></div>

And there you have it. A fairly decent file upload widget in about 15 lines of handlebars. It's worth noting though, that if you don't like the way I've done it here, you have a free hand to change the markup and workflow to suit your liking since the components I used don't prescribe any of it.

### Dropping the F-Bomb

These demos were nearly trivial to put together because of the composability afforded by shifting to a more functional style. Values never just magically appear from some unknown location that could be inside your controller or your component. Instead, as in a functional language, variable names like `xhr` and `url` are only ever introduced as the formal parameters of a function. Because each component only interacts with its environment via its inputs and its outputs, it means that they can freely click together output-to-input; in as many ways as you can think of.

The first time this technique really came together for me it felt impossibly light-weight. It felt like I must be missing something. Could it really be that easy to upload a file? Could I really style it any way that I wanted? Did I really have control over every aspect of the entire workflow from start to finish? And could I really do all of that while providing little or no custom JavaScript? The answer to all those questions turned out to be yes, and the resulting feeling was spectacular.

<hr/>

I’m Charles Lowell ([@cowboyd][9] on twitter), and I build UI for a living at [The Frontside][10]. If you enjoyed this, I’d love to hear from you.

Also, If you'd like to work with our team doing stuff like this, then please [get in touch](mailto:cowboyd@frontside.io). We're hiring.



[1]: https://developer.mozilla.org/en-US/docs/Web/API/FileList
[2]: https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
[3]: https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob
[4]: https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest
[5]: https://w3c.github.io/FileAPI/
[6]: https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
[7]: https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
[8]: http://posttestserver.com/
[9]: https://twitter.com/cowboyd
[10]: https://frontside.io
