import React from "react";
import Layout from "../../components/layout";
import Hero from "../../components/hero";
import Content from "../../components/content";
import Text from "../../components/text";
import Box from "../../components/box";
import Testimonials from "../../components/testimonials";
import Button, { ButtonGroup } from "../../components/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import illya from "../../img/illya-busigin.jpg";
import benji from "../../img/benji-shine.jpg";
import jason from "../../img/jason-jaynes.jpg";

import './index.css';

export default function Services() {
  return (
    <Layout>
      <Hero
        heading={
          <Text>
           We bring deep expertise in application platforms to ensure your projects run smoothly.
          </Text>
        }
      />

      <Content>
        <Text tag="p">
        We help organizations architect and implement long lasting platforms at scale. Our leadership will provide you with a robust toolkit and optimized workflow so your teams can deliver features with confidence.
        </Text>
      </Content>

      <Content>
        <div class="service-thumb service-thumb__consulting">
          <div class="service-thumb--content">
            <h2>
              Frontend web application consulting
            </h2>
            <p>
              We’ve built the huge applications, and we know how open source projects operate at scale.
            </p>
            <p class="service-thumb--cta">
              We’ll give you full visibility on what to look out for in every step of your project to ensure implementation goes smoothly.
              <a href="/">Let’s build with confidence <FontAwesomeIcon icon={faArrowRight} /></a>
            </p>
          </div>
        </div>

        <div class="service-thumb service-thumb__platform">
          <div class="service-thumb--content">
            <h2>
              Platform profiling
            </h2>
            <p>
              We’ll do an in-depth assessment of the frameworks you’re considering to give you an advance on what to expect with your current architecture.
            </p>
            <p class="service-thumb--cta">
              You’ll get a comprehensive report on 12 key considerations along with practical steps to improve your platform’s architecture
              <a href="/">Let’s plan ahead <FontAwesomeIcon icon={faArrowRight} /></a>
            </p>
          </div>
        </div>

        <div class="service-thumb service-thumb__coaching">
          <div class="service-thumb--content">
            <h2>
              Software team coaching
            </h2>
            <p>
              We are ruthlessly committed to collaborative consulting—training up engineers through pair programming and communicating the details behind every decision.
            </p>
            <p class="service-thumb--cta">
              By the end of our engagement, your team will be well equipped to continue building upon your platform for years to come.
              <a href="/">Level up your team <FontAwesomeIcon icon={faArrowRight} /></a>
            </p>
          </div>
        </div>

        <div class="service-thumb service-thumb__testing">
          <div class="service-thumb--content">
            <h2>
              Peace-of-mind testing
            </h2>
            <p>
              Well implemented testing can drastically improve your team’s performance by helping developers make smart coding choices to begin with and reducing the load on QA.
            </p>
            <p class="service-thumb--cta">
              Your team will learn how to make testing a normal and pain-free part of your company culture, write effective, long-lasting tests quickly and release code that’s resilient and on spec.
              <a href="/">Let’s test together <FontAwesomeIcon icon={faArrowRight} /></a>
            </p>
          </div>
        </div>

        <Box direction="column">
          <Box marginBottom="double">
            <Text tag="h2">Build a better platform for your applications</Text>
            <Text tag="p">Here’s how we can help your organization</Text>
          </Box>
          <Box marginBottom="double">
            <Text tag="h3">Frontend web application consulting</Text>
            <Text tag="p">
              Too often, teams with limited frontend experience make costly
              mistakes. Documentation for your open source tools can only go so far.
              At some point, you need support from someone’s who dealt with these
              tools firsthand.
            </Text>
            <Text tag="p">
              Let us bridge the knowledge gap. We’ve built the huge applications,
              and we know how these open source projects operate at scale. We’ll
              give you full visibility on what to look out for in every step of your
              project to ensure implementation goes smoothly.
            </Text>
          </Box>
          <Box marginBottom="double">
            <Text tag="h3">The Platform Profile</Text>
            <Text tag="p">
              Planning out your platform, but not sure which options to go with?
              Let’s talk. We’ll do an in-depth assessment of the frameworks you’re
              considering to give you an advance alert on potential problems or bugs
              you can expect with your current architecture.
            </Text>
            <Text tag="p">
              At the end, you’ll get a comprehensive report on 12 key considerations
              along with practical steps to improve your platform’s architecture.
            </Text>
          </Box>
          <Box>
            <Text tag="h3">Software team coaching</Text>
            <Text tag="p">
              By the end of our engagement, your team will be well equipped to
              continue building upon your platform for years to come. This is
              because we are ruthlessly committed to collaborative
              consulting—training up engineers through pair programming and
              communicating the details behind every decision.
            </Text>
            <Text tag="p" widows={3}>
              For us, knowledge transfer isn’t the last stage of a project. It’s
              built in every step of the way.
            </Text>
          </Box>
        </Box>
      </Content>

      <Content>
        <Text tag="h2" widows={3}>
          What some of our clients are saying
        </Text>
        <Testimonials
          testimonials={[
            {
              img: illya,
              author: 'Ilya Busigin | iNGAGED',
              quote: (
                <Text tag="p">
                  We had engineers with no previous web development or
                  frontend experience, and, at the end of our
                  engagement, those engineers were fully capable of
                  taking over from where Frontside left us and moving
                  the product forward.
                </Text>
              )
            },
            {
              img: benji,
              author: 'Benjamin Shine | AltSchool',
              quote: (
                <Text tag="p">
                  They introduced us to a new way of thinking about
                  and working with our forms, which is a core part of
                  our application. We’ve adopted that philosophy
                  across the board. They suggested using an immutable
                  state in Ember, which turned out well. The quality
                  of their work was far higher than what we’ve seen
                  before. They intensely tested their work, and their
                  tech support was fantastic.
                </Text>
              )
            },
            {
              img: jason,
              author: 'Jason Jaynes | Kasita',
              quote: (
                <Text tag="p">
                  Everything was well documented, well tested and
                  followed the well-known conventions for working with
                  JavaScript. It was evident they were interested in
                  giving us a software base that we could evolve on
                  our own.
                </Text>
              )
            }
          ]}
        />
      </Content>

      <Content>
        <Box direction="column">
          <Box marginBottom="double">
            <Text tag="h2">
              We make your projects predictable with tried-and-true processes
            </Text>
            <Text tag="p">
              These methods are the foundation of our clients’ success:
            </Text>
          </Box>
          <Box marginBottom="double">
            <Text tag="h3">Framework agnostic approach</Text>
            <Text tag="p">
              Every framework has its best use cases and its limitations. With deep
              experience in frameworks such as Ember, Angular, React, and Vue, we
              can help you identify the right solution for your organization’s
              specific goals.
            </Text>
          </Box>
          <Box marginBottom="double">
            <Text tag="h3">Automated testing</Text>
            <Text tag="p">
              Every project begins with a comprehensive test plan so we can automate
              the testing process. This greatly reduces the load on QA and
              eliminates feedback cycles between them and your development team.
              It’s common for our clients to see a 4x increase in the number of
              releases that they can do in a month.
            </Text>
          </Box>
          <Box marginBottom="double">
            <Text tag="h3">Automated deployment</Text>
            <Text tag="p">
              Because everything is run through test suites and bugs are caught
              before they exist, you’ll be able to write, integrate, and deploy
              software continuously. That means no more resource-intensive release
              events. We’ll help you implement this system across your department so
              you can release safely and efficiently throughout all future projects.
            </Text>
          </Box>
          <Box>
            <Text tag="h3">Zero regressions—really.</Text>
            <Text tag="p">
              Sure, it sounds radical. But we’ve been able to do it again and again.
              Our process helps you deploy products that are bug-free, guaranteed.
            </Text>
          </Box>
        </Box>
      </Content>

      <Content>
        <Text tag="h2">Get ready to lead the best projects of your life</Text>
        <Text tag="p">
          Reach out today to learn how we can help your organization move
          faster, without compromising quality
        </Text>
        <ButtonGroup>
          <Button to="/contact">Get in touch</Button>
        </ButtonGroup>
      </Content>
    </Layout>
  );
}
