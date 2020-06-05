import React from 'react';
import Layout from '../../components/layout';
import Hero from '../../components/hero';
import Content from '../../components/content';
import Text from '../../components/text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faComment } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'gatsby';

import illya from '../../img/illya-busigin.jpg';
import benji from '../../img/benji-shine.jpg';
import jason from '../../img/jason-jaynes.jpg';

import logoHoneywell from '../../img/clients/honeywell-logo.svg';
import logoDell from '../../img/clients/dell-logo.svg';
import logoConde from '../../img/clients/conde-nast-logo.svg';
import logoEbsco from '../../img/clients/ebsco-logo.svg';
import logoSxsw from '../../img/clients/sxsw-logo.svg';
import logoStandard from '../../img/clients/standard-chartered-logo.svg';

import './index.css';

export default function Services() {
  return (
    <Layout title="Services">
      <Hero
        heading={
          <Text>
            We bring deep expertise in engineering to realize your teams' full
            potential.
          </Text>
        }
      />

      <Content>
        <Text tag="p">
          We help organizations architect and implement long lasting platforms
          at scale. Our leadership will provide you with a robust toolkit and
          optimized workflow so your teams can deliver features with confidence.
        </Text>

        <div className="service-thumb service-thumb__consulting">
          <div className="service-thumb--content">
            <h2>Development Parallelization</h2>
            <p>
              Maximize your teams' velocity by enabling them to work in
              parallel. We specialize in keeping your teams unblocked from each
              other through contract management, simulation, and automated
              visibility.
            </p>
          </div>
        </div>

        <div className="service-thumb service-thumb__coaching">
          <div className="service-thumb--content">
            <h2>Inter-team Collaboration</h2>
            <p>
              We help your teams across cities—or continents—and departments to
              collaborate as they co-develop business value in your
              applications. Through custom-tailored tools and processes around
              your codebase, we allow you to keep real track of expectations and
              progress across Engineering, Product, UX, and Leadership.
            </p>
          </div>
        </div>

        <div className="service-thumb service-thumb__architecture">
          <div className="service-thumb--content">
            <h2>Architecture for new technologies</h2>
            <p>
              Do not compromise in quality or software durability when choosing
              cutting-edge technologies. We help you architect your software to
              minimize risk and empower your team for experimentation.
            </p>
          </div>
        </div>

        <div className="service-thumb service-thumb__staffing">
          <div className="service-thumb--content">
            <h2>Elite Staffing</h2>
            <p>
              We help you identify which parts of your software are best suited
              to be built by specialized engineers in intricate fields. We
              facilitate collaboration with the best engineers from around the
              world for the tasks you need.
            </p>
          </div>
        </div>

        <div className="service-thumb service-thumb__experience">
          <div className="service-thumb--content">
            <h2>Development Experience</h2>
            <p>
              We help you make sure your engineers stay motivated and productive
              by perfecting their tools and processes. A great developer
              experience will help you retain talented engineers, onboard new
              hires and contractors, and get more results faster.
            </p>
          </div>
        </div>
      </Content>

      <Content>
        <h2 className="frontside-separator">
          <span className="frontside-separator--text">The Frontside way</span>
        </h2>

        <p className="our-way--intro-parragraph">
          We make your projects predictable with tried‑and‑true processes.
        </p>

        <div className="our-way--row">
          <div className="our-way--pilar">
            <h3>Framework agnostic approach</h3>
            <p>
              Every framework has its best use cases and its limitations. With
              deep experience in frameworks such as Ember, Angular, React, and
              Vue, we can help you identify the right solution for your
              organization’s specific goals.
            </p>
            <h3>Automated Testing</h3>
            <p>
              Every project begins with a comprehensive test plan so we can
              automate the testing process. This greatly reduces the load on QA
              and eliminates feedback cycles between them and your development
              team. It’s common for our clients to see a 4x increase in the
              number of releases that they can do in a month.
            </p>
          </div>
          <aside>
            <blockquote className="our-way--quote">
              <p>
                We had engineers with no previous web development or frontend
                experience, and, at the end of our engagement, those engineers
                were fully capable of taking over from where Frontside left us
                and moving the product forward.
              </p>
              <footer className="our-way--quote-footer">
                <img src={illya} alt="Ilya Busigin" />
                <div>
                  <strong>Ilya Busigin</strong>
                  <br />
                  CEO at iNGAGED.
                </div>
              </footer>
            </blockquote>
          </aside>
        </div>

        <div className="our-way--row our-way--row__alt">
          <div className="our-way--pilar">
            <h3>Automated deployment</h3>
            <p>
              Because everything is run through test suites and bugs are caught
              before they exist, you’ll be able to write, integrate, and deploy
              software continuously. That means no more resource-intensive
              release events. We’ll help you implement this system across your
              department so you can release safely and efficiently throughout
              all future projects.
            </p>
            <h3>Zero regressions—really</h3>
            <p>
              Sure, it sounds radical. But we’ve been able to do it again and
              again. Our process helps you deploy products that are bug‑free,
              guaranteed.
            </p>
          </div>
          <aside>
            <blockquote className="our-way--quote">
              <p>
                They introduced us to a new way of thinking about and working
                with our forms, which is a core part of our application. We’ve
                adopted that philosophy across the board. The quality of their
                work was far higher than what we’ve seen before. They intensely
                tested their work, and their tech support was fantastic.
              </p>
              <footer className="our-way--quote-footer">
                <img src={benji} alt="Benjamin Shine" />
                <div>
                  <strong>Benjamin Shine</strong>
                  <br />
                  Staff Front-end Engineer, AltSchool
                </div>
              </footer>
            </blockquote>
          </aside>
        </div>

        <div className="cta-box">
          <header className="cta-box--header">
            <h2>
              <Link to="/contact">Let's talk</Link>
            </h2>
            <FontAwesomeIcon icon={faComment} />
          </header>
          <div className="cta-box--body">
            <p>
              Reach out today to learn how we can help your organization move
              faster, without compromising quality.
            </p>
            <Link className="cta-box--contact" to="/contact">
              Contact us <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>
      </Content>

      <Content>
        <h2 className="frontside-separator">
          <span className="frontside-separator--text">Success stories</span>
        </h2>

        <div className="success-stories">
          <div className="success-stories--content">
            <p>
              We have collaborated with well established clients to help their
              teams move with confidence.
            </p>
            <ul className="success-stories--logos">
              <li className="success-stories--logo">
                <img src={logoHoneywell} alt="Honeywell logo" />
              </li>
              <li className="success-stories--logo">
                <img src={logoConde} alt="Conde Nast logo" />
              </li>
              <li className="success-stories--logo">
                <img src={logoEbsco} alt="EBSCO logo" />
              </li>
              <li className="success-stories--logo">
                <img src={logoSxsw} alt="SXSW logo" />
              </li>
              <li className="success-stories--logo">
                <img src={logoStandard} alt="Standard Chartered Bank logo" />
              </li>
              <li className="success-stories--logo success-stories--logo__square">
                <img src={logoDell} alt="Dell logo" />
              </li>
            </ul>
          </div>
          <aside>
            <blockquote className="our-way--quote">
              <p>
                Everything was well documented, well tested and followed the
                well-known conventions for working with JavaScript. It was
                evident they were interested in giving us a software base that
                we could evolve on our own.
              </p>
              <footer className="our-way--quote-footer">
                <img src={jason} alt="Jason Jaynes" />
                <div>
                  <strong>Jason Jaynes</strong>
                  <br />
                  CTO at Kasita.
                </div>
              </footer>
            </blockquote>
          </aside>
        </div>
      </Content>
    </Layout>
  );
}
