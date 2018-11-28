---
templateKey: blog-post
title: Please Stop Using Global Variables in Ruby
date: 2008-06-25
author: Charles Lowell
tags: ruby
directory_index: false
---

I couldn't sleep this morning. I woke up around 4:30 AM thinking about how code is organized in ruby. I'm sure I will look back on my life with disbelief and a touch of shame at such behavior, but that is (hopefully) decades away.

The problem turning around in my head which eventually caused me to wake was my own inability to come to terms with a prevalent pattern in the ruby community: the global variable. Swirling in my semi-conscious mind was a motley mixture of bewilderment, self-doubt, scorn and a touch of righteous indignation.

On the one hand, there must be something I'm missing. One of the reasons I love ruby-space is that it tends to be filled with talented programmers who work the language to produce code that is powerful while at the same time being easy to understand and use. Surely, their collective conscious is a better guide than my own experience and intuition. I worry that is primarily my own fuddy-duddity that prevents me from accepting global variables as good practice.

To clarify, when I speak about global variables, I'm talking primarily about using global class objects as the repositories for methods and state. There are plenty examples out there of this:

    # active record
    Post.find(:all)

    # amazon s3
    S3Object.store('me.jpg', open('headshot.jpg'), 'photos')

    # paypal-business gem
    Paypal.capture(params)

In each of the preceding examples, there is implicit state stored on the class object. In active record, the database connection information, in S3Object, the AWS access key id and secret key, and finally, in Paypal, the paypal server url and business account name. Because the class object is global, the state on it is effectively global. And <em>that</em> is what sets my spidey sense to tingling.

Not only is this style subject to the all the arguments for why <a href="http://c2.com/cgi/wiki?GlobalVariablesAreBad">global variables are bad</a>, but it just flat-out makes the API's themselves less useful. Here's an example from an actual project.

I had a system which needed to talk to two different SQS queues which were contained in two separate amazon web services accounts. Unfortunately, the standard SQS api uses class variables to store configuration information, and then a set of class methods to access the queue services, so I was forced to overwrite the global configuration parameters every time I wanted to access the queue. Luckily, the application was not multi threaded, or I would have been stuck rolling my own.

I don't see why:

    SQS.access_key_id = 'ACCESS_ID'
    SQS.secret_access_key = 'SECRET'
    q = SQS.get_queue 'MyQueue'


is any better than:

    @sqs = SQS.new :access_key_id => 'ACCESS_ID', :secret_access_key => 'SECRET'
    q = @sqs.get_queue 'MyQueue'

(IMHO it's uglier) and in the second, hypothetical API, you can painlessly, and in a thread-safe manner talk to multiple queues on multiple accounts.

    @one = SQS.new :access_key_id => 'AccountOne', :secret_access_key => "AccountOneSecret"
    @two = SQS.new :access_key_id => 'AccountTwo', :secret_access_key => "AccountTwoSecret"

But there's a deeper principle at stake here than allowing multiple instances. It's about giving <em>power to the programmer</em>, and letting them control the API, and not the other way around.

It seems to me that when you're designing an API, you want the programmer(to the greatest extent possible) be able to create their own little world over which they have complete control. The should be able to spin up as many instances of your code and use it in ways that perhaps you hadn't thought of without them having to worry that one world will interfere with another world they've created.

If you've absolutely got to go global, it's very little effort to wrap a static/global interface around a single default instance, but not the other way around. Given the similarity in effort, it seems like embedability is the way to go.

Global variables surely have their place in some applications, and I'm not opposed to them on purely ideological grounds, but ruby already has a construct for global variables... it's called the '$' sigil.

In your environment.rb, or wherever you can just put:

    #environment.rb
    $sqs = SQS.new :access_key_id => 'AccountOne', :secret_access_key => "AccountOneSecret"

    #somewhere else
    q = $sqs.get_queue "MyQueue"

My suspicion is that Ruby on Rails shares a large portion of the blame for the evolution of this style what with <code>ActiveRecord.establish_connection()</code> and friends. As the highest profile ruby project it's only natural that people will copy its conventions --for better or for worse. Still, I wish people in the future would break from this particular precedent and if they go global, to do it properly. Give the poor class objects a break!
