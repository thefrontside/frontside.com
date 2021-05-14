---
templateKey: blog-post
title: >-
  Relieve developers’ churn in your Cloud native strategy with Backstage
date: 2021-05-14T05:00:00.000Z
author: Taras Mankovski
description: >-
  Adopting Cloud native strategies has proven to improve organizations' delivery performance, but the complexity brought in with them is making life harder for developers. Using the example of a unified Secret manager, I present how Backstage can improve DX in the Cloud native world.
tags:
  - cloud-native
  - backstage
  - kubernetes
img: /img/2021-backstage-dx/avoid-developer-churn-with-backstage.jpg
---

When you start breaking your monolithic platform into microservices and deploying components independently, you can’t help but feel excited about adopting a Cloud native strategy. You see releases becoming more frequent and smooth and your teams feel more productive and motivated as they see their work rapidly move into production.

It’s all great – that is until you hit a critical fragmentation point. As you keep adding microservices to your Cloud native platform, it gets harder and harder to keep track of what’s going on. Who’s building this service and with which stack and patterns? Why do we have three authentication mechanisms? Where are all these Cloud provider bills coming from?

The landscape for your developers is not much better. They must launch into detective mode and trace APIs and codebases in order to figure out the services they need to build their features. Then they need to figure out how to deploy their own work, which usually turns into an epic quest against the Cloud monster.

The problems with Cloud native practices seem to proliferate with each passing day, yet companies keep pushing towards their adoption across their teams because of its proven track record of increasing software development velocity. What’s a developer to do?

Thankfully, soon everyone will have access to Backstage: an all-purpose platform to make the Cloud native experience better for everyone!

Backstage is an Open Source platform for creating Developer Portals. Currently a Cloud Native Computing Foundation sandbox project first developed by Spotify, Backstage is getting a lot of traction among organizations experiencing the problems of microservices at scale when combined with the challenge of supporting dozens of developers on their team.

In this article we’ll cover the challenges developers experience using Cloud native strategies and how Backstage alleviates them. We’ll use the example of a secrets manager to illustrate just how useful Backstage is. By the end of the article I guarantee you’ll want to slip Backstage too and see what’s got everyone excited! 

## Churn ‘n Burn

Organizations who adopt Cloud native strategies do so because they _need_ to in order to stay competitive. Users cannot bear the traditional cadence where a special commission would sit down for months to release one feature. Your customers expect you to deliver new features faster and improve the user experience all the time, and will switch to the competition in the blink of an eye if they’re not getting that from you. Having _no_ bugs is the baseline now, so whenever one sneaks into production you need to be able to roll back immediately. Kubernetes provides you with the automated technology to make all of this possible. But it's an open secret that Kubernetes is quite difficult to use, and that has a direct effect on how your teams operate. What’s gotten lost in the transition to developing Cloud native apps is an awareness of _your_ team’s experience and their comfort level with the tools they use.

Since the inception of Kubernetes in 2014 and throughout its evolution, a whole industry has spawned to help companies adopt it. And no wonder: Kubernetes is not an easy technology to learn and manage due to the enormous complexity that it’s designed to deal with. For that reason, most Cloud providers have created managed-Kubernetes platforms: Microsoft Azure AKS, Amazon EKS, Google GKE, and IBM CloudFundry are just a few of the most obvious examples. Each of them imagined a UI that would work nicely to manage Kubernetes, and countless other vendors offer tools to monitor and automate different aspects of Kubernetes, each with their own interfaces and abstractions as well. 

While the attempt to support the adoption of Cloud based practices is to be applauded, what’s emerged is a very complicated landscape for those people tasked with implementing Kubernetes. Not only must they master this intricate technology, but they must also be proficient at the diverging set of tools that serve it, which change and evolve as fast as Kubernetes itself. Oftentimes, engineers wind up having to manage two or three Cloud solutions providers at a time, forced to use Microsoft’s Azure because of a company-wide policy but also required to handle Amazon’s AWS to spin up macOS containers on demand.

Nor is it just your DevOps team who are experiencing the churn of Cloud native solutions. Developers are also taking the hit with today’s trend of self-service deployment setups. Developers are not only expected to write robust apps, understand the business, and coordinate with other teams – they’re asked to be Cloud native too, which implies getting to know an entirely new world of complexity that seemingly changes every six weeks. That much churn puts developers at risk of burnout.

## A one-stop tool shop

Backstage’s mission is to empower developers. Instead of creating yet another platform to manage the infrastructure that supports Cloud native solutions, Backstage’s innovation is to create a portal to manage the organization’s services. While the infrastructure is a critical piece of any service, Backstage sees it as a means to the real end: achieving business goals. 

Backstage brings together in one place the various aspects of each service: its codebase, documentation, environments, infrastructure, and of course the people who build them. The teams like Spotify who are adopting Backstage are learning that investing in their developers’ experience pays off. When working with Frontside’s enterprise clients, I see the true magic of Backstage is in how it provides developers real ownership of what they’re building. It’s truly giving them the keys to the castle.

Yet a funny thing happens when you give someone the freedom of ownership: it transforms into responsibility. When the people who design and develop your software have the freedom of ownership over their services or apps, their creativity and productivity goes through the roof. But with that freedom comes a genuine sense of responsibility to deliver best-in-class experiences. 

Prior to Backstage, teams would often be “ready to ship,” only to discover that being merely feature-complete isn’t enough – they still had an unknown path to go down before their work reached production stage. For a developer, having to set up a ‘war room’ to push the update or app through the development path is the equivalent of trying to get spaghetti to roll uphill – a frustrating and often fruitless experience.

But with Backstage the development experience is transformed. For example, by using Backstage Scaffolder, developers can easily set up work environments that resemble production more faithfully, resulting in less friction and fewer surprises along the development path. They can start developing apps that are compliance-ready and infosec-approved from the very beginning by pulling in pre-made solutions and proven architecture patterns that are shared in Scaffolder. 

Thanks to Backstage’s Service Catalog, teams can break through heaps of emails, meetings and bureaucracy by bringing together all the aspects of every service under a single portal. With a 360-degree view of the development process, your team will be able to discover new synergies, generating opportunities for joint efforts while avoiding duplicated solutions across the organization. Now that all your services are visible in a single portal, you can also find orphaned projects and take care of them.

## Don’t tell a soul: Secrets management

Every organization’s Cloud platform needs a way to manage secrets and apply them to containers. The easiest place to start is to use Kubernetes' built-in secrets management. This approach is easy to set up but difficult to manage and secure long term. A more permanent solution is to manage secrets via a Git repository with GitOps workflow or by using a secrets vault like Azure Key Vault or Hashicorp Vault. Some organizations adopt a more-the-merrier approach and use all three of these in sequence. The options that are available to your platform team might depend on procurement practices of your organization or its familiarity with these tools.

But when it comes to secret management, it’s not just the UI that changes across providers: each platform has their own idiosyncrasies. For example, the requirements in minimum length for secret values are different in Microsoft Azure and Hashicorp’s Vault. In short, there’s a lot of variables to keep track of. At least one thing is certain, however: expecting your developers to fluidly switch between three different ways of managing secrets will make them want to tear their hair out.

![Screenshots from different secret management UIs - they all look different, yet do the same thing!](/img/2021-backstage-dx/different-managers-ui.png)
_Screenshots from four secrets management UIs from different providers_

A better developer experience would provide your developers with a consistent and familiar interface for managing secrets no matter which Cloud providers come and go. That’s Backstage in a nutshell. 

Given that it already aggregates services and other assets, a natural place for such an interface to live is in Backstage. And the benefit of building it in Backstage is that instead of having your developers deal with specificities in a UI, you can abstract them away in a unified API for your aggregator microservice. Your secret manager UI in Backstage will reflect these unified rules, removing these complexities from your team.

![Screenshot of a possible secret manager implemented in Backstage](/img/2021-backstage-dx/backstage-plugin-prototype.png)
_A Prototype of a Secret Manager plugin build on Backstage_

And best of all, your team already knows how to build a Backstage plugin like this! Somebody familiar with React and the company’s microservices setup can take up the task and have it done in no time at all.

![Architecture diagram for the plugin. The secret manager plugin is inserted in Backstage's UI, which is all rendered in the user's browser. This UI communicates with an aggregating microservice, that contacts external Cloud providres](/img/2021-backstage-dx/plugin-architecture.png)
_Basic architecture diagram for the Secret Manager plugin_

In Backstage, plugins are React components that get added to each service’s page. Thus, the secret manager plugin will be a React component with a UI where your developers will create and edit secrets. This component will make HTTP requests to a microservice that will be responsible for retrieving and editing secrets in your current Cloud providers. Going forward, your team will only have to adjust the aggregating microservice whenever there is a change in Cloud providers.

## Conclusion

Backstage not only allows you to keep evolving your Cloud native strategy without compromising the productivity of your developers: it empowers them to take your organization to the next level by uncovering collaboration possibilities and promoting shared solutions on top of the Cloud. Secrets management is but one example! The possibilities are quite broad for expanding Backstage to fit in your needs, from Enterprise API integrations with tools like WSO2 or Mulesoft, to putting together infrastructure workflows for data processing.