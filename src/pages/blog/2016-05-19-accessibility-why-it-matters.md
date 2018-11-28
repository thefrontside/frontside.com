---
templateKey: blog-post
title: Accessibility & Why it Matters
date: 2016-05-19T12:00:00.000Z
tags: 
  - code
  - frontside
  - accessibility
  - web accessibility
  - disability
  - gaad
  - ember-a11y
image: /img/2016-05-19-accessibility-why-it-matters_gaad.jpg
author: Stephanie Riera
directory_index: false
---

In honor of [GAAD][1] (Global Accessibility Awareness Day), I interviewed a developer who is active in the accessibility community to gain some insights on the importance of web accessibility.

Applying for jobs, registering your vehicle, selecting classes for the next school semester, and other tasks can become close to impossible if you have no access to the internet. Imagine for a second that you had no access to Google, Netflix, and dank memes. This sucks. Now let's imagine you couldn't use your computer's mouse or trackpad. How would you navigate the page or click on an image? Life would suck, royally. This is the reality for a population of internet users.

### What is accessibility?
[Accessibility][2] refers to the design of products, devices, services, or environments for people who experience disabilities. Usability affects from the blind and color blind to the deaf and seizure prone. People in developing countries use the internet but may not necessarily know English. A site with poor usability makes it challenging for the elderly and those with motor skills disabilities to use.

<figure alt="Blind students enjoying computer games at Techshare India 2012">
  <img src="/img/2016-05-19-accessibility-why-it-matters_students.jpg">
</figure>
([Image][3]:  Blind students enjoying computer games at Techshare India 2012)

Federal websites must adhere to Section [508][4] which is a law that states Government sites must be accessible for people with disabilities. Some sites follow the [ADA][5] (Americans with Disabilities Act) guidelines loosely but the majority of websites could make a concerted effort to improve.

#### The dialogue is just not there.
And it's unfortunate. You'd think that with the current tech boom more developers and startups would pay attention to accessibility. The fact of the matter is, unless you have a disability or are directly affected by a family member with one, chances are you've never given it much thought. Even I didn't learn about web accessibility while I was studying web development.

<figure alt="Google Trends graph of web accessibility and guidelines over time, captured May 16, 2012">
  <img src="/img/2016-05-19-accessibility-why-it-matters_accessibility-chart.png">
</figure>
([Image][6]: Google Trends graph of web accessibility and guidelines over time, captured May 16, 2016)

Despite the lack of awareness, this leaves room for opportunity. Accessibility applications can be expensive and have a steep learning curve. There is an untapped market with both native and web accessibility applications that have capacity for great improvement.  The value you contribute through innovation and open source software is limitless.


### Why does making my site accessible matter?
The UN Convention on the Rights of Persons with Disabilities recognizes access to information and communications technologies, including the Web, as a **basic [human right][7].**

The internet has become more than humanity's encyclopedia. Cultural and social behaviors bubble out of the world wide web and become elements of today's society. The internet provides a medium for people with disabilities to interact. Everyone benefits when we _support social inclusion for all._ Tech is integrated in our culture and everyday life. Let’s try an experiment. For the next 30 seconds, navigate any webpage you want (this article can wait), and try navigating without a mouse. Hit tab and enter. See what it’s like to click links, fill in a form, whatever you like. Or better yet, if you have 3 or 4 minutes, turn on [VoiceOver][19], and navigate with just the audio. Use a screen reader with voice recognition if you're feeling lucky.

By just taking those few seconds or couple of minutes, you can empathize with an entire world of users whose experience on the web is completely different from our own. And in the end, isn’t creating great experiences what software development is all about? This insight not only makes you a better developer but paves the way for building better UX. Beautifully designed sites avoid unnecessary noise and are navigable. Elegant applications incorporate architecture that flows and actions that are clear. Together we can make web accessible by default, the _standard_.


#### Alright, how do I start making my site accessible?
It's easier if you start putting thought into the site structure and picking colors from day one. Consider the flow of the site, would you be able to navigate through it if you were drunk? Test your colors with a contrast checker and start adding links to skip repetitive content. Imagine a screen reader describing the Facebook navigation every time you load the page. After the fifth time, you'd know the messages icon goes right after the friend requests.

Make sure you’re being semantic with your HTML tags. Use an actual ```<button>``` element and divert from doing this:
```<div class="button" {{action"showModal"}}>Open Modal</div>```
If you are in the practice of using `<div>` be cautious because the DOM doesn't recognize hierarchy. Divs and `<span>` should be used for styling, else a screen reader won't recognize a header and won't read it. If you **must** use a div as a button, please us the `role` attribute. This is a last resort.


---

[WCAG][8] 2.0 principle: Perceivable, Operable, Understandable or Robust

---
Never use a timeout because the user won't be able to get to the content in time and it turns into a videogame that you must master to get to the next page. Make use of checkboxes or radio buttons. Add labels for your forms and tables. An added benefit from making your site accessible is that it overlaps with other best practices such as mobile web design, search engine optimization (SEO), and usability.


#### Here are couple tools you can start playing with:

- [aXe][9] is chrome extension that provides quick accessibility testing.
- [AChecker][10] is available if you're not a fan of chrome extensions. *_Note: If you have a single page app it won't work._*
- [ContrastChecker][11]- does just that.
- [WAVE][12] (Web Accessibility Evaluation Tool) also offers a Chrome [extension][13].
- [AATT][14], Automated Accessibility Testing Tool helps you integrate accessibility testing into your existing automation test suite.

If you're seeking a wiki style run through of best practices, I highly recommend [W3C][15] (Web Accessibility Initiative), they have compiled strategies, guidelines, and resources on accessibility. Stanford University has generated [SOAP][16] (Stanford Online Accessibility Program) to provide resources for designers, developers and content creators. Hopefully these resources will make it easier to transition to building sites that are sophisticated, accessibility friendly and most importantly inclusive.

###### You tha real MVP
I'd like to thank Robert DeLuca for taking the time from his schedule to allow me to interview him on accessibility. Rob is a Frontend developer and a contributor to [ember-a11y][17], an open source initiative to create Ember addons that help make accessibility default.
He's also created awesome applications like [DropKick][18], a plugin for creating beautiful, accessible, and painless custom dropdowns. You can find him on the Twitterverse [(@robdel12)][20] or talk accessibility on the Ember Slack (@robdel12).

---
I’m Stephanie Riera [(@stefriera)][21], and I build web applications for a living at The Frontside. If you enjoyed this, I'd love to hear from you! Shoot me a line at stephanie@frontside(dot)io.

[1]: http://www.globalaccessibilityawarenessday.org/
[2]: https://en.wikipedia.org/wiki/Accessibility
[3]: http://g3ict.org/resource_center/newsletter/news/p/newsletterId_/id_476
[4]: http://www.section508.gov/content/learn/laws-and-policies
[5]: www.ada.gov
[6]: https://www.google.com/trends/explore#q=web%20accessibility%2C%20accessibility%20guidelines&cmpt=q&tz=Etc%2FGMT%2B5
[7]: http://www.un.org/disabilities/convention/conventionfull.shtml
[8]: https://www.w3.org/TR/UNDERSTANDING-WCAG20/intro.html
[9]: https://chrome.google.com/webstore/detail/axe/lhdoppojpmngadmnindnejefpokejbdd?hl=en-US
[10]: http://achecker.ca/checker/
[11]: http://www.contrastchecker.com
[12]: http://wave.webaim.org/
[13]: http://wave.webaim.org/extension/
[14]: https://github.com/paypal/AATT
[15]: https://www.w3.org/WAI/gettingstarted/Overview.html
[16]: https://soap.stanford.edu/tips-and-tools/tips
[17]: https://www.npmjs.com/package/ember-a11y
[18]: https://github.com/Robdel12/DropKick
[19]: http://webaim.org/articles/voiceover/
[20]: https://twitter.com/robdel12
[21]: https://twitter.com/stefriera
