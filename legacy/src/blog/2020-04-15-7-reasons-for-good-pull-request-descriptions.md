---
templateKey: blog-post
title: 7 reasons to write good Pull Request descriptions
date: 2020-04-15T05:00:00.000Z
author: Taras Mankovski
description: >-
  A good Pull Request description can lead to better reviews, improved solutions, better documentation, and more. In this article, Taras surveys seven big wins of PR descriptions.
tags:
  - best-practices
  - dx
img: /img/2020-7-reasons-for-good-pull-request-descriptions-social.png
---

In large open-source projects writing a good description in a Pull Request (PR) can be the difference between your changes being merged or ignored. These projects essentially necessitate the creation of PR descriptions, as development practices are strictly enforced by tooling and the culture of collaboration. These practices dramatically help improve the quality of the overall project.

But in closed source enterprise projects, the pressure of deadlines and insufficient or inconsistent development practices limit the attention developers can spend on crafting descriptions for PRs. It is not unusual to stumble across private repositories with numerous PRs that have no description for them whatsoever. Part of the problem is that most development environments treat Pull Requests as merge demands rather than a genuine request like they are in the Open Source community.

Yet adopting some open-source practices around PR descriptions would be a good thing even in closed environments. Without a meaningful explanation of why or how the code changes were introduced into the code base, unpleasant effects like rubber stamping, unnecessary abstractions, and knowledge silos are introduced. As such mistakes weave their way through the development process, they add up and eventually compromise the long-term success of an organization’s software.

For me, descriptions are a critical part of Pull Requests. In case you’re not fully convinced of the value of Pull Request descriptions, let me give you a fistful of reasons why you should never merge a PR without a good accompanying description.

## 1. They capture context

By definition, a Pull Request is a proposal to change code in a particular way. If your change is correct, then your code will likely live in the application for a long time. You will always be able to go back and look at the result of merging the pull request. But what you will not find in the source code is why the change was made. What prompted the change? Were you under pressure to fix a bug? Was this change a team decision that you implemented? All of this information is context. It provides the answer, and sometimes is the only defense against the inevitable question that gets asked: Why on earth is this code even here?

![A PR with no description has no context](/img/2020-7-reasons-for-good-pull-request-descriptions-empty-pr.png)
_A Pull Request with no description lacks important context. For example, why did this PR change 53 files at once? Refactoring? New feature? Hard to tell at a glance._

## 2. Descriptions prevent unnecessary code

Every line of code increases your organization’s liability. Even your best code will become someone’s WTF moment. Think back to the last time that you swore at a piece of code, and moments later realize that you are the author. The best PRs remove source code. The second best are those that never get merged because they turn out to be unnecessary. But without a description such unmerged PRs are likely never to happen, resulting in code that is heavier than it needs to be.

For example, suppose you want to introduce an abstraction to the code that already exists but you were not aware of. You’d be introducing unnecessary complexity by adding a code path for something that already exists in the source code. If you don’t write a pull request description that explains what your abstraction does, you’ll miss out on the opportunity to learn that a similar abstraction already exists. Even a few un-merged pull requests per quarter can add up to a lot of code that you don’t need to worry about and maintain down the line.

## 3. Descriptions identify the right change increment

All programmers strive to write great code, but often this leads to making (a lot) more changes in a single Pull Request than originally intended. If you think this doesn’t apply to you, try making a bullet point list of all of the changes that you introduced in a recent Pull Request. You’ll quickly find that you made numerous changes after running across mixed whitespaces, improperly formatted blocks of code, or a missing null check that were not relevant to the main concern of your PR.

These kinds of side changes are surprisingly devious. They can slow down code reviews because your changes were unexpectedly more controversial than expected, introducing bugs that you didn’t even think of. Yet without a PR description they are fiendishly difficult to undo. By introducing the practice of describing the changes that your PR makes, you force yourself to reflect if all the changes you are making should be part of the same Pull Request. When your description has a big list of changes, it often alerts you to the fact that the PR should be split up into (several) smaller ones and merged separately.

## 4. Descriptions lead to better solutions

Especially on large projects it’s not possible to always come up with the best available solution on your own. In most cases there will always be someone who will know an area of source code better than you. In other cases you are that person for a particular stretch of code, yet others are making imperfect changes to it. Given the constant churn and evolution of the programming ecosystems and it’s not hard to see why it’s simply impossible to always coming up with the best possible solution when making a PR. Yet it is also in everyone’s interest that others have an opportunity to suggest alternative and possibly better solutions to what was suggested in a PR. Without a description that draws the reviewer’s attention to the approach, you’re significantly reducing the chances that a better solution will emerge through code reviews.

![Recording of a long discussion on a PR](/img/2020-7-reasons-for-good-pull-request-descriptions-long-responses.png)
_A good description can lead to great discussion on a PR. I recently experienced it when contributing to Ink._

## 5. Descriptions makes reviewing easier

Code reviews reduce the number of incomplete, poorly tested, and incorrect changes introduced into your codebase. They are a critical part of every effective development process to ensure that your solution matches your original intention, but can be time consuming. A good pull request description prepares the reviewer for what they’ll find during the code review. They can tell the reviewer where to focus their attention by highlighting areas that you’re not sure about as well as areas that you’re proud of. This makes it easier to process PRs during code reviews and quickly provide meaningful feedback.

## 6. Descriptions are a great source of knowledge

Most changes require some kind of research. You might have found a solution on StackOverflow, a blog post, or in the documentation. To get the answer, you would have to read a bunch of sources, match an approach to your problem, attempt the solution, and observe the result. This process is enlightening but also time-consuming. It’s important therefore to document your thinking in case someone else has to recreate it, but also because everyone can learn from it.

When you’re writing a PR description, all of this learning is fresh in your mind. It’s the best time to synthesize what you learned and share it with your team without the overhead of writing a blog post. Including lessons learned in your PR description will allow you to better remember the information that you learned and highlight what you learn for others on your team to benefit.

## 7. Descriptions make you invaluable

Most of our days as developers are spent finding solutions to problems. A PR description is equivalent to providing a great unboxing experience for your solution. If you spent a week working on a problem, spending an hour to write a detailed Pull Request description will make your solution look that much better because it’ll allow your teammates to understand why this problem was complicated and required a week of work.

---

Open source communities have a reputation for having great source code. It’s not a coincidence that they tend to have some of the strictest requirements dictating the quality of PR descriptions. Enterprise teams can learn a lot from the best practices of how open source communities write great software, starting with pull requests.

Requiring a good PR description is a small investment that pays big dividends. Give it a shot for a few months and encourage the same of your fellow developers. You might find yourself never going back, and emerge as a stronger and more valuable team member as a result.

<aside class="posts-list-list">
  <h2>Related article:</h2>
  <div class="posts-list-entry">
    <h3 class="posts-list-title">
      <a href="/blog/2020-05-25-github-actions-pull_request/">
        Gihub Actions: a deep dive into pull_request
      </a>
    </h3>
    <p>
      We have put together specific behaviors and information that you’ll need to use pull_request as a trigger for your Github Actions workflow.
    </p>
    <a href="/blog/2020-05-25-github-actions-pull_request/" class="post-link">
      Continue reading
      <span class="post-link--arrow">→</span>
    </a>
  </div>
</aside>
