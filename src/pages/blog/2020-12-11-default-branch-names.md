---
templateKey: blog-post
title: >-
  Renaming `main` with purpose 
date: 2020-12-11T05:00:00.000Z
author: Robbie Pitts
description: >-
  As generic default branch names like `master` for Git repos have gone out of fashion, possibilities emerge for more effective and informative naming conventions. Learn about the branch naming strategy Frontside uses for our Open Source libraries and how we name app project branches.
tags:
  - continuous-delivery
  - best-practices
img: /img/2020-12-11-default-branch-names.png
---

At Frontside `main` (or any similar name) has never seemed like a great branch name. Like many developers, we navigate through different kinds of repositories all the time, from user-facing apps to Open Source libraries. It can be difficult to keep track of how code flows from development to its final purpose when merging our work into a codebase, making naming branches not just a matter of efficiency but affecting the clarity of the code as well.

Every project has its own goal and process, which means that merging code into 'main' has different meanings. For instance, it's not the same to merge a PR into a Jamstack blog that will immediately publish the new content as it is to merge a PR into a finance app that has to go through manual QA before getting published. The same applies to library maintenance: sumbit a PR to a private library with few users is quite different than to submit it to a widely adopted Open Source library.

That's why we propose naming the default branch of each repository such that it reflects its purpose. For instance, in `effection`—a library we maintain—the default branch is `v0` because the code merged there is part of version zero, and we cut releases from it. Another example is our website: the default branch is called `production` because everything we merge into it is automatically published to production.

![Screenshot of PR getting merged to 'production'](/img/2020-12-11-default-branch-name--screenshot.png)

_The author and reviewers of a PR that will be merged into `production` are now conscious of the aims and purpose in the code in question._

In this article, we present Frontside’s naming strategy for semver libraries and the guiding principle we use for apps repositories. We also share our ideas about changing the name of the default branch of a repository in the form of a helpful FAQ.

## Semver libraries

We follow the popular [Semantic Versioning](https://semver.org/) (Semver) format to issue releases. Semver distinguishes three types of releases: `major`, `minor`, and `patch`. Although it provides a semantic framework for release names, Semver makes no comment on how each team goes about developing their libraries – there's still plenty of room to decide how you cut your releases. At Frontside, instead of curating each release manually, we tie major versions to branches so we can cut automated minor and patch releases, which ultimately leads to setting our default branch name to a major version branch instead of simply `main`.

Releases are often manually put together by the maintainers, who also judge the type of release they're issuing. That means that branches and releases are not coupled: their relationship is curated by the library maintainers on a case-by-case basis. This approach has proven itself effective for many projects, but is an added burden for the maintainers. It becomes especially problematic with monorepos, where several packages with codependencies have to be updated and released at once.

At Frontside, we instead tie branches to major releases: everything that is merged into a `v1` branch must be releasable in a `v1.x.x` version. That enables us to use [changesets](https://github.com/atlassian/changesets) to cut minor and patch releases with minimal effort – even within monorepos. 

With our approach having a `main` branch is just not helpful. And it's usually confusing in other approaches too: what can you expect to find in `main`? the latest released version? a future version? the most popular version? not a release candidate at all? It's impossible to tell by simply looking at the name, and a lot of (unnecessary) work to dive into the code to find out.

Instead of using `main` as a default branch, we set our default branch to be the latest major version branch that is currently under development. This means that the default branch will change over time, and that's a good thing, because the evolving name gives contributors clear directions when navigating the codebase.

## Apps

Unlike libraries, there's no widely popular way of structuring releases for apps. Apps are wildly different across teams and industries not only in how they look, but also in the way they're developed and deployed. Our advice is to think of the branch as a pneumatic tube that takes the code somewhere and to ask what is the name of that place? If putting code in that tube means that it will be shuttled to production, then naming the default branch "production" is a sensible idea because (like with our suggestions about libraries) the name offers a clear indication of the code’s purpose instead of requiring you to fish around to find out what the codebase is trying to accomplish.

## Repository Default Branches: a FAQ

### Why should I move away from `master`?

You'll soon become obsolete if you keep `master` as your default branch. The industry standard for default branches is `main`, so we advise you to at least move to that name if you haven't. But we think you’d be wise to shift away from generic names altogether and consider moving to purposeful branch naming.

### Won’t it be annoying to have different default branch names for my projects?

Perhaps at the beginning. But it's not common for developers to push to `main`: in fact it's generally discouraged. Interactions with the default branch are therefore limited: typically to just when cloning a repo, creating a PR, or syncing up with the latest developments.

### What’s the upside of using specifically named default branches?

Everybody working with your codebase will have a concrete understanding of the goal of the repository. From the very beginning when they clone your repo until when they create a PR, everyone clearly understands the purpose and goal of their work. 

### How do I change my default branch name?

Github is making it easier for you to change the default branch of your repository. Check out their recommendations for [renaming your default branch](https://github.com/github/renaming).

## Conclusion 

Naming is hard. It's been a challenge in computer science for decades. But what we call things conditions the way we think about them. At Frontside we think it’s time to move away from the “tried and true” generic names – especially when these naming conventions are actually causing inefficiencies and unnecessary work.

<aside class="posts-list-list">
  <h2>Related article:</h2>
  <div class="posts-list-entry">
    <h3 class="posts-list-title">
      <a href="/blog/2020-7-reasons-for-good-pull-request-descriptions/">
        7 reasons to write good Pull Request descriptions
      </a>
    </h3>
    <p>
      A good Pull Request description can lead to better reviews, improved solutions, better documentation, and more. In this article, Taras surveys seven big wins of PR descriptions.
    </p>
    <a href="/blog/2020-7-reasons-for-good-pull-request-descriptions/" class="post-link">
      Continue reading
      <span class="post-link--arrow">→</span>
    </a>
  </div>
</aside>
