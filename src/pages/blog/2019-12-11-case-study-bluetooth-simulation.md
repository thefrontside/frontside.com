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
image: /img/2019-12-11-case-study-bluetooth-simulation.png
---
![BlEmulator: an open source cross-platform bluetooth simulator](/img/2019-12-11-case-study-bluetooth-simulation.png)

Bluetooth continues to grow at a steady rate and is expected to be shipped 8% more every year until 2026. Thus, more organizations and teams are developing software to connect to and communicate with more devices over Bluetooth.

However, developing for Bluetooth can be cumbersome. The frontend team is blocked until they receive physical devices. Then, due to limited hardware, engineers will keep blocking each other to try out their work.

To show their progress, the team invests at least a week in setting up a demo every month or two. This rhythm makes course corrections from the VP of Product expensive. It forces the UX team to design some experiences as an after-thought. Not less importantly, the company develops a demo-driven culture that mines everyone’s morale. 

Additionally, it is virtually impossible to have a fully automated test suite, increasing the risk of development dramatically.

For this reason, we partnered with Polidea—development studio based in Warsaw, Poland—on behalf of Resideo to implement a Bluetooth simulator that eases development, enables automated testing, and increases the visibility of products connecting to Bluetooth peripherals. 

This case study overviews the advantages of Bluetooth simulation and our approach to open source collaboration with Polidea and Resideo.

## Why use Bluetooth Simulation?

The idea of creating a Bluetooth simulator emerges from Frontside’s philosophy: transparent development. In transparent development, the impact of every change in the codebase can be tracked and experienced by both technical and non-technical stakeholders. [We help organizations establish tooling and practices that enable them to get a real sense of their product as they build it](/services). 

Applications that connect to Bluetooth peripherals must also follow transparent practices. Thus, every pull request should be thoroughly tested, including the application’s connections to Bluetooth under different circumstances and configurations. Additionally, any stakeholder should be able to preview and experience every change in the codebase, just as a user would use it in production; without particular setups, configs or physical devices.  

Relying on physical devices to achieve transparent development is not a viable option. Physical devices are limited and impose several restraints on teams. For instance, a group of developers would probably share a device, limiting their capability of working concurrently. Testing the application with every supported device is a task on its own. Moreover, visibility on the project is compromised because setting up demos demand significant effort.  

Thanks to Bluetooth simulation, the VP of Product in San Francisco can do course corrections in work delivered by the team in London, from her desk at an early stage. The UX designer can adjust the connection drop-out experience from their home, after reviewing the work done by a consultant in Stockholm while they were sleeping. Not less importantly, everybody in the team rests assured that the product works with every possible device configuration, thanks to automated testing.

## A win-win-win Open Source strategy 

With Frontside’s approach to Open Source, companies, contributors, and community all benefit. In this project, Frontside identified the need for a Bluetooth simulator as a key value for Resideo and saw the opportunity it represented for the open source community. We also provided architectural guidance to make the most out of the library. Resideo provided financial support, and Polidea was commissioned to develop the Bluetooth simulator.

![Resideo, Polidea, and the Open Source community benefit from BLEmulator](/img/2019-12-11-case-study-bluetooth-simulation-partners.png)

**Resideo Wins**:
- *A library made by the best team for the job*: Frontside researched the open source projects in the technologies relevant to Resideo to find Polidea, who had a proved record working with Bluetooth and experience maintaining open source projects.
- *Access to highly-specialized experts on demand*: traditionally, corporations would not be able to hire smaller teams or experts only for precise pieces of a solution because of the associated transaction costs.
- *Reduced costs of ownership*: now that the Bluetooth simulator is created, the maintenance costs and effort are shared by other contributors using the library.

**Polidea Wins**:
- *Financial support*: Polidea had already plans for expanding its open source portfolio, out of its budget. Frontside’s facilitation reduces this expense, enabling Polidea to focus on creating high-quality open source code.
- *Architectural insights*: Frontside provided use-cases and architectural advice to make the Bluetooth simulator a tool that could be used in a broader space other than Polidea’s own libraries. 

**Community Wins**:
- *A polished open source Bluetooth library*: characterized by the rigor and quality of Frontside’s code and the extensive experience from Polidea, the community can now count on a more complete Bluetooth library in the Flutter space.
- *Proved abstractions*: Frontside and Polidea invested significant effort to create lean low-level abstractions that produce effective developer ergonomics for working with Bluetooth. 

## About the Bluetooth simulator

BLEmulator, the Bluetooth simulator, was first implemented for Flutter. However, it features low-level abstractions that enable API consistency across other platforms when they get support. 

![BLEmulator logo](/img/2019-12-11-case-study-bluetooth-simulation-blemulator.png)

At the moment, BLEmulator only works with projects that have chosen Polidea’s FlutterBLE as Bluetooth interactor. FlutterBLE has support for iOS and Android, using native implementations under the hood. 

Frontside aspires to maximize the value and impact of software. Thus, the implementation of BLEmulator is designed to be decoupled from FlutterBLE so the library may become independent and have a wider adoption.

You can learn more about <a href="https://www.polidea.com/blog/bluetooth-low-energy-simulator-a-new-hope-in-iot-development/?utm_source=Backlinking&utm_medium=Npaid&utm_campaign=Blog&utm_term=Article&utm_content=BL_NOP_BLG_ART_Front001" target="_blank">BLEmulator from Polidea’s technical release</a> and the project’s <a href="https://github.com/Polidea/blemulator_flutter" target="_blank">Github</a>.
