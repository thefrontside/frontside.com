---
templateKey: blog-post
title: >-
  Backstage: Unblock Innersource Development of Backstage portals with Plugins and code owners.
date: 2023-10-24T05:00:00.000Z
author: Taras Mankovski
description: >-
  Navigating the challenges of inner-source Backstage portals? Discover how successful adopters harness code owners to streamline contributions and maintain code quality.
tags: ['backstage', 'dx', 'innersource']
img: /img/2023-10-24-innersource-codeowners-backstage.png
---

Backstage empowers platform and product teams within their organization to extend their internal developer portal in an [inner-source](https://en.wikipedia.org/wiki/Inner_source) manner. Keeping up with the growth of an inner-source Backstage portal brings its challenges. In this blog post, we’ll describe how successful Backstage adopters use plugins and the concept of code owners to unblock the development of their Backstage portal.

Most successful Backstage adopters have a single team responsible for the overall Backstage portal - we’ll call this team the Backstage team. The default project structure for a Backstage portal is a monorepo, meaning that a single repository contains multiple packages. The Backstage team is responsible for the Backstage repository. Developers from other teams make inner-source contributions to the Backstage repository by making pull or merge requests. The Backstage team is responsible for reviewing inner-source contributions to ensure they follow Backstage best practices.

As the project grows and the number of inner-source contributions increases, so does the number of code reviews that the Backstage team has to review. At some point in every Backstage project, the inner-source contributions exceed the bandwidth the Backstage team has to perform requested code reviews. This situation can be difficult for everyone involved. The Backstage team is responsible for the overall code health of the project - not reviewing code is a bad idea. On the other hand, teams making inner-source contributions have their commitments and timelines that they need to meet.

Most successful Backstage adopters resolve this conflict by giving inner-source contributors autonomy to review their code while requiring the Backstage team’s review of shared components. Enforcing these boundaries is done by defining areas of ownership within the Backstage repository using code owners. Code owners are configured via a file in a repository that contains a list of directories and teams responsible for the content of each directory. The team responsible for a directory must review a pull request that changes a file in their directory. [GitHub](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners), [GitLab](https://docs.gitlab.com/ee/user/project/codeowners/), and [BitBucket](https://confluence.atlassian.com/bitbucketserver/code-owners-1296171116.html) support code owners. Here is an example of [CODEOWNERS](https://github.com/backstage/backstage/blob/master/.github/CODEOWNERS) file of the Backstage project itself.

One of the challenges of adopting code owners is that not every Backstage portal is easy to describe in a CODEOWNERS file. This usually happens because the code in the repository is not organized into Backstage plugins. You can often tell if this is happening if your project’s _packages/app_ has lots of card components. Some of these card components should be in a directory of the plugin owned by the team that’s maintaining that plugin. For example, a team responsible for CI/CD may have a CI/CD card in the Backstage app instead of importing that component from their plugin in the repository. Refactoring the project to create clear boundaries between the Backstage team’s code and the inner-source contributor’s code is often the first step to introducing code owners to reduce the code review burden on the Backstage team.

In this blog post, we covered how to use code owners and Backstage plugins to streamline inner-source contribution by giving individual teams the autonomy to review their plugins without giving up the oversight necessary for the Backstage team to support the portal’s development. We hope this blog post is helpful to you on your organization’s journey to a successful Backstage adoption.

If you'd like to learn more about building Backstage plugins, check out our workshop on [Advanced Backstage Plugin Development](https://frontside.com/workshops/advanced-backstage-plugin-development). If you’d like Frontside developers to work alongside your team to make your Backstage portal successful, check out our [Backstage consulting](https://frontside.com/backstage) services.
