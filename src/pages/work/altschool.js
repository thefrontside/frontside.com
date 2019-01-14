import React from "react";

import Layout from "../../components/layout";
import Hero from "../../components/hero";
import Text from "../../components/text";
import Content from "../../components/content";
import PullQuote from '../../components/pull-quote';
import Testimonial from '../../components/testimonial';

import altschool from "../../img/clients/altschool-logo.svg";
import bengi from "../../../static/img/benji.png";

export default function AltSchoolCaseStudy() {
  return (
    <Layout>
      <Hero
        heading={<Text>AltSchool &amp; Frontside</Text>}
        subheading={<Text>AltSchool adopts an improved process to reduce build times by 40%.</Text>}
      />
      <Content>
        <Text tag="p">
          AltSchool is always looking for ways to improve the effectiveness and
          velocity of its development effort. With their primary web application
          almost 4 years in the making, they wanted a development partner that
          could not only work hand-in-hand with them to deliver stunning new
          features, but identify and clear away the deep-seated infrastructural
          roadblocks that impede the forward progress of developers and wasted
          large sums of time and money every week.
        </Text>
        <img src={altschool} alt="altschool logo" />
        <Text tag="p">
          Education in many classrooms looks looks almost identical to 100 years
          ago. AltSchool is on a mission to change that. Their goal is to enable
          all children to reach their potential through learner-centric
          environments that prepare them for the future.
        </Text>
        <Text tag="p">
          AltSchool is a partnership between educators, entrepreneurs, and
          engineers who are driven to deliver whole-child, personalized
          learning. They're working together to build a comprehensive platform
          to personalize learning in schools, with the goal of making the best
          education the most accessible. They started by opening our own
          schools. Now, partner schools can join the AltSchool network and
          leverage AltSchool’s technology and services platform.
        </Text>
        <Text tag="p">
          Check them out here:{" "}
          <a href="https://www.altschool.com/">https://www.altschool.com/</a>
        </Text>
        <Text tag="p">
          And here:{" "}
          <a href="https://www.altschool.com/lab-schools/approach#personalized">
            https://www.altschool.com/lab-schools/approach#personalized
          </a>
        </Text>

        <PullQuote>
          To work mindfully is to observe a system as you build it. Armed with
          knowledge gained in this way, you can pinpoint systemic problems and
          re-orient your efforts around them to deliver maximum impact.
        </PullQuote>

        <Text tag="p">
          We first began helping AltSchool with their feature work; reworking
          legacy code as we went along. Among other things, we tackled the
          unique UI problems of constructing re-usable and <i>well-tested</i>{" "}
          file upload components that could be shared between their web and
          native application.
        </Text>
        <Text tag="p">
          The work was challenging, but once they realized that we could help
          with so much more, they asked us to re-focus our charter to the
          purpose of attacking core infrastructure problems by bringing to bear
          our distinctive expertise in UI engineering.
        </Text>

        <Testimonial
          portrait={bengi}
          name="Benji Shine, Staff Front-end Engineer, AltSchool"
        >
          The Frontside developers have an incredibly high level of technical
          expertise. They've built complex plug-ins from scratch, massively
          improved our testing infrastructure, and contributed to critical-path
          product initiatives. When I pair programming with Frontside developers
          they simultaneously show me how to use software they've built, and
          help me adopt new ways of thinking. Their code is well-tested and
          documented, which has raised the bar for our team around testing and
          documentation. I consider them educators as much as individual
          contributors, because they can communicate so clearly about their
          ideas, and they have deep skill.
        </Testimonial>

        <PullQuote>
          With deep thinking about AltSchool’s challenges, Frontside improved
          the testing infrastructure and reduced build times by 40%.
        </PullQuote>

        <Text tag="p">
          So now when AltSchool thinks about Frontside, they think about a team
          that can see the big picture of both their business <i>and</i> their
          codebase and make the changes necessary to help them run smoothly both
          now and in the future. For AltSchool, that investment has paid
          repeated dividends in the form of better developers, better
          development, and real savings each every week.
        </Text>
      </Content>
    </Layout>
  );
}
