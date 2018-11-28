---
templateKey: blog-post
title: Accessing Javascript Objects from Ruby
date: 2010-10-25T12:00:00.000Z
author: Charles Lowell
tags: 
    - javascript
    - ruby
    - therubyracer
directory_index: false
---

Awhile back, I wrote a post on how to [access Ruby objects from inside your JavaScript enviroment](/2010/06/30/accessing-ruby-objects-from-V8/) when using [The Ruby Racer](http://github.com/cowboyd/therubyracer). It showed just some of the many ways that you can access Ruby state and call Ruby code from within JavaScript. However, the story doesn't end there. The Ruby Racer is, after all, a two way bridge, and I thought it would be useful to document some of the ways in which you can access your JavaScript environment from within Ruby.

Let's start with the `Context#eval` method, which is used to execute JavaScript code from Ruby. Its the most intuitive way,
and what gets used most often for examples.

Given a string, it compiles it as JavaScript source and then executes it inside the context. Nothing
crazy there:

    V8::Context.new do |cxt|
      cxt.eval('1 + 1') #=> 2
      cxt.eval('foo = {bar: "bar", baz: "baz"}')
      cxt.eval('foo.bar') #=> "bar"
      cxt.eval('foo.baz') #=> "baz"
      cxt.eval('new Object()') #=> [object Object]
    end

Among other things, the context captures what functions and objects are defined in the global scope
whenever anything gets `eval()`'d. So, for example, the `Object` constructor used in the last line is stored
in the context.

As a tool for embedding however, `eval()` is the most blunt and (often) inefficient method available.
For this reason [The Ruby Racer](http://github.com/cowboyd/therubyracer), sports an extensive Ruby API for
interacting with JavaScript objects which includes accessing properties, calling functions and methods, as well
as creating new instances. In fact, I rarely use `eval()` _at all_ to manipulate a JavaScript context
except for loading source files into the interpreter.

The Ruby API consists of `V8::Object` and all of its subclasses:

    V8::Context.new do |cxt|
      cxt.eval('new Object()').class #=> V8::Object
      cxt.eval('(function() {})').class #=> V8::Function
      cxt.eval('new Array()).class #=> V8::Array
    end

## Objects

The most fundamental operations in dealing with JavaScript objects are the getting and setting of values.
Coincidentally, this is also a fundamental concept in Ruby, so it comes as no great surprise that we can re-use
those constructs in Ruby that deal with property access to mirror those same operations on their JavaScript
counterparts: the `[]()`/`[]=()` and `foo()`/`foo=()` methods:

given the following context:

    cxt = V8::Context.new
    order = cxt.eval('order = {eggs: "over-easy"}')

we can read the `eggs` property of our order in several differnt ways.
Via hash access (note that both string and symbol are acceptable as key values):

    order['eggs'] #=> "over-easy"
    order[:eggs] #=> "over-easy"

Values can be set with the hash-style access as well, and changes made from Ruby
will be reflected accordingly on the JavaScript side

    order['eggs'] = "sunny side up"
    cxt.eval('order.eggs') #=> "sunny side up"

For property names that are also valid Ruby method names, you can access them just
like you would with Ruby properties declared with `attr_reader` or `attr_accessor`. Again,
changes made to the object in this way will be reflected in JavaScript:

      order.eggs #=> "sunny side up"
      order.eggs = "scrambled"
      cxt.eval('order.eggs') #=> "scrambled"
    end

In the cases where the property name is not a valid Ruby method name, hash-style access is mandatory:

    order['Extra $%#@! Mayonaise!'] = true

`V8::Object` also includes `Enumerable` and allows you to access all properties of a given object.

    order.each do |key, value|
      puts "#{key} -> #{value}"
    end

    #outputs:
    eggs -> scrambled
    Extra $%#@! Mayonaise! -> true

As a convenience, `V8::Context` delegates the hash access functions to the JavaScript object which serves
as its global scope.

    order == cxt['order'] #=> true
    order == cxt.scope['order'] #=> true

## Arrays

Not much to see here, but before you move along: A `V8::Array` is like every other `V8::Object` except it has a `length` property, and
it enumerates over the items stored at indices instead of the key, value pairs of its properties.

    array = cxt.eval('["green", "red", "golden"]')
    array.length #=> 3
    array.map {|color| "#{color} slumbers"} #=> ['green slumbers', 'red slumbers', 'golden slumbers']

<a name="functions">

</a>

## Functions

Consider the classic "Circle" example from every object oriented playbook you'll ever read. In JavaScript,
the way to implement the circle "class" is with a constructor function.

    circle = cxt.eval<<-JS
      function Circle(radius) {
        this.radius = radius
        this.area = function() {
          return this.radius * this.radius * Math.PI
        }
        this.circumference = function() {
          return 2 * Math.PI * this.radius
        }
      }
      new Circle(5)
    JS

Now that we have the `Circle` constructor defined, and we have a reference to an instance of it in Ruby,
we can call its methods just as though it were a normal Ruby object. Of course, only we know
that under the covers the implementation is actually in JavaScript:

    circle.class            #=> V8::Object
    circle.radius           #=> 5
    circle.area()           #=> 25Π
    circle.circumference()  #=> 10Π

In JavaScript, methods are just object properties that happen to be functions. Therefore, you can get
a reference to the actual function value just as you could from JavaScript simply by accessing the property
by name. The resulting value is an instance of `V8::Function`.

    area =                circle['area']
    circumference =       circle['circumference']
    area.class            #=> V8::Function
    circumference.class   #=> V8::Function

Once you have a reference to a `V8::Function`, there are two ways to call the underlying JavaScript code
(Actually there are three, but the third will be covered in the next section). These are the `call()` and
`methodcall()` methods. To understand the difference between these two methods, it helps to understand how
JavaScript functions themselves are invoked. In the event, there is the option to pass an object
which will serve as the implicit invocant or `this` value. If no `this` is provided, the function will
use the global scope in its place. Take for example the following JavaScript

    var circle = new Circle(5)
    var area = circle.area  //=> [object Function]
    //no invocant, corresponds to ruby call()
    area()  //=> NaN, there is no global 'radius'.
    //call with invocant, corresponds ruby methodcall()
    area.apply(circle)  //=> 25Π

The same code in Ruby:

    area = circle['area']
    area.class              #=> V8::Function
    area.call()             #=> NaN
    area.methodcall(circle) #=> 25Π

Because of this mechanism, JavaScript method invocation is much more flexible than Ruby in the sense that
virtually _any_ object can be used as the invocant of _any_ function provided it has the requisite properties
to satisfy the function's requirements:

    area.methodcall(:radius => 5) #=> 25Π
    other_circle = OpenStruct.new
    other_circle.radius = 10
    area.methodcall(other_circle) #=> 100Π

A very powerful construct indeed.

## Constructors

But wait, there's more! Any JavaScript function can be either invoked normally, or, combined with the `new` keyword,
as a _constructor_. It's what we used in the original eval() block to create the instance of `Circle` whose methods we were messing
about with.

That was not quite necessary since we can invoke functions as constructors from Ruby too. This is done with the `new`
method of `V8::Function`.

    Circle = cxt['Circle']
    circle2 = Circle.new(3)
    circle2.radius        #=> 3
    circle2.area          #=> 9Π
    circle2.circumference #=> 6Π

Interestingly, when used as a constructor, a JavaScript function is almost completely indistinguishable from a Ruby class.
This apparent duality between classes and functions is behind the decision to [represent Ruby classes reflected into JavaScript as functions](/2010/06/30/accessing-ruby-objects-from-V8#classes)

The driving goal in all of these cases is the ability to author intuitive, tightly bound JavaScript, which necessarily doesn't
involve evaluating strings to get what you want done. In closing, if there is something missing from this API you think would
be useful, I would love to [hear about it](http://github.com/cowboyd/therubyracer/issues)
