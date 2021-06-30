---
templateKey: blog-post
title: Wrapping each Hudson distribution in its own RubyGem
date: 2011-01-06T12:00:00.000Z
author: Charles Lowell
tags: 
    - ruby
    - hudson
    - java
    - jenkins
directory_index: false
---

> ___Update___: As of version `1.396`, this is applicable to the [Jenkins](http://jenkins-ci.org) project.
> `1.395` will be the last version of the hudson-war gem

As you may or may not know, we here at The FrontSide have been working since
late last year to create a proper ruby environment for extending hudson. This
is no mean feat because it implies not only the ability to use nothing but ruby
_code_ to implement hudson plugins, but just as importantly, the ability to use
nothing but ruby _tools_ to develop them. That means no javac, no
[jar files](http://en.wikipedia.org/wiki/Jar_file), no [war files](http://en.wikipedia.org/wiki/WAR_%28Sun_file_format%29), and for the love of all that is holy: [absolutely,
positively, no maven](http://kent.spillner.org/blog/work/2009/11/14/java-build-tools.html). In short, the only folks you'll need to know to get in
the door with Hudson are your pals Ruby, Rake and Bundler.

Of course, all those jars and wars and perhaps some class generation will be
there behind the scenes. After all, we'll still need to compile java stubs that
depend on core Hudson classes. We'll still need to package your plugin along
with its ruby code and dependencies in a jar file, and we'll still need to take
care of all the blah, blah, MANIFEST, blah, META-INF, WEB-INF, blah, blah, blah...

## The War

If we're going to do the compilation against Hudson core from within ruby and
Rake instead of maven, then we're going to need a reliable way to get at the
core hudson classes so that we can use them in our compilation classpath. Not
only that, but as part of the development process, you're going to want to test
your plugins against a fully functioning hudson server. Luckily, both of these
are contained in the full hudson distribution that you download as a single
war file. Wouldn't it be nice if you had a simple way to get at a specific
version of one of those wars and then get at all those java goodies contained
therein?

## The Gem

To my thinking, this sounds like a job for: RubyGems! That's why we're introducing
the new [hudson-war](https://rubygems.org/gems/hudson-war) gem, which does nothing except wrap a single hudson
distribution so that it can be managed coherently just like any other ruby
component. Want the latest warfile?

    gem install hudson-war

Or perhaps you need hudson 1.386? That's fine, hudson-war versions are the same
as the hudson distributions they wrap.

    gem install hudson-war --version 1.386

It's not just a war file either. In keeping with the best traditions of OOP
data comes bundled with behavior. The gem comes with a ruby API and a CLI baked
in to help us do all the nifty things we might want to do with a war file.
For starters, you might want to know where it is.

    legolas:~ cowboyd$ hudson.war location
    /Users/cowboyd/.rvm/gems/ruby-1.8.7-p174/gems/hudson-war-1.386/lib/hudson/hudson.war

If you want to unpack it to a particular location then

    legolas:~ cowboyd$ hudson.war unpack tmp
    jar xvf /Users/cowboyd/.rvm/gems/ruby-1.8.7-p174/gems/hudson-war-1.386/lib/hudson/hudson.war -C tmp/

You can run a test server with it

    legolas:~ cowboyd$ hudson.war server --daemon
    Forking into background to run as a daemon.
    Use --logfile to redirect output to a file
    legolas:~ cowboyd$ hudson.war server --kill

Beyond the basics, let's say you want to do something interesting like compile
some java code against the hudson core. You're gonna need a classpath, and you
can get it with:

    legolas:~ cowboyd$ hudson.war classpath
    /Users/cowboyd/.hudson/wars/1.386/WEB-INF/lib/hudson-core-1.386.jar

You can even compile java code with it directly. Here we compile a trivial
class that has a dependency on hudson.

    legolas:~ cowboyd$ cat > ImportsHudson.java
    import hudson.model.Hudson;
    public class ImportsHudson {
      public static void main(String args[]) {
        System.out.printf("The Hudson Model object's class is %s\n", Hudson.class.getName());
      }
    }
    legolas:~ cowboyd$ hudson.war javac ImportsHudson.java
    legolas:~ cowboyd$ java -cp .:`hudson.war classpath` ImportsHudson
    The Hudson Model object's class is hudson.model.Hudson

It's like RVM for hudson. Wrangling java has never been so fun!

## The War Gemmer

Befitting a continuous integration project, the Hudson team releases a new
version at least every two weeks, and sometimes even sooner. It can be a bitch
to keep up with, so I've set up a
[wargemmer hudson](http://github.com/cowboyd/hudson-wargemmer) task to
periodically poll the update center to see if there is a new release. If there
is, it'll gem it right up and push it to rubygems. No fuss no muss.

Let the war begin!
