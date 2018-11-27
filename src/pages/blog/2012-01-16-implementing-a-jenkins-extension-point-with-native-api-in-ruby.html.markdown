---
title: Implementing a Jenkins Extension Point with the Native Java API inside a Ruby Plugin
date: 2012-01-16
author: Charles Lowell
tags: jenkins, ruby, java
image: "http://ftp-nyc.osuosl.org/pub/jenkins/art/jenkins-logo/1024x1024/headshot.png"
directory_index: false
---

> In which I elaborate why the idomatic Ruby API is sometimes not enough,
> and describe a method to harness the full power of the underlying
> Jenkins API while still happily coding your extension in Ruby

## The Ruby API

One of the primary goals of the [effort to bring Ruby to Jenkins][1]
is to enable developers to extend Jenkins in a way that looks and
feels like a normal Ruby environment. This means using rake, bundler
ERB, and plain old Ruby objects to roll your plugin.

For example, the [native BuildStep][2] class is made available through
the [Ruby BuildStep][3]. They are similar to be sure, but the Ruby
object is much less complicated, and actually bears no relation to its
Java equivalent inside the Java hiearchy of inheritance.

Exposing this simplicity is a worthy goal, but to do so requires
careful consideration of each Jenkins Java API and how to provide its
functionality in the Ruby way --no mean feat given the breadth of the
Jenkins.

Sadly, it means that these Ruby-friendly APIs must necessarily lag
behind their Java counterparts.

This can be a serious source of frustration for those looking to
dive into Jenkins Ruby development right now. Initial excitement is
quickly dulled when you find out that the extension point that you
wanted to implement is unavailable from Ruby land. You might get
discouraged and feel like you might as well be coding your plugin
with Java.

Well don't lose heart! I'd like to share with you a super easy way to
write your extension points in Ruby even when there isn't a friendly
wrapper. We'll actually implement a very handy extension point called
`RunListener` within a Ruby plugin even though it is not part of the
official Ruby API. We'll do it by scripting the Java class directly
with JRuby's Java integration feature, and then register it directly
with the plugin runtime.

## The Extension Point

We'll be working with the Jenkins [RunListener][4] interface. This is
a wonderful extension point that allows you to receive callbacks
at each point during the actual running of a build. There's currently
no nice ruby API for it, but we won't let that stop us.

First, let's create a new plugin called *my-listener*. We'll do this
with the `jpi new` command.

    legolas:Jenkins cowboyd$ jpi new my-listener
        create  my-listener/Gemfile
        create  my-listener/my-listener.pluginspec

> Fun fact: 'jpi' is an acronym for (J)enkins (P)lug-(I)n. You can
> install the tool with rubygems: `gem install jpi`

Next, we'll cd into our new plugin and create our listener class
inside the models/ directory. Jenkins will automatically evaluate
everything in this directory on plugin initialization.

    legolas:Jenkins cowboyd$ cd my-listener/
    legolas:my-listener cowboyd$ mkdir models
    legolas:my-listener cowboyd$ touch models/my_listener.rb

Our ultimate goal here is to implement a `RunListener`, so let's
go ahead and start our class definition inside that file.

    class MyListener < Java.hudson.model.listeners.RunListener
      def initialize()
        super(Java.hudson.model.Run.java_class)
      end
    end

There's a couple key takeaways here. First, notice that we use
JRuby integration to extend the class
`hudson.model.listeners.RunListener` directly. Second, and this is
a gotcha anytime you extend a Java class: you *must* invoke one of
the Java super constructors if it does not have a default
constructor. I can't tell you how many times I've been bitten by this.

In our case, the `RunListener` class filters which jobs
it will provide callbacks for by class. By providing a more specific
class to the constructor, you limit the scope of jobs you'll receive
to subclasses of that class. For our purposes, we cast a pretty wide
net by selecting all builds via the `AbstractBuild` Java class.

> Pro Tip: when you're implementing a native Java API, it really
> helps to have the javadoc open in one window so that you
> can view the documentation and crib from the source

Now that we've got our class defined, let's implement some methods!
We'll add callbacks for when a build is started and when it's
completed.

    class MyListener < Java.hudson.model.listeners.RunListener
      def initialize()
        super(Java.hudson.model.AbstractBuild.java_class)
      end
      def onStarted(run, listener)
        listener.getLogger().println("onStarted(#{run})")
      end
      def onCompleted(run, listener)
        listener.getLogger().println("onCompleted(#{run})")
      end
    end
    Jenkins.plugin.register_extension MyListener.new

And finally, on the last line, we actually inform Jenkins about the
existence of our new Listener with the call to
`Jenkins.plugin.register_extension`

And that's about it. We can start up our test server with our `jpi`
tool to see our listener in action.

    legolas:my-listener cowboyd$ jpi server
    Listening for transport dt_socket at address: 8000
    Running from: /Users/cowboyd/.rvm/gems/jruby-1.6.5/gems/jenkins-war-1.446/lib/jenkins/jenkins.war
    ...
    Jan 16, 2012 12:46:15 AM ruby.RubyRuntimePlugin start
    INFO: Injecting JRuby into XStream
    Loading /Users/cowboyd/Projects/Jenkins/my-listener/models/my_listener.rb
    INFO: Prepared all plugins
    ...
    INFO: Jenkins is fully up and running

To view the output, create a freestyle build called HelloWorld that
doesn't have any build steps at all, build it and view the console
output. You should see something like this:

    Started by user anonymous
    onStarted(#<Java::HudsonModel::FreeStyleBuild:0x2870068a>)
    onCompleted(#<Java::HudsonModel::FreeStyleBuild:0x2870068a>)
    Finished: SUCCESS

## The Sweet Reality

Even though we were dealing more directly with Java, we were
still able to use all of the simplicity that comes with developing
plugins in Ruby. Furthermore, even though our extension point was just
scripted Java, it doesn't mean that inside its methods it can't call
as much pure Ruby code as its heart desires.

I hope that if you're considering writing your next (or your first!)
Jenkins plugin in Ruby, you'll feel confident that you can always
fall back to the native APIs at any point.


[1]:http://blog.thefrontside.net/2011/05/12/what-it-take-to-bring-ruby-to-jenkins
[2]:https://github.com/jenkinsci/jenkins/blob/master/core/src/main/java/hudson/tasks/BuildStep.java
[3]:https://github.com/jenkinsci/jenkins-plugin-runtime.rb/blob/master/lib/jenkins/tasks/build_step.rb
[4]:https://github.com/jenkinsci/jenkins/blob/master/core/src/main/java/hudson/model/listeners/RunListener.java
