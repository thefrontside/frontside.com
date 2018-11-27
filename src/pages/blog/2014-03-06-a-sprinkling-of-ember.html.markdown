---
title: A Sprinkling of Ember
date: 2014-03-06
author: Jeffrey Biles
image: "http://cl.ly/image/3v2i0D2V2B2T/sprinkles.png"
published: true
tags: ember, component, awesome
directory_index: false
---

Ember isn't just for huge ambitious single-page web applications.  It's actually really easy to sprinkle over your static or server-side-rendered web page to add just a little bit of functionality.

You can even use it in a blog.  A blog like this one.

Here is a text box.  I want you to stick the url for your favorite gif in the text box (or click one of the items below).

<div class="component-placeholder">
  This will be replaced with the Ember component!
</div>

Notice how the GIF displays automatically when you input the url?  Notice how putting in a new GIF automatically adds it to the list?

That's Ember.  In a statically rendered blog (middleman-blog, for the curious).

The following steps are necessary for sprinkling in Ember:

1. Create a placeholder div for your component
2. Link to source files for Ember, Handlebars, jQuery
3. Create an Ember component
4. Make sure you specify the `layoutName` to match the `data-template-name` of your handlebars template
5. Use jQuery to replace your html div with your Ember component.

Here's the code for this component (but simplified, without code for the awesome list):

    //excuse the not-quite-correct comment structure, html comments didn't appear
    //1: create a placeholder div for your component
    <div class="component-placeholder">
      Your Ember Component will go here
    </div>

    //2: Link to source files
    <script type="text/javascript" src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
    <script type="text/javascript" src="http://builds.handlebarsjs.com.s3.amazonaws.com/handlebars-v1.1.2.js"></script>
    <script type="text/javascript" src="http://builds.emberjs.com/tags/v1.4.0/ember.min.js"></script>

    //3: Create an Ember Component
    <script type="text/x-handlebars" data-template-name="components/fs-gif-url-input">
      <div class="field">
        <label for="gif_link_url">Url</label><br>
        {{input value=gifUrl name="gif_link[url]"}}
      </div>

      <div class="image-preview">
        {{#if urlIsValid}}
          <img {{bind-attr src="gifUrl"}} height=500>
        {{else}}
          <h1>That URL is not valid!</h1>
        {{/if}}
      </div>
    </script>

    <script type="text/javascript">
      App = Ember.Application.create()
      App.FsGifUrlInputComponent = Ember.Component.extend({
        //4: matching layout name
        layoutName: "components/fs-gif-url-input",
        gifUrl: null,

        urlIsValid: function(){
          if(!!this.get("gifUrl")) {
            return this.get("gifUrl").match(/^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/);
          }
        }.property("gifUrl")
      });

      //5. Use jQuery to replace your html div with your Ember component.
      $(document).ready(function(){
        // Find the container div.
        $(".component-placeholder").each(function(){
          // Get the existing input value
          var value = $(this).find("input").val()
          // Build the component & stuff in any pre-existing value
          var component = App.FsGifUrlInputComponent.create({
            gifUrl: value
          });
          // Gut out the container div & replace with the component
          component.replaceIn(this);
        });
      });
    </script>

Voila!  EMBER MAGIC!!!

<script type="text/javascript" src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="http://builds.handlebarsjs.com.s3.amazonaws.com/handlebars-v1.1.2.js"></script>
<script type="text/javascript" src="http://builds.emberjs.com/tags/v1.4.0/ember.min.js"></script>

<script type="text/x-handlebars" data-template-name="components/fs-gif-url-input">
  <div class="field">
    <label for="gif_link_url">New GIF Url</label><br>
    {{input value=gifUrl name="gif_link[url]"}}
  </div>

  <ul>
    {{#each gif in gifs}}
      <li>
        <a href="#" {{action setGif gif}}>{{gif}}</a>
      </li>
    {{/each}}
  </ul>


  <div class="image-preview">
    {{#if urlIsValid}}
      <img {{bind-attr src="gifUrl"}} height=500>
    {{else}}
      {{#if gifUrl}}
        <h1>That URL is not valid!</h1>
      {{/if}}
    {{/if}}
  </div>

</script>

<script type="text/javascript">
App = Ember.Application.create()
App.FsGifUrlInputComponent = Ember.Component.extend({
  layoutName: "components/fs-gif-url-input",
  gifUrl: null,
  gifs: ['http://www.reactiongifs.com/r/swag.gif',
         'http://i.imgur.com/e16WWlK.gif',
         'http://i.imgur.com/YniEVEY.gif'],

  actions: {
    setGif: function(gif) {
      this.set('gifUrl', gif)
    }
  },

  addUrlIfNew: function(){
    if(this.get('urlIsValid') && this.get('gifs').indexOf(this.get('gifUrl')) == -1) {
      this.get('gifs').addObject(this.get('gifUrl'))
    }
  }.observes("gifUrl"),

  urlIsValid: function(){
    if(!!this.get("gifUrl")) {
      return this.get("gifUrl").match(/^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/);
    }
  }.property("gifUrl")
});

$(document).ready(function(){
  // Find the container div.
  $(".component-placeholder").each(function(){
    // Get the existing input value
    var value = $(this).find("input").val()
    // Build the component & stuff in any pre-existing value
    var component = App.FsGifUrlInputComponent.create({
      gifUrl: value
    });
    // Gut out the container div & replace with the component
    component.replaceIn(this);
  });
});
</script>
