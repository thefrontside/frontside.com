---
templateKey: blog-post
title: >-
  Github Actions: a deep dive into pull_request
date: 2020-05-26T05:00:00.000Z
author: Min Kim
description: >-
  We have put together specific behaviors and information that you’ll need to use pull_request as a trigger for your Github Actions workflow.
tags:
  - github-actions
  - continuous-delivery
img: /img/2020-05-26-github-actions-pull_request-social-media.png
---
![Gihub Actions: a deep dive into pull_request](/img/2020-05-26-github-actions-pull_request-intro.png)

Github Actions is an exciting feature that enables teams to construct workflows based on webhook events. It unlocks new possibilities for teams that neatly integrate it into their development flow.

For example, you can use Github Actions to automatically run tests, generate a preview app, and send a follow-up notification every time somebody opens a pull request. Presuming you're familiar with writing [Github Actions workflows](https://help.github.com/en/actions/configuring-and-managing-workflows), let’s take a closer look at some aspects of that process.

At Frontside we use Github Actions extensively to make the development process of our clients both simpler and more inclusive for non-technical stakeholders. This is possible because Github Actions offers a rich API that allows us to build flexible and highly-specific workflows.

In this article, we have put together specific behaviors and information that you’ll need to use `pull_request` as a trigger for your Github Actions workflow. First we’ll take a look at how the workflow is actually triggered `on: pull_request`; then we’ll examine the information provided to the workflow when triggered by a `pull_request`; and finally we’ll look at how `@actions/checkout` reacts to `pull_request`. 

<nav class="table-of-contents">
  <h2>All you need to know about pull_request:</h2>
  <ul>
      <li>
          <a href='#how-do-workflows-trigger-on-pull_request'>Activities that trigger pull_request</a>
      </li>
      <li>
          <a href='#what-information-is-available-from-a-workflow'>Information available to the workflow</a>
      </li>
      <li>
          <a href='#how-does-pull_request-affect-actionscheckout'>Effects on @action/checkout</a>
      </li>
  </ul>
</nav>

## How do workflows trigger on `pull_request`?

When a Github Actions workflow is configured to run on pull requests, by default it will be triggered on three different types of activities: `opened`, `synchronize`, and `reopened`.

```yaml
name: Pull Request Workflow
on: pull_request
```
<p class="blog-post--caption">Basic <code class="language-text">pull_request</code> usage.</p>

 If you need your workflow to run on any of the other types you will need to specify them. And if you wish to run those types in addition to the default types, you will need to manually add those too because once you configure `types` the default values are no longer provided:

```yaml
name: Pull Request Workflow
on:
  pull_request:
    types: [ assigned, opened, synchronize, reopened ]
```
<p class="blog-post--caption">We have to explicitely set every action type if we customize them. <br /> The defaults will not be preserved automatically.</p>

Although the names of these types are pretty self-explanatory, we have gone ahead and double-checked each one of them to confirm our assumptions:

| Type                   | Description                                           |
|------------------------|-------------------------------------------------------|
| `assigned`               | a user is assigned to the pull request                |
| `unassigned`             | a user is unassigned from the pull request            |
| `labeled`                | a label is applied to the pull request                |
| `unlabeled`              | a label is removed from the pull request              |
| `opened`                 | pull request is created                               |
| `edited`                 | title, body, or the base branch of the PR is modified |
| `closed`                 | pull request is closed (as opposed to merged)         |
| `reopened`               | closed pull request is reopened                       |
| `synchronize`            | commit(s) pushed to the pull request                  |
| `ready_for_review`       | pull request is taken out from draft mode             |
| `locked`                 | pull request is locked                                |
| `unlocked`               | pull request is unlocked                              |
| `review_requested`       | request a user for review                             |
| `review_request_removed` | remove request from user for review                   |

<p class="blog-post--caption">For a complete list of activity types, checkout <a href="https://help.github.com/en/actions/reference/events-that-trigger-workflows" target="_blank" rel="nofollow">Github's Events-that-trigger-workflows page</a>.</p>

One thing to note is that when you configure your `pull_request` workflow to be triggered on `labeled` or `unlabeled` and you add/remove multiple labels at the same time, the event of each label will trigger its own workflow run. It also works the same way for `assigned`/`unassigned` and `review_requested`/`review_request_removed`.

## What information is available from a workflow?

You can find the payload of each run of a workflow inside `workflow/event.json` which is accessible with the `github_event_path` environment variable. The payload contains the POST data of the webhook event that triggered the workflow, such as the action type, the commit before and after the action was triggered, the sender, etc.

Here is an example of a payload from a workflow triggered by `pull_request` on `synchronize`:

```js
{
  "action": "synchronize",
  "after": "abcdefg", // most recent commit of this push
  "before": "1234567", // latest commit prior to this push
  "number": 12, // pull request number
  "pull_request": {
	// pull request metadata
  },
  "repository": {
	// owner, description, git_url ...
  },
  "sender": {
	// information of user who triggered this event
  }
}
```

You can do all sorts of useful things with the data provided from this payload. For example, you could compare the `repo.url` property of `pull_request.head` and `pull_request.base` to determine if the pull request was created from a forked repository against the original, and if so you could `console.log("Thank you for your interest in our open source project!")`.

The information in the payload will vary depending on the webhook event and the activity type which caused the trigger. By way of comparison, here’s the payload from a `push` webhook workflow triggered by the same commit as the example above (note that the actual payload will have more information): 

```js
{
  "after": "abcdefg",
  "before": "1234567",
  "commits": [...],
  "forced": false,
  "repository": {...},
  "sender": {...}
}
```

As you can see the payload is different from that of a pull request. On `push` we have less information, namely we lack `activity`, `number`, and `pull_request` from the payload. Note that even if you are pushing this particular commit to a pull request, if the workflow was triggered on `push`, it will not have any of the `pull_request` properties in the payload.

Now that we have compared how a `push` payload differs from a `pull_request` payload, let's take a closer look at how the payload varies on different activity types of `pull_request`:

- `opened`: Here is an example of a payload that does not have anything specific to its activity type, so the properties you see will be available on all pull request payloads:
```js
  {
	"action": "opened",
	"number": 10,
	"pull_request": {...},
	"repository": {...},
	"sender": {...}
  }
  ```
- `edited`: This activity type offers information on the property of the pull request the user has edited.
- `synchronize`: As seen above, this activity includes `before` and `after` commit SHAs. The `synchronize` activity type is triggered _per-push_, so if a single push has multiple commits, the workflow will only run once. The `before` pinpoints the most recent commit _prior_ to the push, such that if you have commits `A-B-C` and you push `D-E-F`, the workflow will be comparing commit `F` to `C`.
- `labeled` and `unlabeled`: These include the metadata of the label that triggered the workflow:
```js
  {
	"action": "unlabeled",
	"label": {
  	"color": "red",
  	"default": true,
  	"description": "Something isn't working",
  	"name": "bug",
	}
  }
```
- `assigned` and `unassigned`: These are similar to `labeled`/`unlabeled` and the workflow will include the payload data of the added or removed assignee.
- `review_requested` and `review_requested_removed`: as odd as it seems, neither of these provides the data of which reviewer changed, and so the payload structure for these actions is identical to `opened`. You are able to find the list of reviewers from within the `pull_request` portion of the payload, but it does not explicitly tell you which addition or removal of a reviewer triggered the workflow.

## How does `pull_request` affect `@actions/checkout`?

When you use `pull_request`, [`@actions/checkout`](https://github.com/actions/checkout) will perform a `git checkout` to the `github.ref` environment variable. Note that `git checkout` is not applied to the commit, as it would have been the case when using `push`.

This difference means that a `pull_request` workflow `ref` would look like `refs/remotes/pull/##/merge` whereas a `push` workflow would be `refs/heads/branch_name`. This explains why the SHA of a `push` workflow matches the commit that triggered the workflow, whereas the SHA of a `pull_request` workflow does not; instead the SHA of the `pull_request` is the resulting commit that was created from merging the base to the head.

You could configure the checkout action with the `ref` argument to be more explicit with what you want to check out. For instance, if you want to checkout the head commit instead of using the default merge ref, you could pass in `github.event.pull_request.head.sha` as the argument (or `github.event.pull_request.head.ref` if you are using `v1`):

```yaml
- uses: actions/checkout@v2
  with:
    ref: ${{ github.event.pull_request.head.sha }}
```
<p class="blog-post--caption">Checking out head commit using <code class="language-text">checkout@v2</code>.</p>

Opting out from the default checkout to specify the head ref might be useful for any number of reasons. For example, if you have an action that relies on the output of `git log`, the merge commit would offset your results. Or merging with the base ref might introduce features that conflict with the head and possibly even go unnoticed. A third reason could be as follows: suppose your tests are comprehensive and catches those conflicts. A user might be confused as to why the tests are failing in CI but passing locally, especially if they are not familiar with how the checkout action works. Specifying the head ref allows you to have more granular control. In any case, a better understanding of how the checkout action works will allow you to troubleshoot effectively.

---

Did we miss anything? Reach out via [Twitter](https://twitter.com/thefrontside) and we'll gladly add it to the discussion! And let us know what cool things you're doing with Github Actions through Frontside’s [Discord](https://discord.gg/r6AvtnU) community (where we hang out and talk about these topics). 

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
