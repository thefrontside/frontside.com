import React from "react";

import Layout from "../../components/layout";
import Hero from "../../components/hero";
import Text from "../../components/text";
import Content from "../../components/content";
import Testimonial from "../../components/testimonial";

import ingaged from "../../img/clients/ingaged-logo.svg";
import mike from "../../img/mike-wiles.jpg";

export default function AltSchoolCaseStudy() {
  return (
    <Layout>
      <Hero
        heading={<Text>iNGAGED &amp; Frontside</Text>}
        subheading={
          <Text>
            iNGAGED’s improved platform helps their customer’s
            intra-departmental communications. By partnering with Frontside,
            they added skills to their own engineering team.
          </Text>
        }
      />
      <Content>
        <img src={ingaged} alt="iNGAGED logo" />
        <Text tag="p">
          iNGAGED Communications platform solves an internal communications
          challenge faced by most large organizations with geographically
          disperse or mobile employees. With a global communications platform,
          iNGAGED enables you to engage with employees wherever they are and
          with any smart device. iNGAGED enables you to segment employee
          populations into groups and send targeted push messages, assign tasks,
          and visual media directly to employees and track engagement of your
          communication campaigns increasing visibility and utilization of your
          corporate resources.
        </Text>
        <Text tag="p">
          With iNGAGED, you can consolidate all of your internal vendors into a
          single platform enabling members to access and receive all of
          information from one location using a single sign on.
        </Text>
        <Text tag="p">
          Streamline communications, increase quality of engagement with your
          employees, and get a better value from your communications strategy.
        </Text>
        <Text tag="h3">
          Being in the right place at the right time pays off.
        </Text>
        <Text tag="p">
          iNGAGED helps HR departments around the world who want to better
          communicate health insurance benefits to their employees. So if
          employees comment that access is clumsy or difficult to use, iNGAGED
          is poised to respond.
        </Text>
        <Text tag="p">
          iNGAGED customers asked for help solving this problem and iNGAGED
          responded with this question. Would it decrease confusion and help
          with adoption and absorption if you were able to send personalized
          messaging with only relevant information to your employees? And would
          HR spend less time putting out fires if employees better understood
          their coverage?
        </Text>
        <Text tag="p">
          The answer: <em>Yes and Yes</em>, please.
        </Text>
        <Text tag="p">
          So iNGAGED teamed up with Frontside and created a strategy for
          enhancing their communications platform with these goals in mind.
        </Text>
        <ul>
          <li>Optimize HR department efficiency</li>
          <li>Reduce noise; lessen overwhelming amount of data</li>
          <li>Align design, product &amp; engineering teams on this project</li>
          <li>Deliver this MVP on time</li>
        </ul>
        <Text tag="p">
          Frontside got to work immediately delivering features in the order of
          highest value first. But we didn’t stop there. Frontside provided
          further value by proceeding thoughtfully; analyzing and distilling
          certain features, and pushing to remove others altogether in order to
          ensure a viable product that remained within the constraints of
          timeline and budget.
        </Text>
        <Text tag="p">
          iNGAGED's engineering team entered the partnership with a robust
          development background on the backend and native devices, but we
          learned that they were hungry to expand their knowledge of JavaScript
          and Web technologies. We conducted frequent pair programming sessions
          with their engineers to clean up code, make it more sustainable, and
          layer in complete test coverage.
        </Text>
      </Content>
      <Testimonial name="Mike Wiles, CTO, iNGAGED" portrait={mike}>
        <Text tag="p">
          In terms of Illya's and my experience with Frontside, it was an
          incredibly positive. We sought out a partner with whom we'd have a
          strong alignment relative to the type of culture we're trying to
          create at iNGAGED as well as the tech chops to help us get the job
          done. Key to our desired culture was establishing a pair programming
          and test driven development environment using continuous integration.
          Given that we were in the infancy stage of our team, it was important
          that the partner we chose could not only participate in our culture
          but help us establish it. Needless to say when we started the partner
          selection process, I worried that we'd have to compromise somewhere in
          those requirements. Luckily for us the the Frontside ultimately met
          every single requirement we were looking for in a partner to help us
          deliver on our platform and meet our aggressive deadlines. Your team
          came in and helped us define high development standards, integrated
          seamlessly into our organization and delivered on every task we
          assigned. It was an absolute pleasure to work with you and your team.
        </Text>
        <Text tag="p">
          Illya and I both hope that the Frontside continues to grow and
          flourish as a provider of high end web experiences, encourage you to
          diversify into mobile and back end technologies and will happily be a
          reference for you and your team if needed.
        </Text>
      </Testimonial>
      <Content>
        <Text tag="h3">A valuable relationship was born.</Text>
        <Text tag="p">
          The Frontside team lead on delivering priority features, week by week,
          month by month, never losing sight of the desired date to go live.
        </Text>
        <Text tag="p">
          Success meant iNGAGED’s MVP was launched on time, within 3 months, and
          paying customers began signing on shortly thereafter. iNGAGED secured
          its place as a leader in the industry with a platform built on a solid
          foundation and a team trained to maintain it.
        </Text>
      </Content>
    </Layout>
  );
}
