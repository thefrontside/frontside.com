---
templateKey: blog-post
title: Kubernetes for the Kubernewbie - The Journey
author: Elrick Ryan
date: 2018-08-09 18:54 UTC
image: /blog/2018/08/09/kubernetes-for-the-kubernewbie/drone-container-shot.jpg
description: "Learning Kubernetes, especially with no background in Ops, is challenging but full of reward. This will take you along the journey of our k8s
enlightenment and deployment"
tags: kubernetes, devops, microservices
cta_text: "Building a microservice and an application that consumes that microservice. We can help."
cta_button: "Ok Scooty...containerize"
---

‘It’s not how you start it’s how you finish’, is a phrase you may hear a coach
utter to his team but it is surprisingly applicable in the Tech industry as
well. All of us were newbies at some point in time. We’ve all faced challenges
while trying to learn something new. However, reaching the end of the road to
proficiency requires you to push through those tough times and I am here to let
you know that it is possible even when entering Kubernetes (k8s) as a
Kubernewbie. My background prior this undertaking was Design and Development
(DevSigner), and not Ops. However, by the end of this journey I made the
transition and gained a new moniker, DevOpsSigner.

Initially, this blog post was going to serve as a comprehensive intro to
Kubernetes but, after some thought (and a few rewrites), I realized that this
would not be possible in a single post. It was better to approach this post from
the angle of what this is not meant to be. This post is not a comprehensive
introduction to Kubernetes, nor is it a tutorial or even a guide. It is more
akin to a testimonial, a recap of our experience coming into Kubernetes and how
we went from Kubernewbies to a fully deployed production application in a
Kubernetes cluster in a few weeks.

With no prior experience with Kubernetes or Devops it made the process of
learning and ramping up even more challenging. When entering a new domain, like
Devops, there is a load of domain specific knowledge (DSK) you do not possess
that others have acquired over time. That DSK is what you use to evaluate,
explore, build solutions and use technologies in that domain. Without it you
could go down a path of reinventing the wheel. Every domain has very complex
problems that people are trying to solve, have solved or are improving on.
Fortunately for us and you that solution maybe primed and applicable to the need
/ issue / requirement that you have. Kubernetes was that soltion for us.

Kubernetes is a solution to a complex problem in its domain and by using
Kubernetes you cut a chunk of complexity in this initial DSK acquisition and can
start your Kubernewbie and Devops journey, ‘standing on the shoulders of
giants’. Kubernetes gifts you a system with a set of primitives, an API, and a
set of hooks to build and focus on things unique to your needs. Joe Beda said it
best in that ‘Kubernetes gives you a Platform to make a Platform’. We will talk
about how we used this ‘Platform Builder’ (Kubernetes) if you will, later, but
first let us define what Kubernetes is in general.

## What is Kubernetes?

Kubernetes.io introduces Kubernetes as “an open-source system for automating
deployment, scaling, and management of containerized applications.” Kubernetes
builds upon 15 years of experience of running production workloads at Google
which was influenced by Google’s internal systems Borg & Omega. So what does
Google know about production workloads you ask? Well around 2015, Google was
spinning up approximately 2 billion containers per week. Yes, you read that
correctly, 2 billion per week. I don’t know about you, but I have not seen 2
billion of anything in even a year.

So, it is fair to say that Google has a tremendous amount of experience
utilizing containers in production. Fortunately, some brave souls started to
open-source that expertise. Harnessing that experience, then Google employees Joe
Beda, Brendan Burns andCraig McLuckie took on the challenge. Brendan Burns
started the initial prototypes which, combined with work from Joe Beda and Craig
McLuckie, resulted in the first commit to the Kubernetes repo in 2014.

Kubernetes was created to bring the idea of dynamic, container-centric, managed,
scheduled-cluster thinking outside of Google. With the exponential growth and
usage of containers globally, Kubernetes strives to give everyone a production
level solution fashioned from Google itself. There is no denying Google’s
experience with containers and containerized applications. But what is a
container and what does a containerized application mean in this context?

## What is a containerized application?

For now, let’s say that a containerized application is an application that is
within a container. A container, by definition from Webster’s Dictionary, is “an
object that can be used to hold or transport something.” In relation to
technology, that “something” is everything that a piece of software needs to run
in a particular environment, such as application code, utilities, configuration
and dependencies. So a proposed Tech definition is: a container is an
abstraction: an Operating-system-level-virtualization that allows you to run an
application and its dependencies in resource-isolated processes.

Diving even deeper into this tech definition, an Operating-system-level
virtualization, also known as containerization (containerized application),
refers to an operating system feature in which the kernel allows the existence
of multiple resource-isolated user-space instances. Those instances are the
containers that and share one Host Operating system across them. Since the
containers encapsulate everything an application needs to run this makes moving
and running the software in different environments possible. So with all these
definitions in hand, my final description of a container would be: a Container
is a isolated-resource that is used to transport everything an application needs
to run.

That was an intense explanation of what a container is, but container technology
is a fundamental technology and a catalyst for the building of Kubernetes.
Kelsey Hightower said, “People will soon learn that containers only solve the
software packaging and distribution problem. Containers don't manage anything;
they need to be managed”. Kubernetes presents a management solution for
containers. Lets now assume you have some containers built and ready for use,
you can have anywhere from one to one-thousand of them to deploy -- and you’ll
need a way to deploy, manage and even scale the system using these containers.

That was the position we found ourselves in with a new project that we were
hired to develop. We were hired to build a React application and a backend
application. The backend application was developed using Ruby, which would be a
Microservice / module living in an overall system of modules, powered by an
API-Gateway called Okapi. We needed our own production and sandbox environments
that were fully functional versions of the overall Microservice Architecture.
Having this would allow us rapid development and iteration on our module, a
place to demo all the new features we would be implementing, and a sandbox
location for experimentation. Since our module was going to be part of a larger
system made up of multiple modules/containers we needed a deployment and
management solution. Enter Kubernetes.

## Why did we need and settle on Kubernetes?

We researched a few options for a container management solution prior to
settling on Kubernetes. Many of which are capable of being a solution to
container management but ultimately we went with Kubernetes because of a few
things:

+ Documentation. The Kubernetes documentation is extensive.
+ Self Healing. An essential feature of Kubernetes is ‘self-healing’, the system
  will always try to keep your cluster of deployed pods ( which hold containers)
  running at the desired scale you define. Yes, you can ‘set it and forget it’
  in Tech.
+ Declarative. Kubernetes is a declarative system and uses files written in YAML
  or JSON to define how you want the various parts of the system to look. There
  are more advanced solutions, rather than hand rolling and editing multiple
  YAML files, but these are used at the basic level.
+ Community. There were several members from the Kubernetes community who were
  extremely helpful and receptive to answering questions as we ramped up our
  experience.

### Managed or unmanaged hosting?

Now that we’d settled on using Kubernetes, we needed to decide on where to host
our Kubernetes clusters, and whether we wanted to go with a managed or unmanaged
Kubernetes hosting solution. A managed solution has Provisioning, Security, Load
Balancing, Upgrading, and Monitoring that is handled by them. An unmanaged
solution will require you to do more of the leg work to setup all the previously
mentioned points. However, not all managed Kubernetes hosting solutions are the
same, so we researched a few. One that was pretty awesome was Platform9, which
is a good turn key managed solution, but we ended up going with Google
Kubernetes Engine (previously Google Container Engine).

Google Kubernetes Engine (GKE) is a managed solution that abstracts away the
aforementioned Provisioning, Security, Load Balancing, Upgrading, and Monitoring
of running a Kubernetes cluster, but not so much that you cannot configure (and
even swap) an alternate technology for one of those parts. However, staying as
close as you can in the GKE system and using all the features within GKE will
make your life much easier. Now that we’ve decided on using Kubernetes for
orchestration, and GKE as the managed solution for hosting the cluster, let’s
Ship it. Well, not so fast.

## Tools within the Kubernetes ecosystem we use and building our platform.

Before we actually shipped to GKE, we flexed our Kubernetes muscles and
experimented with Kubernetes using Minikube. The Minikube readme says that,
> “Minikube is a tool that makes it easy to run Kubernetes locally. Minikube runs
a single-node Kubernetes cluster inside a VM on your laptop for users looking to
try out Kubernetes or develop with it day-to-day,”.

We used Minikube to initially test standing up and deploying all the modules.
Minikube allowed us to get familiar with certain parts of Kubernetes, known as
Resource Types such as Pods, Services, Replica Sets, Deployments, Config Maps
etc and go through some of the examples in the Kubernetes documentation and
around the web.

During this k8s exploration period using MiniKube we became very familiar with
using another tool called 'kubectl'. kubectl is a command-line interface (CLI)
for executing commands against a running Kubernetes cluster in this case the
running cluster was the single-node Minikube instance but could be any running
k8s cluster. kubectl has a laundry list of commands but our initial use was to
‘apply’ our YAML files and as time progress we started to use more of the
advanced commands of kubectl. One resource that I wish I had during this
exploration phase was a book called [‘Kubernetes Up and Running’](https://twitter.com/kelseyhightower/status/738795057801625601?lang=en) which I read
later but would suggest it to anyone that is new to k8s. Despite not having the
book at the time this step was crucial to gaining a basic understanding of
Kubernetes and standing up a cluster before shipping the full ancolata to GKE,
which we did soon thereafter.

We popped some champagne and celebrated the win of successfully standing up a
Kubernetes cluster with a fully functional API-Gateway and modules (including
our module). Our clusters were running great, but after a few weeks and having
to swap out and redeploy parts of it (and on occasion having to redeploy the
entire cluster), we needed to find a solution to automate the process of tearing
down and standing up our cluster. Again, we did some market research, but we
couldn’t find anything that would fit our needs at the time; so we ended up
building [Okubi](https://github.com/thefrontside/folio-deployment), as mentioned earlier using the ‘Platform to build a Platform’.
Okubi gives us a command line interface for tearing down and standing up our
cluster.

We use Okubi for things like:

 + Generating module YAML files from a template.

 + Changing configuration values foreach environment from a configuration file.

 + Setting priority level to modules.This will allow explicit ordering of when certain modules are deployed.

 + Order the deployment of the certain parts of the system to the cluster.

 + Run execution steps during the standup specific to this infrastructure.

Okubi is great, but it took hitting the pain points of doing all this manually
before we found a solution that worked for us and built an abstraction.
Definitely have to give a big shout out to [Joe
LaSala](https://twitter.com/salsanotsalsa) for all his hardwork in Okubi. We
have some enhancements that we will like to introduce within Okubi but currently
it is serving us well with cluster deployment. While having to redeploy modules
in the cluster or redeploy the cluster we often found ourselves debugging
containers.

### Debugging Containers

To debug containers one method that we use was to tail the logs of the
container. Which essentially watches the logs and prints them to the terminal.
Though you can run a command in kubectl to tail the log of a container. We
started to use [Stern](https://github.com/wercker/stern) because of some added features. Stern simply describes
itself as Multi pod container log tailing for Kubernetes. This was a feature
that we used  along with tailing multiple containers within a Kubernetes “Pod”.
It maybe possible to do the same with kubectl but do not quote me. However,
using Stern made this task fairly simple with easy to remember CLI commands.

Tailing logs is very useful but then we wondered if we could somehow interact
with the code while it was running in the cluster. Then we found [Telepresence](https://github.com/datawire/telepresence).
Telepresence is an open source tool that lets you run a single service locally,
while connecting that service to a remote Kubernetes cluster. So, by using
Telepresence we were able to change the reality in your running cluster and
tests code locally as though our local code was running in the cluster. In
addition, we were able to find usage for Telepresence during active feature
development. Yes, this all sounds quite magical and it did to me as first so let
me try to explain how we used it.

First, use case was when we saw some buggy behavior and wanted to debug that
code. We would then switch to our sandbox cluster context utilizing another tool
called Kubectx. Kubectx says it is a way to switch between clusters and
namespaces in kubectl and that is exactly right. Since our sandbox mirrors our
production cluster we would then Telepresence into the sandbox cluster and then
set debuggers within our local in order to step through the code during
execution. Once we found the offending code that was causing the bug we would
then create a PR with the fix.

Second use-case as I mentioned earlier was the usage of Telepresence during
active feature development. This is one usage that came in handy for me several
times. Let’s say I was task with developing a feature in the module. That new
feature would then be consumed by the React frontend that I aforementioned React
application that we had underdevelopment as well. Now, call me crazy but even
though I have all these awesome testing tools at my disposal and full test
coverage around my code because we do not ship code without tests. I still want
to test it live. Hooray for Telepresence.

I would follow the same steps of making sure I was in the correct sandbox
context and then Telepresence in that cluster. In addition, I would then spin up
the React application locally and make sure it was making it calls to the
sandbox URL. This would give me a live React, a Telepresenced Ruby Module and a
fully running Kubernetes cluster. I could manually test out what I was
developing and perform a full end to end test before I pushed to out a PR. I did
not use this all the time but on the occasions when I had to reach for this
technique it was worth its weight in Gold.

## In closing

Well, that is all that I have for this post. Honestly, I could keep writing but
this is supposed to be a blogPost and not a blogBook. So, I will keep the
additional topics for another blogPost. Overall, I would say that the journey
from a Kubernewbie was very challenging and extremely rewarding. You have to
push your limits and go into uncharted territory in order to grow. Have faith in
your abilities, ask questions and don’t get discouraged when you can’t figure
something out. There is still much to learn but that is nature of the Beast
which we call technology. If you have any question you can always hit me on
twitter at [@elrickvm](https://twitter.com/elrickvm) or [send an
email](https://frontside.io/contact). Be blessed and happy coding!

Photo by <a href="https://unsplash.com/photos/Q4bmoSPJM18">chuttersnap </a> on
Unsplash.

## Further reading

- [Birth of Kuberentes](https://kubernetes.io/blog/2018/06/06/4-years-of-k8s/)
- [Kubernetes documentation](https://kubernetes.io/)
- [Kubernetes for the Kubernewbie: Frontside -- Lunch &
  Learn](https://youtu.be/9aPtucV0Ke0)
- [Kubectl](https://kubernetes.io/docs/reference/kubectl/overview/)
- [Kubernetes up and running
  (Book)](https://twitter.com/kelseyhightower/status/738795057801625601?lang=en)
- [Stern](https://github.com/wercker/stern)
- [Telepresence](https://github.com/datawire/telepresence)

