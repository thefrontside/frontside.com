import React from "react";

import Layout from "../../components/layout";
import Hero from "../../components/hero";
import Text from "../../components/text";
import Content from "../../components/content";
import PullQuote from "../../components/pull-quote";

import logo from "../../img/clients/kasita-logo.svg";
// import mike from "../../img/mike-wiles.jpg";
import kasita from "../../../static/img/kasita.jpg";
import tempScreen from "../../../static/img/kasita-temp-screen.jpg";
import multipleDevices from "../../../static/img/kasita-multi-device.jpg";
import customIcons from "../../../static/img/kasita-custom-icons.jpg";

export default function KasitaCaseStudy() {
  return (
    <Layout>
      <Hero
        heading={<Text>Kasita &amp; Frontside</Text>}
        subheading={
          <Text>Unifying Connected Devices Under A Single Platform</Text>
        }
      />
      <img src={logo} alt="kasita company logo" />
      <Content>
        <Text tag="p">
          In the US, the average size of a new single family home in 1978 was
          1,780 square and by 2013 it had grown to 2,662 square feet by 2013;
          this trend of bigger houses was supported by growth in wealth and
          interest in material things.
        </Text>
        <Text tag="p">
          The tiny house trend emerged as response to this growth, providing an
          alternative that focused more on affordability and simplicity in
          lifestyle.
        </Text>
        <Text tag="p">
          <a href="https://www.cnbc.com/2017/03/12/kasitas-jeff-wilson-who-lived-in-dumpster-to-fix-homeownership-issue.html">
            Dr. Jeff Wilson, a.k.a. Professor Dumpster
          </a>
          , found a way to inspire change in the housing market by redefining
          the tiny home movement to include an option that could reinvent the
          way people live. Dr. Wilson began his experiment by first living in a
          repurposed 33 square-foot dumpster to challenge conventional thinking
          of what a home can be. for a year by shrinking his footprint and
          developing a turnkey solution for the housing crisis. He discovered
          that Small, Smart and Affordable is doable for housing.
        </Text>
        <p>
          Check them out here:{" "}
          <a href="https://www.kasita.com">https://www.kasita.com/</a>
        </p>
        <PullQuote>
          Kasita has outsized functionality in an undersized footprint. From
          ceiling to floor, every last cubic inch is designed to maximize the
          home dweller&#39;s experience. The result: an exceptional small and
          smart home that contains everything you need and nothing you
          don&#39;t.
        </PullQuote>
      </Content>
      <Content>
        <Text tag="h2">The Project</Text>
        <Text tag="p">
          With over 30 connected smart devices, these beautifully designed tiny
          homes needed a single mobile control application for Android and iOS
          that matched the aesthetic and promise of Kasita itself.
        </Text>
        <Text tag="p">
          Kasita, in partnership with The Frontside, worked through the design
          and UX and tasked The Frontside to build out the application and
          experience.
        </Text>
        <Text tag="p">
          A key challenge for the project was to bring an MVP to market within 6
          weeks.
        </Text>
        <Text tag="p">
          Jason Jaynes, Head of Technology at Kasita, said the choice to go with
          Frontside became very clear after just a couple conversations.
          Timeline was one consideration, but technical expertise and fit was
          also at the top of the list.
        </Text>
        <Text tag="p">
          Kasita also had the challenge of a very tight timeline and a back end
          that wasn’t fully built.
        </Text>
        <Text tag="p">
          With these challenges in mind, and given the time crunch and budgetary
          requirements, Frontside suggested a different mix of technology: a
          responsive web app written in Ember with the flexibility to be
          converted into an application written in React Native.
        </Text>
        <Text tag="p">
          Most MVP launch dates come and go with nothing to show, but with
          Frontside working quickly yet thoughtfully, Kasita&#39;s initial
          mobile control application shipped on time and under budget.
        </Text>
        <Text tag="p">
          Striking the proper balance between speed to market and the quality
          that enables long-term success is something Frontside never leaves to
          chance.
        </Text>
      </Content>
      <img src={kasita} alt="rendering of a kasita" />
      <Content>
        <Text tag="h2">Designed for Usability</Text>
        <Text tag="p">
          Although completing an app on-time and under budget is notable, the
          real proof of success is with the user, which is why we made sure that
          the application’s UX matched the UX of the home. Smart. Simple.
          Elegant.
        </Text>
        <Text tag="p">
          We thought a lot about how to avoid the lag time with Temperature
          controls.
        </Text>
        <Text tag="p">
          Frontside developer{" "}
          <a href="/about/jeffrey-cherewaty">Jeffrey Cherewaty</a> said,
          &ldquo;Many interfaces for controlling Internet of Things devices
          either lack indicators that desired actions are taking place, or they
          completely block the user from doing anything else while the action
          takes place. So, Frontside developer{" "}
          <a href="/about/elrick-ryan">Elrick Ryan</a> designed a climate
          control screen that elegantly fixes both those problems - the
          temperature pulses when communication is happening between the HVAC
          system and the server, but the user can still perform other tasks
          while their changes apply.&rdquo;
        </Text>
        <Text tag="p">
          Elrick said &ldquo;making sure that users do not feel lost and
          uninformed while using an application is paramount. A combination of
          icons, colors, and animations can help give your user the feedback
          necessary to understand what is happening while using an
          application.&rdquo;
        </Text>
      </Content>
      <Content>
        <Text tag="h2">The MVP</Text>
        <img src={tempScreen} alt="photo of Kasita temperature controls" />
        <Text tag="p">
          Kasita is a smart home and has several smart devices throughout the
          home that the user can manipulate. Rather than having the user click
          in multiple places to make the desired adjustments, Kasita decided to
          offer Moods, which allow a Kasita user to save individual settings for
          each device in the home and activate them all simultaneously with a
          click of a Mood.
        </Text>
        <img
          src={multipleDevices}
          alt="photo of Kasita application running on multiple devices"
        />
        <Text tag="p">
          While taking the idea of Moods and staying focused on simplicity of
          the user experience, we got creative with the Moods and pulled
          inspiration from a concept that many users would be familiar with, a
          &ldquo;playlist&rdquo;, in creating the design. Do you have a
          &ldquo;workout&rdquo; playlist somewhere? Using concepts that users
          can relate to makes new users of an application feel right at home or
          in industry speak makes the application have an intuitive user
          interface.
        </Text>
        <img src={customIcons} alt="photo of Kasita user interface icons" />
        <Text tag="p">
          The Kasita application required constant consideration, critical
          thinking, and imagination to build from the perspective of someone
          living in and controlling a smart and interactive home.
        </Text>
        <Text tag="h3">When&#39;s your move-in date?</Text>
        <Text tag="p">
          To keep up with the latest details on Kasita homes, check out{" "}
          <a href="https://kasita.com/news/">Kasita in the News</a>.
        </Text>
      </Content>
    </Layout>
  );
}
