---
title: Reactive Modeling with Ember
date: 2014-09-21 14:15 UTC
author: Charles Lowell
tags: frp, mvc, javascript, ember
image: /blog/2014/09/21/reactive-modeling-with-ember/newtons-cradle.jpg
published: true
directory_index: false
---


> Anyone can build great UI. There is no technology to master, only a
> way of thinking.
>
> -- Me in ancient Greece, presumably.

The best user interfaces are the ones that need no documentation. They
are intuitive, and by the very act of using them, they educate you
to as their purpose. They tell you about how to efficiently interact
with them to reap the most value. There are, of course, many concerns
that go into making such an interface, but foremost amongst the key
ingredients is _reactivity_. That is, the principle that any changes
to application state are reflected immediately to the user, visually
or otherwise.
<style type="text/css">
.color-swatch {
  display: inline-block;
  position: relative;
  height: 100px;
  width: 100px;
  border-radius: 10px;
  border: 1px solid black;
  text-align: center;
}
.color-swatch.undefined:before {
  position: absolute;
  top: 30%;
  left: 15%;
  content: "undef";
}
</style>

There are many [great][1] [examples][2] of reactive user interfaces
out there on the web, but perhaps **the most classic is one with which
you are already familiar: the mouse.** Think about how your mouse
works. As you physically manipulate your pointing device, the
on-screen position of the pointer glyph is updated in real time to
reflect input provided by your hand. When you move your hand the
tiniest bit to the left, so does the pointer. When you move to the
right again, the pointer moves in kind. The result is a tight feedback
loop between your hand and the application state in which a user can
directly perceive the precise cause-effect relationship of even
the smallest input.

### Why Reactive Modeling?

This principle of instant feedback is what makes reactive interfaces
like a mouse pointer so low friction because *the consequences of any
action are immediately understood.* This encourages the user to
experiment and probe the relationships between the data in your
application. They can "play" in order to verify or invalidate
hypotheses. What happens if I move person A from this column over into
another? What is the consequence of selecting the option provided by
this checkbox? All of these workflows are rendered more potent by
reactivity.

The great news is that building exciting and effective interfaces is
something anybody can do once they famliarize themselves with how to
think in terms of reactive UI. In this blog post , I'll demonstrate
some very simple, object-oriented techniques you can use to make your
application highly reactive. I call it *Reactive Modeling*.

The ideas behind reactive modeling are universal. After all, they
underpin the MVC pattern which is, at this point, [older than many Javsascript developers](http://c2.com/cgi/wiki?ModelViewControllerHistory). Reactive modeling can be
applied inside whatever runtime environment you happen to find
yourself. However, it is my experience that when working on the web,
the reactive primitives provided by [Ember.js][5] are the most
intuitive and expressive to be found in a mainstream framework, and so
all of the following examples are written with it.


### The Reactive Model

A reactive model is just an object whose properties form a cluster of
well-understood relationships, where those relationships are always
honored at any given point in time. For example, here's an object named
Charles. Charles is happy *if and only if* he's coding.

```javascript
var charles = Ember.Object.create({
  isCoding: false,
  isHappy: Ember.computed.alias 'isCoding'
})

charles.get('isHappy') //=> false

charles.set('isCoding', true)
charles.get('isHappy') //=> true

charles.set('isHappy', false)
charles.get('isCoding') //=> false
```

In this case, there's a relationship between his happiness and whether
or not he's coding. If the value of `isCoding` becomes `true`, then
the value of `isHappy` is immediately observed to be `true`. By the
same token, if the value of `isHappy` is set to `false`, then
`isCoding` is immediately observed to be `false`. Because of the
explicit relationship between coding and happiness, those properties
need to adjust their values so that the relationship stays true to its
definition.

And that's it. That's reactive modeling. **It's just an object which
always maintains the integrity of the relationships between its
properties.** It's such a simple idea, but one that yields enormous
dividends when building a user interface that provides instant
feedback about its current state.

### Relating multiple values

Relating boolean values to boolean values like I just did is a simple
thing, but in the real world we need to relate many disparate values,
all of which can have very different datatypes.

An example with which most of us are familiar is specifying color
values. Let's try to build an intuitive (read reactive) color
coordinate; one that let us explore the relationship between the
perceptual value of a color and its representation inside a computer's
memory.

Let's assume we have an immutable Color object that will serve
as our primitive value. I can construct this color using rgb
values.

```javascript
var red = Color.fromRGB(255,0,0) //=> #ff0000, very red
var red2 = Color.fromRGB(255,0,0) //=> #ff0000, also very red

red == red2 //=> true, same color, same object

red.r //=> 255
red.g //=> 0
red.b //=> 0
```

#### A note on modeling in software

It's important to note here that values of type `Color` in these examples
are perceptual only. Metaphysically speaking, they have nothing to do
with their rgb values. Instead, they correspond to values as perceived
by human beings. This can be a source of confusion because we have to
use rgb values to construct them. Sadly, this is unavoidable. Because our
program runs inside a computer and not a human brain, we are forced to
choose a representation that is accesible to a computer. Think of it like the word
`"friend"`. It is a very complex, very human subject, but the word
itself is represented on my laptop by the number
`110011011100101101001110010111011101100100`


In the case of color it helps me to think of the color values, once
they are constructed, as just one more primitive value: unique and
immutable.... like an integer!

Once we have this, we can make a reactive model relating the `r`, `g`, and
`b` integer values to a corresponding `Color` value. This model will
have four public properties: the `Color` instance itself, as well as
three integer coordinates for red, green and blue. Conceptually, it
looks like this.

<img src="/blog/2014/09/21/reactive-modeling-with-ember/rgb-color-public.svg"/>

Notice the 4 public, bindable properties? The expectation is that any
code can bind a value of type `Color` to the coordinate's `color`
property, and observe the consequences, and, by the same token, bind
any value of type `Integer` to the `r`,`g`, and `b` properties and
observe those consequences. Let's see this in action:

```
//the coordinate has an initial rgb value
var rgb = RGBColor.create({r: 255, g: 0, b:0})

//this implies a color value
rgb.get('color') // => red

// change the r, and the b
rgb.set('r', 0)
rgb.set('b', 255)

// the color changes
rgb.get('color') // => blue

//change the color
rgb.set('color', Color.GREEN)

//the rgb values change in relation
rgb.getProperties('r','g','b') //=> {r: 0, g: 255, b: 0}
```

You might be thinking at this point, why do we even need a separate
coordinate class at all? Don't we already have everything we need with
the `Color` constructor? Doesn't it already relate rgb integer values
to color values? The answer, of course, is reactivity. **Integers
and colors are immutable.** They are a still life; a single value
observed in a single moment. The reactive model on the other hand, has
inputs and outputs that are allowed to change over time and combine a
series of these still lifes into a moving picture.

A straightforward way to see this is in action is with a little
template that displays the color on screen along with its red value.

```hbs
<h3>{{color-swatch color=rgb.color}} r: {{rgb.r}}</h3>
```

We can set the `r` value repeatedly in an animation loop with the
following little snippet of code:

```js
requestAnimationFrame(function animateRValue(time) {
  rgb.set('r', Math.round((time / 20)  % 255));
  requestAnimationFrame(animateRValue);
})
```


This has the effect of gradually fading in the red color over several
seconds.

While this may seem obvious, it's still worth demonstrating that what
we see is nothing more than a sequence of discrete color values that
are reacting to a sequence of discrete `r` values.

<script type="text/x-handlebars" data-template-name="components/rgb-red-fade">
<h3>{{color-swatch color=rgb.color}} r: {{rgb.r}}</h3>
</script>

<script type="text/javascript">
function initializeRgbRedFade(component) {
  var rgb = component.get('rgb');
  requestAnimationFrame(function animateRgbValues(time) {
    rgb.set('r', Math.round((time / 20)  % 255));
    requestAnimationFrame(animateRgbValues);
  })
}
</script>

<p><div data-component="rgb-red-fade"></div></p>

Animation though, is just a special case of reactivity where one of
the values is related to time. What's more common in UI is to relate
application values to user input. So instead of relating the r value
to time, let's relate it to the user's mouse! We can do this by
binding it to the output of an html slider.

```hbs
{{color-swatch color=rgb.color}} {{x-slider min=0 max=255 value=rgb.r}}

```

The html slider value takes on an integer value between 0 and 255. As
this value changes, it changes the value of "rgb.r" to which it is
bound. As the value of "rgb.r" changes, we have already seen that the
value of "rgb.color" must change, which is then reflected in our
color-swatch. Which is all to say, that our color is now reacting to
the movement of our user's hand.


<script type="text/x-handlebars" data-template-name="components/rgb-color-single">
{{color-swatch color=rgb.color}} r: {{x-slider min=0 max=255 value=rgb.r}} {{rgb.r}}
</script>

<div data-component="rgb-color-single"></div>

Of course, we can do the same for the green and blue values just by
inserting more html sliders for the their values.

```hbs
{{color-swatch color=rgb.color}}
<div style="display: inline-block;">
r: {{x-slider min=0 max=255 value=rgb.r}} {{rgb.r}}<br/>
g: {{x-slider min=0 max=255 value=rgb.g}} {{rgb.g}}<br/>
b: {{x-slider min=0 max=255 value=rgb.b}} {{rgb.b}}<br/>
```

<script type="text/x-handlebars" data-template-name="components/rgb-color-multi">
{{color-swatch color=rgb.color}}
<div style="display: inline-block;">
r: {{x-slider min=0 max=255 value=rgb.r}} {{rgb.r}}<br/>
g: {{x-slider min=0 max=255 value=rgb.g}} {{rgb.g}}<br/>
b: {{x-slider min=0 max=255 value=rgb.b}} {{rgb.b}}<br/>
</div>
</script>

<div data-component="rgb-color-multi"></div>
<p/>

We can even attach multiple sliders to the same value, which is silly,
but does re-enforce the idea that it doesn't matter _where_ values
come from, the reactive model only defines relationships between them.

<script type="text/x-handlebars" data-template-name="components/rgb-color-multi-multi">
{{color-swatch color=rgb.color}}
<div style="display: inline-block;">
r: {{x-slider min=0 max=255 value=rgb.r}}<br/>
g: {{x-slider min=0 max=255 value=rgb.g}}<br/>
b: {{x-slider min=0 max=255 value=rgb.b}}<br/>
</div>
<div style="display: inline-block;">
r: {{x-slider min=0 max=255 value=rgb.r}} {{rgb.r}}<br/>
g: {{x-slider min=0 max=255 value=rgb.g}} {{rgb.g}}<br/>
b: {{x-slider min=0 max=255 value=rgb.b}} {{rgb.b}}<br/>
</div>
</script>
<script type="text/javascript">
function initializeRgbColorMultiMulti(component) {
  component.setProperties({'rgb.r': 32, 'rgb.g': 111, 'rgb.b': 0});
}
</script>

<div data-component="rgb-color-multi-multi"></div>

<p/>

The model is reactive, the feedback is instantaneous, the experience
is intuitive.

<h3> Great news everybody! It's easy. </h3>

The actual object that drives all these interactions is quite
simple:

```javascript
var RGBColor = Ember.Object.extend({
    colorValue: Ember.computed('r', 'g', 'b', function() {
      return Color.fromRGB(this.get('r'), this.get('g'), this.get('b'));
    }),
    colorBinding: Ember.Binding.oneWay('colorValue'),
    rBinding: Ember.Binding.oneWay('color.r'),
    gBinding: Ember.Binding.oneWay('color.g'),
    bBinding: Ember.Binding.oneWay('color.b')
  });
```

If you're not familiar with Ember conventions (or even if you are),
this may be appear dense at first, so let's unpack it a bit. Remember
the diagram of the `RGBColor` that had the four public properties
`color`, `r`, `g`, `b`? Well, here's the same diagram, except we'll
pull back the curtain so that you can see how it's wired up inside.

<img src="/blog/2014/09/21/reactive-modeling-with-ember/rgb-color-private.svg"/>

Our object definition for `RGBColor` just draws the same picture in
code. Let's parse it line-by-line.

```js
colorValue: Ember.computed('r', 'g', 'b', function() {
  return Color.fromRGB(this.get('r'), this.get('g'), this.get('b'));
}),
```

This declaration tells how to derive the `colorValue` property from
the individual rgb components.

Everything else is just specifying how data flows.

```js
colorBinding: Ember.Binding.oneWay('colorValue')
```

This binding causes data to flow from the `colorValue` property to the
`color` property. That is, the moment that a new color appears at
`colorValue`, it also appears at `color`. Because it is a one way
binding, the reverse is not true. A new Color can appear at `color`,
but the `colorValue` property will remain the same.

```js
rBinding: Ember.Binding.oneWay('color.r')
```

Going the other way, this declaration causes the `r` value of the color
to flow into the `r` property of the RGBColor object. Again, this is a
one way binding, so values will not flow the other way. In fact, they
couldn't flow the other way even if they wanted to because `color.r`
is immutable.

`gBinding` and `bBinding` act in a similar fashion to
`rBinding` on their respective properties

Does this seem all a bit meta-circular to you? It might, and if it
does, that's because it is.

What we've done here construct a bi-directional data flow by composing
uni-directional data flows, such that values can travel from one end
of the object to the other and back again. They can enter at any of
the public binding points, but once inside, they naturally diffuse
around the entire object.

<img src="/blog/2014/09/21/reactive-modeling-with-ember/rgb-color-private-labelled.svg"/>

It is from this cycle that "two-way" bindings are constructed. I
put "two-way" in scare quotes because if you decompose it, you find
that, like all two way bindings, it's just a set of one-way bindings
that form a feedback loop.

>This is an important point to grasp (and one that critics of two-way
>binding rarely address). While publicly a value may be bound two
>ways, it can proceed internally through an arbitrarily complex
>apparatus of splits, merges, and transformation on its journey from
>point A to B and back again. Mastering both legs of the trip is key
>to mastering the reactive model.

<h3>Why understanding this is crucial to UX</h3>

Your job is to create fluid, reactive experiences for your users so
that they can delight in both learning and using your systems. But
sometimes doing so can be very difficult. Have you ever tried to build
a date input that parses free-form text? Or how about a credit card
input that continually reformats and self-validates? Have you ever had
to manage by hand multiple lists derived from the same source list and
make sure they remain in sync?

Luckily, there are a lot of tools available today that, using the
techniques I've described, can transform tasks like these from annoying and
painful to fun and easy. They let you stop thinking about the
mechanics of how values propagate from one area of your application to
another and instead focus on the paths that they travel to get there.

If you work with a toolset that already supports these reactive
modelling primitives, then try to push the envelope of what you can
achieve simply by composing simple data flows. Otherwise, if you've
never created your own reactive models, what are you waiting for? give
it a try! Go [Download Ember][5] and play with computed properties and
two-way bindings. Not only will understanding them make you a better
developer with a bigger bag of tricks, but you'll build interfaces
that, like the mouse, give users a direct tactile connection with your
application.

[1]: http://www.mathsisfun.com/algebra/trig-interactive-unit-circle.html
[2]: https://kuler.adobe.com/create/color-wheel/
[5]: http://emberjs.com/

<!-- These links work in production, not locally -->
<script
  src="https://code.jquery.com/jquery-2.0.3.js"
  integrity="sha256-lCf+LfUffUxr81+W0ZFpcU0LQyuZ3Bj0F2DQNCxTgSI="
  crossorigin="anonymous"></script>
<script src="/blog/2014-09-21-reactive-modeling-with-ember/handlebars-v1.3.0.js"></script>
<script src="/blog/2014-09-21-reactive-modeling-with-ember/ember.js"></script>
<script src="/blog/2014-09-21-reactive-modeling-with-ember/color.js"></script>
<script src="/blog/2014-09-21-reactive-modeling-with-ember/main.js"></script>
