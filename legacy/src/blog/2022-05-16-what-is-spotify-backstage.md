---
templateKey: blog-post
title: >-
  What Is Spotify Backstage: a developer portal overview
date: 2022-05-17T05:00:00.000Z
author: Javier Lainfiesta
description: >-
  What can Backstage do for your team? In this post, we are going to discuss how backstage can improve your organization.
tags:
  - backstage
img: /img/2022-What-Is-Spotify-Backstage.png
---

Backstage is a powerful open-source developer portal platform. What started as an internal tool for the Spotify developing team has become a versatile option for creating and managing developer portal ecosystems. Backstage stands out for its flexibility and high degree of customization. Below I want to share some features Backstage offers.

## What can Backstage do for you and your team?

Let's do a short exercise. Imagine you have several teams distributed around the world working on different aspects of an application. Some are working on the mobile app, others on a web app, and many people are working on microservices. They all overlap in one way or another. The web app might need a GraphQL API provided by another team. The GraphQL API team might need to consume microservices. Teams maintaining a microservice might need to access data. Each of these teams works autonomously but they rely on the software created by others in the organization.

The autonomy allows developers to move fast, but it also brings unexpected problems. Over time individual services diverge and critical information gets lost. Developers wind up spending more time gathering information and finding resources than actually coding.

The team at Spotify calls this phenomenon the Speed Paradox. In simple terms, the faster you grow, the more fragmented your software ecosystem becomes. And that slows you down again.

That brings us to the main problem Backstage solves for many organizations: centralizing services and standardizing your tooling. It may sound counterintuitive, but uniformity breeds creativity. Having an integrated development environment from end to end gives your developers the freedom and resources they need to solve any complex problem fast.

Backstage helps teams by giving a uniform overview of all the services, libraries, websites, ML models, etcetera. This way, a team can manage all the software they own, including deployments, data pipelines, and libraries. The platform also makes it easier to locate info related to ownership and dependencies by other teams.

## Technical speaking, what can we find in Backstage?

By now, the skeptic in you might be thinking: “All of the above sounds great, but how exactly does Backstage accomplish all of that?”

Through Backstage’s frontend application, team members can find not only the information they’re looking for but discover unknown resources and scaffolding for new projects. The core Backstage features include Software Catalog, Software Templates, Search, TechDocs, and Plugins. In that sense, the most fundamental use case of Backstage is information retrieval and accessing resources like documentation, ownership information, and status of running services. Let’s take a brief look at each feature.

### Software Catalog

This feature helps your team find the metadata and ownership information of all the software they are working on. The catalog is based on metadata YAML files. It offers one place to view all the external tools to manage your code by tracking third-party software.

### Software Templates

This powerful tool lets your organization create projects from a predefined reference template with forms that the team can fill out. The templates help standardize your tooling when the team starts coding a new project. Developers can use it for onboarding guides and good practices, and organizations can push their templates to GitHub or GitLab.

### Search

The search bar in Backstage was designed to reduce the time teams spend looking for context and switching between sources of information. Backstage Search lets you customize the search tool for your specific needs with modular backend and frontend components. You can integrate your plugins, wiki, or even Stack Overflow, so all the results appear on the same screen.

### TechDocs

Creating technical documentation is easy with this Backstage feature. TechDocs allow collocating documentation with the project source code to make it convenient for both developers working on the project and consumers of the project. This feature significantly reduces the time looking for documentation so it can be used.

### Plugins

The best way to extend and extract all the value Backstage can offer your organization is with plugins. The community behind the Backstage open-source project is constantly working on plugins to benefit all the organizations that implement it. Plugins are React components and optional Node.js microservices that power these components. It’s also possible to build your own plugins.

## Unleash the power of Backstage

Although these features are part of Backstage’s core offerings, the real power of this platform is in how customizable it is. You can create tailor-made developer portals and introduce all kinds of specific functionalities like testing, data analysis, etc. What you see here is just the tip of the iceberg.

If you are interested in learning more, check out Frontside’s blog or consider subscribing to our newsletter. As proud members of the Backstage development community, we are constantly working to extend this platform's power.

***Want to learn more? We have a great community in [Discord](https://discord.gg/9xfdDYthpF); come and say hello! We like to help and discuss all kinds of tech and code topics.***