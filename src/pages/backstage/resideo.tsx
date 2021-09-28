import React, { useState } from 'react';

import Layout from '../../components/layout';

import {
  consultingTopTCA,
  radiusMd,
  sectionHeader,
} from '../../styles/page.css';
import {
  headingXl,
  textLg,
  mardownColumn,
  text2Xl,
  text3Xl,
  headingLg,
  textGradientSkyblueGreen,
} from '../../styles/typography.css';

import greenblueIndicatorScreenshot from '../../img/2021-casestudy-resideo-backstage/backstage-indicator-catalog.png';
import scaffoldScreenshot from '../../img/2021-casestudy-resideo-backstage/backstage-scaffolding.png';
import ContactCTA from '../../components/contact-cta';
import { actionButtonGreen } from '../../styles/buttons.css';

export default function ConsultingPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Layout title="Case study: Boosting Resideo's Developers Experience with Backstage">
      <header className={sectionHeader}>
        <span className={headingLg}>Case study</span>
        <h2 className={text2Xl}>
          Boosting Resideo's Developers Experience with Backstage
        </h2>
      </header>
      <section className={mardownColumn}>
        <p>
          Resideo is a global leader in smart home products and systems. With
          headquarters in Austin, Texas but teams distributed across the world,
          visibility and technical cohesiveness is a system-wide challenge.
          Frontside helped Resideo set up and customize Backstage to enable
          org-wide service discoverability, standardize access to documentation
          across teams and languages, and kick-start ship-ready projects.
        </p>
        <h2 id="all-services-and-releases-at-sight">
          All services and releases at sight
        </h2>
        <p>
          Resideo has several dozen Cloud services and uses a Blue-Green
          strategy for new releases. Leveraging the Backstage Catalog, Frontside
          empowered everyone in the engineering organization to experience a
          uniform way of viewing these services and accessing their
          repositories, documentation, and the people behind them.
        </p>
        <p>| screenshot: Catalog with blurred out names |</p>
        <p>
          Frontside also introduced a Blue-Green indicator into Resideo&#39;s
          Catalog so anyone could immediately know the release status,
          effectively eliminating the uncertainty teams often experienced about
          the deployment state of their services.
        </p>
        <p>
          <img
            src={greenblueIndicatorScreenshot}
            alt="Screenshot highlighting a green and blue indicators a Backstage"
          />
        </p>
        <h2 id="new-projects-with-miles-of-a-headstart">
          New projects with miles of a headstart
        </h2>
        <p>
          As Resideo continues to grow, new services need to be developed,
          tested, and deployed regularly. Frontside showed how they could build
          effective templates web UI, infrastructure, and data modeling that
          could quickly spin up a full-stack project and provide a helpful
          starting point—without falling into rigid patterns or premature
          optimizations. Thanks to Backstage Scaffolding, Frontside is helping
          Resideo teams begin projects with a ready-to-ship foundation to
          minimize time-to-market and reduce fragmentation in the engineering
          organization.
        </p>
        <p>
          <img
            src={scaffoldScreenshot}
            alt="Screenshot of Backstage Scaffolding feature in Resideo"
            className={radiusMd}
          />
        </p>
        <h2 id="a-unified-reference-for-documentation">
          A unified reference for documentation
        </h2>
        <p>
          Like Cloud native organizations, Resideo allows teams to choose their
          toolset and therefore documentation practices, with styles ranging
          from auto-generated JavaDoc APIs to handwritten markdown-based guides.
          Frontside helped Resideo implement Backstage’s TechDocs so everyone
          had a uniform method for accessing each project’s documentation.
          Additionally, Frontside introduced a CLI-based command to allow
          developers to access the documentation of any Resideo service without
          leaving their work environment.
        </p>
        <p>| screenshot: techdocs |</p>

        <h2 id="discover-use-create">Discover, use, create</h2>
        <p>
          Backstage enables organizations to discover new possibilities through
          its Catalog, but that&#39;s only the first step. Resideo continues to
          partner with Frontside to help their engineers understand how to go
          beyond Backstage’s available services and use its resources to create
          new apps and features and improve their services, code, and
          infrastructure.
        </p>
        <p>
          Frontside is your go-to partner for adopting Backstage on your terms
          and making the most out of it—without worrying about utilizing alpha
          software or forking out of the OSS community.
        </p>
        <p className={consultingTopTCA}>
          <ContactCTA
            submitted={submitted}
            setSubmitted={setSubmitted}
            label="Adopt Backstage with Frontside"
            topic="backstage"
            eventId="cta-backstage"
            ctaId="cs-rez"
            className={actionButtonGreen}
            thanksClassName={textGradientSkyblueGreen}
          />
        </p>
      </section>
    </Layout>
  );
}
