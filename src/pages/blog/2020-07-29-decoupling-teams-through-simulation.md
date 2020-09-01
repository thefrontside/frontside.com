---
templateKey: blog-post
title: >-
  Beyond Mocking: Decoupling teams through Simulation
date: 2020-07-29T05:00:00.000Z
author: Charles Lowell, Jorge Lainfiesta
description: >-
  Decoupling front-end and mobile teams from the back-end makes organizations more effective. In this article we explain why using simulation is an ideal strategy for this purpose, and present important considerations for adopting such practices.
tags:
  - simulation
  - best-practices
img: /img/2020-07-29-simulator-social.png
---
![Beyond Mocking: Decoupling teams through Simulation](/img/2020-07-29-simulator-intro.png)


Working across teams is challenging. It gets especially tricky when one team depends on another to make progress on their own tasks. For instance, take an all-time classic: the front-end team needs the back-end team to provide them with APIs to advance the UI. Both parts are working towards a common goal, but their dependency may create tensions and frustration, which compromise the quality they would otherwise deliver.

In Frontside’s experience, the most effective solution to this kind of collaboration problem is to decouple the teams through a simulator. The simulator must accurately reflect what the back-end team is building, such that the front-end can rely on it without future headaches. Those developers tasked with creating the UI should be able to flawlessly switch between the simulator and the real back-end without effort. 

An effective and useful simulator is not merely a collection of JSONs that reflect the structure of server responses. It also emulates errors and relationships between endpoints in order to capture the inner state of the backend service. Yet just as crucial as the simulator are the practices adopted by the team to keep it useful and reliable. 

In this article, we’ll start by exploring why decoupling front-end and mobile teams from the back-end is valuable. Then we’ll jump into what a good simulator does and how it critically differs from using mocks and stubs. Afterward, we’ll outline the key steps you need to take if you adopt a simulation strategy. 

<nav class="table-of-contents">
  <h2>Decoupling teams through simulation:</h2>
  <ul>
      <li>
          <a href='#why-you-should-consider-decoupling'>Why you should consider decoupling</a>
      </li>
      <li>
          <a href='#what-is-a-simulator'>What is a simulator?</a>
      </li>
      <li>
        <a href='#state-and-relationships-bring-life-to-simulators'>State and relationships bring life to simulators</a>
      </li>
      <li>
          <a href='#adopting-a-simulation-strategy'>Adopting a simulation strategy</a>
      </li>
      <li>
          <a href='#conclusion-2'>Conclusion</a>
      </li>
  </ul>
</nav>

## Why you should consider decoupling

Implementing decoupled modules when developing software creates a more robust and resilient system. Within a decoupled architecture, specialized layers in the system are optimized, modules can swiftly be changed for newer ones, and one-point failures are avoided altogether.

In the same fashion, decoupled teams create a flexible and robust organization. More often than not tightly coupled teams lead to low productivity and high frustration. When you force two (or more) teams to be dependent on each other, you are potentially wasting the energy of both and ignoring their unique challenges.
Each team has its own people with their own capabilities. Successful managers recognize each team’s virtues and use them to improve the team’s performance and morale. However, leveraging the skills and motivation of each team becomes difficult when two different teams become each other’s blocker. In that situation, what could have been synergy becomes friction.

When you run tightly coupled teams, it’s not simply that problems in which each team runs into impact both teams, magnifying each delay and obstacle and impacting the organization as a whole. It’s that in not addressing the issue you essentially communicate that you don’t respect each team’s most valuable asset: time. 
From a project management perspective, teams reap considerable benefits from decoupled cadences when they run into bottlenecks or have a disparity in their respective priorities.

For example, let’s say new data protection practices are set to be adopted in the organization. The back-end team then has to prioritize the revision of a large set of endpoints and halt all forward progress on new features till data protection issues are resolved. The new requirements don’t show up in the UI so the front-end team doesn’t have to deliver anything. They’d like to continue working on the UI for the new features, but now are stuck because the back-end team is unavailable and thus cannot deliver the APIs that the front end team needs to tackle to complete its tasks.

In cases like these, it would be easier for both teams to run at their own speed according to their particular needs and requirements instead of strictly forcing both to adhere to an artificial cadence so that they can stay coupled. Respecting the time of both teams means the correct solution is decoupling.

## What is a simulator?

No discussion of a simulator is complete without reference the film The Matrix, so let’s start there. The movie shows a world in which humans live in a computer simulation that is very different from their actual physical existence. This simulation is not merely a collection of inert pictures flashing before their eyes—an interface that you passively interact with. It is instead a fully immersive experience that you actively engage—a world so alive don’t notice you’re within it because it feels real.

![Morpheus, from the movie The Matrix (1999), sitting in a couch](/img/2020-07-29-simulator-matrix.png)
_Morpheus, from the The Matrix (1999)_

To truly be effective, the simulator software developers use has to be alive and dynamic
like the Matrix. Indeed, that’s the problem with mocks and stubs—no matter how realistic they look, in the end they are like two-dimensional photographs—dead and static. Contrary to mocks and stubs that decay rapidly and become useless, a simulator can be updated and stay evergreen. 

The proof is in the pudding as they say, and all you need to do is return to mocks or stubs that were written only a month prior. Being hard-coded they become obsolete fast, and after 4 weeks feel rickety and not up to the task. While they may help hold things together for a short time, so does duct tape – neither is a long-term solution. Mocks and stubs instead rapidly become a problem for the codebase.


## State and relationships bring life to simulators

We have described mocks and stubs as dead vs. simulators as alive, but to what does that translate to in technical terms? The key lies in state and relationships. Mocks and stubs merely reflect the response structure of an API response, while simulators map the APIs behavior and relationships and from there outputs appropriately formatted responses.

That turns out to be a huge difference. Real APIs are not static JSON objects independent from one another like in a mock or stub. APIs interact among each other, depend on each other, and even consume each other in the back-end. Moreover, each endpoint has errors, tokens, metadata, and side effects. None of that is reflected in a static mock or stub. And after all, how could it? JSON is merely the format over which all the information from the back-end is communicated. The format is not a crucial part of an API, and therefore it is not uncommon to see it change and evolve. But that means the mocks and stubs become quickly outdated in addition to lacking the dynamic character of real APIs.

![Screenshot of Network tab on Firefox's Web Inspector](/img/2020-07-29-simulator-browser.png)
_Focusing on the responses' format is important, but it's helpful to be aware of what it represents in the back_

A simulator is designed to accurately represent the API’s inner state, which is reflected in the interactions and relationships between endpoints. For instance, if you edit the user’s name through the UI, the endpoint that returns the user data would reflect such change, although it was introduced as an effect of calling a different endpoint.

With mocks and stubs, you can replicate the structure of a response provided by an API. It may even appear suitable for simple features. You just add a file with a JSON to your codebase and consume it as a response for your API request; no annoying extra libraries or setups. But the problem is that APIs seldom are simple. Sooner than later, you’ll be dealing with authentication tokens, form validations, file uploads, and more. API complexity scales up rather quickly in most applications. That’s when you see the real value of simulation.

## Adopting a simulation strategy

Opting for a simulation strategy will directly impact your overall development process. That’s why a simulation strategy must be a team decision and effort. You have to invest in understanding your back-end, research libraries for simulation, implement the simulator, and maybe most important of all, socialize and maintain the simulator’s accuracy. 

The first step is understanding how your back-end is provisioned. You might find yourself getting into a rabbit hole when exploring how different teams in your organization provide their services and how they interact (or not) with each other. Broader issues may often come up, such as the opportunity to consolidate the services architecture with better-aligned practices across teams or through a federated schema. 

The next priority is researching and then choosing the most suitable simulation tool. For back-ends over HTTP, we’ve had good experiences with [Mirage.js](https://miragejs.com/). But you might find out that it’s not sufficient to cover your use cases, so you may need to invest in extending tools or even creating your own (beware: this introduces greater risk and maintenance costs in your simulator). When a simulator doesn’t exist for what you need, you can consider [cooperating with open source projects](https://frontside.com/blog/2019-12-11-case-study-bluetooth-simulation/). 

Once you have decided on which libraries and tools and have a sufficient understanding of your back-end, you can start implementing your simulator. We recommend approaching the task from an experience-first perspective instead aiming to achieve endpoint parity. Focus on a UI segment that you know well and simulate the endpoints that it needs. Try experimenting on how responses with errors, latency, and other parameters look like. It will most likely take a few iterations before you develop to the best patterns to follow for all the APIs you want to implement.

Finally, socializing simulation practices is essential for maintaining its reliability, accuracy and effectiveness. Developers will have to extend the APIs according to their needs. But because those needs may be redundant (or in conflict) with other data requirements, an effective process for extending the data schema is needed. That’s why the simulation adoption must include a comprehensive plan for discussing and curating the evolution of APIs to keep the simulator evergreen. This benefits not only the simulator but the sustainable growth of the organization’s data management. This process is typically overseen by one or more developers who takes on the role of data field owner. 

## Conclusion

Implementing a simulation strategy takes resources: very tangible time and money. It requires developers to research, experiment, and adopt new practices. It’s not easy to come to your boss and say, “Hey, I’ll be working on a simulator, so don’t count on me. See you in a month or two!” 
Because simulation has concrete costs and requires specific resources, it is easy for decision-makers to take that number, compare it with other expenses, and even reject it as an option because it is a “non-feature.” 

But what is often overlooked in that decision is the cost of the solution used instead of a simulator. While not nearly as quantifiable as building a simulator, the cost is real, and quite arguably much more than what it would take to adopt the simulator solution. To be sure there’s the technical debt costs of the multiple mocks and stubs accumulating untamed in the codebase, but both literally and rhetorically you can’t put a price tag on the lost time and productivity due to blocked teams. And as the project scales up, there’s the problem of the need for automated tests and slow or even flaky results if run against remote back-ends. Creating ad-hoc mocks and stubs to “get through” the features only results in long-term liabilities in your codebase. 

Or you could address all these issues in one fell swoop by using a simulator. To be sure, adopting a simulation strategy requires thoughtful considerations and efforts from the team to adopt new practices. But the benefits that flow from decoupling teams through simulation – more effective development cycles and a better directed collaboration – by far outweigh the problems caused by mocks and stubs.

In The Matrix the main character Neo initially doesn’t trust the simulation but eventually comes to recognize the power inherent in using it to achieve his ends. Maybe it’s time for you to “take the red pill” like Neo did and convince your company to do the same. Feel free to [reach out to us](https://frontside.com/contact) if you want help or ideas :) 

<aside class="posts-list-list">
  <h2>Related article:</h2>
  <div class="posts-list-entry">
    <h3 class="posts-list-title">
      <a href="/blog/2020-08-31-mirage-serializers/">
        MirageJS: Choosing the right Serializer 
      </a>
    </h3>
    <p>
      Mirage is a great library for implemnting HTTP simulation. In this blog post, we overview the basics of serializers in Mirage, and examin in detail the specific format of each JSON API, Active Model, Rest and generic serializers.
    </p>
    <a href="/blog/2020-08-31-mirage-serializers/" class="post-link">
      Continue reading
      <span class="post-link--arrow">→</span>
    </a>
  </div>
</aside>
