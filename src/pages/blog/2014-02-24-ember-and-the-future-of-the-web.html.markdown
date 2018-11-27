---
title: Ember and the future of the web
date: 2014-02-24
author: Brandon Hays
image: "http://cl.ly/image/0s1M3r1p1Q1P/peabody.jpg"
tags: ember, platforms, prognostication
published: true
directory_index: false
---

If you know me, you know it's easy to get me talking about [Ember.js](http://emberjs.com). A year ago, I was deeply skeptical of developing client-side applications. Now, after spending a year shipping production applications in Ember, I believe that client-side apps represent the same generational leap that database-backed apps with Rails offered circa 2006.

Despite the title of this article, I can't actually predict the future, but I can bet on it. And Charles and I are betting The Frontside's future on the fact that Ember provides a foundation for creating amazing, next-generation user experiences for the web.

## What server-side MVC does well (and doesn't)

Server-side MVC frameworks rely on the classic Apple philosophy of optimizing for the 80% use case. These frameworks excel at taking a database, exposing CRUD (Create, Read, Update, Destroy) actions via HTTP, and building form-based UIs to work with these records. CRUD-oriented frameworks make it easy to build applications like blogs and contact management software.

What server-side MVC frameworks are not particularly well-suited to are user-driven, stateful UIs like you'd see in desktop apps like Word, Excel, or iTunes.

Rails, as a mature framework, has evolved a set of standard solutions to these types of problems. Generally, they involve minimizing the amount of JavaScript needed and placing as much of the burden on the server as possible.

## Server-side workarounds

I've built these many times "the Rails way", and I can viscerally feel myself cross the boundaries of the things Rails does well. I might start by creating a template called `create.js.erb` to be triggered from `new.html.erb`.

```javascript
$('#tag_form').html('<%=j render("form") %>');
$('#tags').html('<%=j render(@el.all_tags) %>');
initSelect2($("#tags"));
```

But what's actually happening here is not simple (and has [security implications](http://homakov.blogspot.com/2013/05/do-not-use-rjs-like-techniques.html) that bear keeping in mind):

[![](http://brandonhays.com/Pics/rjs-flow.png)](http://homakov.blogspot.com/2013/05/do-not-use-rjs-like-techniques.html)
*(Credit: [Egor Homakov's blog](http://homakov.blogspot.com))*

And that's a greatly simplified example. The fact is that if you're building stateful client-side interactions, you're already managing a lot of JavaScript, but your code is probably scattered across jQuery plugins, server-side rendered JavaScript, and custom JS in your assets.

These patterns quickly become difficult to maintain, and the pain encourages developers to steer clear of complex interactions and focus on the Rails happy path.

And this isn't necessarily a bad thing. We love Rails for making those tradeoffs on our behalf, so we can focus on the 80% case.

But I have two cautions about this kind of pragmatism:

1. Trying to stretch the 80% solution into the other 20% almost always results in pain.
2. Keep your eye on the 20%, because it may just be the next 80% use case.

## Two cases for using Ember

Ember, to me, indicates a seismic shift in the way web applications are created. And not because Ember itself is so great (although I do like it a lot).

**Rather, it's that Ember makes it *fun* to splash around in the other 20% and build next-generation applications.**

I'll make two cases for Ember and then explain how I see it as a representation of the web of the future.
### Case 1: MVC/MVC is a feature, not a bug

I'm a classic pragmatist. I like to learn things with an eye toward solving problems. So the concept of an MVC framework on top of an MVC framework struck me as odious. But since then, I've come to see it as incredibly freeing.

I never realized how much of my thinking was shaped by the limitations of the tools I used until exploring something with a totally different set of capabilities and constraints.

Let's look at the original Rails app, Basecamp:

![Basecamp](http://brandonhays.com/Pics/basecamp-marked-up.png)

Yes, the screenshot is outdated. This is not meant as a knock against Basecamp, which has been since rewritten, but rather an example of how most of us write our Rails apps. **Server-side MVC frameworks lay a yellow brick road right to that interface.** It's certainly representative of the majority of *my* vanilla Rails applications.

A few months ago, we started using the chat service Slack. I feel comfortable saying that it is a good example of web applications in 2014: it is so deeply interactive and so native-feeling that it nearly made me choke on my Cheerios.

See if you can spot a direct mapping to database rows in Slack:

![Slack](http://brandonhays.com/Pics/slack-marked-up.png)

I sure couldn't pin it down. In fact, after downloading the standalone Slack app for OS X, I was sure that it was a native app until I right-clicked and saw "inspect element" in the menu. It's not an Ember app, but I can easily see how it would be done.

**Client-side applications basically require you to saw your applications in half.** Handle your persistence layer however you want, just expose APIs to create, update, fetch, or delete records (a task to which Rails is particularly well-suited).

The other half of your application is now 100% tailored to the user interface you want to build. You find yourself using the language and workflow of your users, rather than wiggling around within the constraints of your database tables and columns.

All of this is wonderful, but represents any client-side MVC, rather than being unique to Ember.

### Case 2: You Need Models, You Just Might Not Know it Yet

Ember has a lot of strong suits, but one of the strongest is its rock-solid model layer. There aren't many hard UI problems that can't be made much simpler by using models to back your interactions.

Back to my personal journey: After a while, I abandoned RJS and started using plain JavaScript and jQuery to manage complex interactions.

My new AJAX-y workflow went like this:

  1. Let the server render stuff to the page
  2. Set up a controller to handle AJAX requests from the UI
  3. Manipulate the DOM using a jQuery plugin
  4. Traverse the DOM again to see what changed
  5. Serialize changes from the DOM and send via AJAX
  6. The server returns an HTML string that is stuffed back into the DOM
  7. Repeat steps 3-6
  8. Spend days troubleshooting inconsistent UI results

I'll spare you the gory details, but I've written a ton of code that looks like this:

```javascript
// ZOMG remember to clean up row position or everything breaks
var renumberRows = function(){
  $("#sortable .content_item:visible").each(function(index){
    $(this).find(".row_num").html(index + 1);
  });
};
```

Not only is this style not simple, it's quite difficult to test. My application is flying blind on steps 3-5, which, as it turns out, is the absolute core of the user experience.

With Ember, these DOM manipulations are *side effects* of working with models. A user doesn't know it, but they're pushing actual data around, toggling boolean attributes, and moving full-blown objects between lists.

Here's an Ember computed property to illustrate:

```javascript
// Model, you worry about position and I'll go get a soda
sortedRows: function() {
  this.get("rows").sortBy("position");
}.property("rows")
```

I can't show actual comparison code to the `renumberRows()` function because in Ember, *there is none*. Any changes rendered on the screen are the automatic result of changes to model data. With Ember's router, even your URL is rooted in this model data.

Think about that for a second. Imagine never writing another line of jQuery code that second-guesses or cleans up inconsistencies from your DOM.

Ember's object model, its system of observers and computed properties, and the way these are bound to the DOM are second to none. Its model layer isn't bolted on or mixed in, it's the foundation of the framework itself, and is absolutely rock solid.

## Looking out for the next 80%

The book [The Innovator's Dilemma](http://www.amazon.com/Innovators-Dilemma-Technologies-Management-Innovation-ebook/dp/B00E257S86/) is a fantastic read, and, I believe, applicable to the state of MVC frameworks.

The same pragmatism that allows us to get things done can actually become toxic after a significant degree of success. Almost by default, people tend to try and extract the maximum value out of existing solutions. They don't notice as the ground shifts beneath them, and are often surprised to find that their old, reliable solution has been disrupted.

By nearly all accounts, when Rails entered the scene it acted as this disruptive force. As anyone trying to bring Rails to work projects before 2010 will tell you, it was a tough sell, often being shouted down for not being "enterprise grade".

To me, the most powerful feature of Rails was that it took things that were excruciatingly painful to build and made them *fun*. It took user interactions that were previously reserved for large teams of experienced developers and put that power in the hands of small, nimble teams and newer developers.

Ten years after its inception, Rails now represents the 80% use case for web applications, with the 20% use case invovling highly interactive, app-like experiences.

## The new table stakes

A decade ago, my water delivery company could get away with a static site with their phone number on it if you wanted to sign up or schedule a delivery.

Now, I'd take my business elsewhere if I couldn't manage my delivery schedule online. The stakes simply went up. My expectations as a user went up.

I'll contend that we're on the cusp of a new "80% expectation": the majority of people using our software on the web are now becoming accustomed to richer, more app-like experiences. The stakes are being raised.


## Ember's bet on the future

Many of the benefits above are just about making it easier to do *the same things* we did before. But that's not Ember's bet. Ember's gamble is that when armed with this set of tools, you'll attempt increasingly ambitious projects.

#### Browser as an App Platform
I can't speak for the team that created Ember, but I can say from my vantage point that it looks like Ember is betting that the browser will act as an application runtime, not unlike the platforms for iOS or Android, and that the web is becoming the world's largest and most open app marketplace.

#### Interchangeable, Reusable Components

[Web Components](http://css-tricks.com/modular-future-web-components/) are an important upcoming change to the way web developers work, and Ember's take on them is impressive. When you start using Ember Components, it feels like the jQuery UI of the future: You get reusable drop-in functionality that's totally customizable, and backed by Ember's model system.

Ember Components are worth the price of admission alone, and we do drop them in as standalone pieces of interactivity into some of our server-side apps when it isn't feasible to create a full Ember application.

## Ember in the real world

Its rather audacious goals are why Ember is improving so quickly, and the things people are building with it are sometimes mind-boggling.

Here are just a few of the cool things I've seen come out of the Ember community lately:

 - [NBC News](http://nbcnews.com): NBC's new interface is more interactive exhibit than static news website
 - [Huboard](http://huboard.com): A lovely kanban board built on top of GitHub issues
 - [Discourse](http://discourse.org): No less audacious a goal than to replace every PHP forum on the internet
 - [Ember Beats](http://emberbeats.gavinjoyce.com/): Super fun drum machine webapp
 - [Bustle](http://bustle.com): A women-focused news and opinion site
 - [Vine](https://vine.co/feed): Twitter's 6-second video site

The limitations of the Web have historically been in its underlying technologies, but with advances like HTML5, CSS3, and tools like Ember, our biggest limitation on the web is quickly becoming our own imaginations.

## Challenges

#### Challenge 1: The learning curve
Learning Ember was a challenge for me. I started pretty early and the framework was famous at the time for frequent, major API changes and sparse documentation.

Those have both largely been addressed with [great documentation](http://emberjs.com/guides/) and things like [Code School](https://www.codeschool.com/courses/warming-up-with-emberjs), and I see newcomers picking things up about 5 times faster than I did. (Here's hoping that speaks more about the state of Ember than it does my learning abilities.)

That said, it is a big library and can still feel still quite challenging to learn, and may actually be *more* difficult for programmers who are skilled at server-side MVC and must "un-learn" the way their framework handled working with the front end.

But once you grasp a few core concepts, you'll start to "get" Ember, and we'll outline those in another post.

#### Challenge 2: JS solution fragmentation
Tools for languages like Ruby are now mature, stable platforms, while JavaScript, by comparison, can feel like the wild west.

If you want RSpec as your test framework in Rails, it's generally one or two lines of code to make the change. Choosing and setting up your test setup in JavaScript is still confusing and often fraught with issues.

The good news is that people are working to solve this problem as well. Ember App Kit is one of the most ambitious projects I've seen in this space. It's young but it seems to aim to make choosing and setting up all the ancillary stuff as simple as it is in server-side frameworks like Rails.

## So why Ember, specifically?

Ember, like any tool or framework, doesn't offer the perfect solution to every problem. But recently, whenever I've built an application without it, I've wished I had it to manage the complexity that lurks behind nearly every front-end feature request.

Between Ember's bulletproof object model and thoroughly-thought-out routing system, stuff that would have looked like a sheer cliff face before now looks like a playground to me.

It's the epitome of a disruptive technology: Ember allows me to do things that I wouldn't have even thought to attempt before, because the degree of difficulty was so high my brain just closed the door on the option. (Paul Graham calls this [schlep blindness](http://paulgraham.com/schlep.html).) It begs to be given a harder class of user experience problem, which is fun, rewarding, and in line with our purpose at The Frontside to push UX on the web forward.

Lastly, I tend to vote with community. I think Ruby and Rails has emerged as one of the best communities in any category, not just programming, and I feel similarly about the fast-growing, yet tight-knit Ember.js community.

## What if I'm wrong?

What if my crystal ball is broken, and users stay content with web applications as they are?

I can't deny that I really do believe we're looking at the future of web applications, but none of this future-talk matters too much. The simple point is this: **Ember makes it fun to build things that are awesome.**

And if you're going to do something, why not do something awesome?

Ember may not be for every problem or every developer, but if you'll give it a shot on your next project with high front-end ambitions, I promise you'll start feeling less intimidated and more like this:

![](http://cl.ly/image/0K3f1t3l1c14/challenge-accepted-l.png)
