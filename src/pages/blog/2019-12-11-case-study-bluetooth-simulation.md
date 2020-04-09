---
templateKey: blog-post
title: Case study — Facilitating the next generation of Bluetooth-connected apps
date: 2019-12-11T05:00:00.000Z
author: Taras Mankovski
description: >-
  More and more teams are using Bluetooth for innovative products, but developing UIs for connected devices can be challenging: limited physical devices slow down development and make it nearly impossible to keep up a strong test suite. Our solution is simulation and Open Source power.  
tags:
  - oss
  - case-study
  - simulation
img: /img/2019-12-11-case-study-bluetooth-simulation.png
---
![BlEmulator: an open source cross-platform bluetooth simulator](/img/2019-12-11-case-study-bluetooth-simulation.png)

Today Bluetooth is among the most widely adopted wireless communication technologies, and the popularity of Bluetooth enabled devices shows no signs of warning. With an anticipated annual growth rate of 8% through 2023 [1], it’s no surprise that more organizations than ever before are developing software to connect to and communicate over Bluetooth.

However, developing for Bluetooth can be cumbersome. The typical process begins with the frontend team being blocked until they receive the physical devices, and engineers having to wait to try out their work due to limited hardware. To show their progress, every month or two teams have to drop everything to invest at least a week’s time setting up a demo. 

This rhythm makes course corrections from the VP of Product expensive, forcing the UX team to design some experiences as an after-thought. No less important is the emergence of a demo-driven culture that undermines everyone’s morale. And worst of all is the fact that it’s virtually impossible to have a fully automated test suite, dramatically increasing risks in the development pipeline.

When Resideo came to Frontside with these concerns, we partnered with Polidea—a development studio based in Warsaw, Poland—to implement a Bluetooth simulator. By creating virtual representations of Bluetooth peripherals, developers can keep working despite the unavailability of physical devices, designers can get early feedback of the application UX, and managers can get a solid sense of the progress of the project. Adopting this approach has the twin virtues of both easing developmental bottlenecks and enabling automated testing.

This case study provides an overview of the advantages of Bluetooth simulation and Frontside’s approach to open source collaboration with Polidea and Resideo.

## Why use Bluetooth Simulation?

The idea of creating a Bluetooth simulator emerges from Frontside’s guiding philosophy of  *transparent development*. It’s our belief that the impact of every change to the codebase can and should be tracked and be visible to both technical and non-technical stakeholders. [We help organizations establish tooling and practices that enable them to get a real sense of their product *as they build it*](/services).

That means that applications that connect to Bluetooth peripherals should follow transparent practices. Every pull request should be thoroughly tested, including the application’s connections to Bluetooth under varied circumstances and multiple configurations. And any stakeholder should be able to preview and experience every change in the codebase without particular setups or configs, just as a user would in production.

Relying on physical devices to achieve transparent development is not a viable option as they impose several restraints on teams. Their limited numbers force developers to share devices, limiting their capability to work concurrently. Testing the application with every supported device is a monumental task on its own. Moreover, visibility on the project is compromised because setting up demos demands significant effort.

But thanks to Bluetooth simulation, the VP of Product in San Francisco can test work delivered by the team in London and perform course corrections on the spot. The UX designer can adjust the connection drop-out experience from their home after reviewing the work done by a consultant in Stockholm while they were sleeping. No less important is the fact that everybody on the team rests easy knowing that thanks to automated testing the product works with every possible device configuration.


## A win-win-win Open Source strategy 

With Frontside’s approach to Open Source, companies, contributors, and the community all benefit. For this project, Frontside identified the need for a Bluetooth simulator as a key need for Resideo and saw the opportunity that creating one represented for the open source community. Polidea was commissioned to develop the Bluetooth simulator, Resideo provided financial support, and Frontside contributed architectural guidance to make the most out of the library.

![Resideo, Polidea, and the Open Source community benefit from BLEmulator](/img/2019-12-11-case-study-bluetooth-simulation-partners.png)

**Resideo Wins**:
- *A library made by the best team for the job*: by researching open source projects in the technologies relevant to Resideo, Frontside found Polidea, who had a proven track record of working with Bluetooth and experience in maintaining open source projects.
- *Access to highly-specialized experts on demand*: corporations would typically be unable to hire smaller teams or experts to develop targeted solutions for precise pieces of the puzzle because of the associated transaction costs.
- *Reduced costs of ownership*: now that the Bluetooth simulator is created, the maintenance costs and effort are shared by other contributors using the library.

**Polidea Wins**:
- *Financial support*: Polidea already had plans for expanding its open source portfolio out of its own budget, but Frontside’s collaboration reduces this expense, enabling Polidea to focus on creating high-quality open source code.
- *Architectural insights*: Frontside provided use-cases and architectural advice to make the Bluetooth simulator a tool that could be deployed independently of Polidea’s own libraries. 

**Community Wins**:
- *A polished open source Bluetooth library*: characterized by the rigor and quality of Frontside’s code and the extensive experience of Polidea, the community can now count on a more complete Bluetooth library in the Flutter space
- *Proved abstractions*: Frontside and Polidea invested significant effort to create lean low-level abstractions that produce effective developer ergonomics for working with Bluetooth. 

## What’s Next

![BLEmulator logo](/img/2019-12-11-case-study-bluetooth-simulation-blemulator.png)

Currently Polidea’s Bluetooth simulator BLEmulator only works with projects that have chosen FlutterBLE as the Bluetooth interactor. But Frontside aspires to maximize the value and impact of its software collaborations. That’s why BLEmulator is designed to be decoupled from FlutterBLE so the library may become independent and be more widely adopted. It features low-level abstractions using native implementations under the hood that enable API consistency with platforms like iOS and Android.

Learn more about <a href="https://www.polidea.com/blog/bluetooth-low-energy-simulator-a-new-hope-in-iot-development/?utm_source=Backlinking&utm_medium=Npaid&utm_campaign=Blog&utm_term=Article&utm_content=BL_NOP_BLG_ART_Front001" target="_blank">BLEmulator from Polidea’s technical release</a> and the project’s <a href="https://github.com/Polidea/blemulator_flutter" target="_blank">Github</a>.

<hr />

[1] Bluetooth SIG, Inc. (2019). “Bluetooh Market Update.” Available online at < https://3pl46c46ctx02p7rzdsvsg21-wpengine.netdna-ssl.com/wp-content/uploads/2018/04/2019-Bluetooth-Market-Update.pdf > 
