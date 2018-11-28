---
templateKey: blog-post
title: Connecting a Slack Channel to Gitter
date: 2018-03-30 01:22 UTC
tags: 
  - open source
  - community
  - collaboration
  - slack
  - gitter
directory_index: false
author: Robert DeLuca
description: "Slack communities for open source projects have become very popular over the past couple years. Slack has taken hold because it makes collaborative chat really easy and accessible for the masses. Something IRC wasn’t able to achieve."
image: /blog/2018/03/30/connecting-a-slack-channel-to-gitter/sameroom-gitter-slack-blog.jpg
---

Slack communities for open source projects have become very popular
over the past of couple years. Slack has taken hold because it makes
collaborative chat really easy and accessible for the
masses, something IRC wasn’t able to achieve.

Slack is amazing for teams working together but there are
downsides to using it for open source communities. One of those
downsides is they’re closed off to search engines. When someone
gets help with an issue it’s forgotten about. Another issue is that
they are usually free Slack communities, which means they have limited
archives. Once the limit is reached, messages are deleted.

Recently we have started looking into ways to make sure we’re available to
the community for our open source projects. One of the ideas
was to have Slack channels where we could collaborate with the
community, but considering the limitations stated above, we couldn’t
pick Slack.

In our search for something with Slack-like qualities, we found
[Gitter](https://gitter.im/), which checks pretty much all of the
boxes! One problem though: we knew that if we had two different chat apps
we would end up forgetting about one (and it was going to be Gitter). If
only there were a way to combine them…

## What if they could both be the Sameroom?

There’s a service out there that allows you to connect one chat app to
another called [Sameroom](https://sameroom.io/) (see what I did there?
(☞ﾟヮﾟ)☞). We decided to give it a shot and, I have to say, it’s pretty
damn neat. We connected our internal open source Slack channels to the
Gitter chatrooms we set up. Now we will get messages posted in our
Slack channel whenever someone posts in our Gitter chatroom.

We decided to only have the chat go one way. The internal Slack chat
won’t post to Gitter because we’re not crazy about the way it
integrates. Every post in our Slack channel comes from Sameroom bot in
the Gitter chat. If it was easier to distinguish _who_ those posts
were coming from we’d absolutely enable it. [Gitter covers this
limitation in this blog
post.](https://sameroom.io/blog/introducing-bridgebots/)

Other than that one issue, this integration seems to work pretty well!
We’ve set it up for two of our projects and are looking to add more in
the future. Come chat with us in the
[Frontmacs](https://gitter.im/thefrontside/frontmacs) or
[BigTest](https://gitter.im/thefrontside/bigtest) Gitter!
