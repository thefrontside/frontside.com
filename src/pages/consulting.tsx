import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import BlogPreview from '../components/blog-preview';
import { Tabs, Tab } from '../components/tabs/tabs';

import {
  pageWrap,
  heroWrap,
  heroText,
  heroImage,
  featureRow,
  featureText,
  featureTextAlternate,
  featureImage,
  sectionHeader,
  entryColumns,
  entryColumn,
  homeBottomCTA,
  homeBottomCTAtext,
  homeTopCTA,
  consultingCycleContainer,
  consultingCycleIllustration,
  consultingCycleFirst,
  consultingCycleSecond,
  consultingCycleThird,
  consultingTab,
  consultingTabImage,
} from '../styles/page.css';
import {
  textGradientPinkSkyblue,
  heading3Xl,
  textLg,
  featureHeading,
  textSkyblue,
  headingXl,
  bigQuote,
  bigQuoteAuthor,
  textXl,
  text3Xl,
  textGradientDemiSkybluePink,
  arrowTextWhite,
  indentLine,
  headingLg,
  mardownColumn,
} from '../styles/typography.css';
import { actionButton } from '../styles/buttons.css';

import dxHero from '../img/q3-2021/dx-hero.png';
import dxProblems from '../img/q3-2021/dx-problems.png';
import dxFrustration from '../img/q3-2021/dx-frustration.png';
import dxTools from '../img/q3-2021/dx-tools.png';
import dxCycle from '../img/q3-2021/dx-cycle.png';
import dxDecoupled from '../img/q3-2021/dx-decoupled.png';
import dxLocalDev from '../img/q3-2021/dx-local-dev.png';
import dxTesting from '../img/q3-2021/dx-shift-left-testing.png';

export default function ConsultingPage({
  data: {
    allBlogPost: { edges: posts },
  },
}) {
  const simplifiedPosts = posts.map(({ node }) => ({
    id: node.id,
    slug: node.slug,
    title: node.title,
    date: node.markdown.frontmatter.date,
    description: node.markdown.frontmatter.description,
    authors: node.authorNodes.map((author) => ({
      slug: author.slug,
      name: author.name,
    })),
    image:
      node.markdown.frontmatter.img == null
        ? null
        : node.markdown.frontmatter.img.childImageSharp.fixed.src,
  }));

  return (
    <Layout title="DX Consulting for Cloud native teams">
      <header className={heroWrap}>
        <div className={heroText}>
          <h1 className={heading3Xl}>
            <span className={textGradientPinkSkyblue}>Developer</span>
            <br />
            <span className={textGradientPinkSkyblue}>Experience: </span>
            where deliveries and retention meet
          </h1>
          <p className={textLg}>
            Frontside helps Cloud native orgs create Developer Experiences that
            bring productivity and joy to their teams
          </p>
        </div>
        <div className={heroImage}>
          <img src={dxHero} alt="" />
        </div>
      </header>

      <section className={pageWrap}>
        <blockquote className={bigQuote}>
          “Frontside has an unwavering commitment to Developer Experience and
          quality. They make sure everything we do is repeatable and scalable.”
        </blockquote>
        <p className={bigQuoteAuthor}>
          &mdash; Brian Beale, Director of Software Engineering at Resideo{' '}
          <br />
        </p>
        <p className={homeTopCTA}>
          <Link to="/" className={actionButton}>
            <strong className={arrowTextWhite}>Request a DX assesment</strong>
          </Link>
        </p>
        <div className={featureRow}>
          <div className={featureTextAlternate}>
            <h2 className={featureHeading}>
              Developers' problems are{' '}
              <span className={textSkyblue}>business problems</span>
            </h2>
            <p>
              There’s a clear path from engineers complaining about being
              blocked or stuck to managers concerned about burnout rates to
              leadership worried about deadlines being continuously pushed back.
              <br />
              <span className={indentLine} />
              Frontside implements strategies that allow developers to work
              decoupled from external dependencies—including other teams—to keep
              shipping smoothly.
            </p>
          </div>
          <div className={featureImage}>
            <img src={dxProblems} alt="" />
          </div>
        </div>

        <div className={featureRow}>
          <div className={featureText}>
            <h2 className={featureHeading}>
              Engineers have <span className={textSkyblue}>less patience</span>{' '}
              for a frustrating job
            </h2>
            <p>
              The tech industry is witnessing record salaries for engineers,
              along with the highest rate of people quitting their job.
              Developers get frustrated when they stumble upon obstacles in
              their workflow and start considering new options—outside your
              company.
              <br />
              <span className={indentLine} />
              Frontside takes a proactive approach to discovering pain points in
              the development process and areas of improvement now and in the
              long term.
            </p>
          </div>
          <div className={featureImage}>
            <img src={dxFrustration} alt="" />
          </div>
        </div>

        <div className={featureRow}>
          <div className={featureTextAlternate}>
            <h2 className={featureHeading}>
              Sharp engineers need{' '}
              <span className={textSkyblue}>sharp tools</span>
            </h2>
            <p>
              Your team is incredibly talented, but a faulty developer
              experience often bogs it down. Dealing with flimsy CI/CD
              integrations or antiquated patterns makes development feel like
              bureaucracy rather than a creative endeavor.
              <br />
              <span className={indentLine} />
              Frontside helps you transform your development workflow into an
              inspiring process for your developers.
            </p>
          </div>
          <div className={featureImage}>
            <img src={dxTools} alt="" />
          </div>
        </div>
      </section>

      <section className={pageWrap}>
        <Tabs title="Ship faster &amp; happier: ">
          <Tab label="Decoupled Teams">
            <div className={consultingTab}>
              <div>
                <h3 className={textXl}>Decoupled teams &rarr; happier teams</h3>
                <p>
                  The obstacles preventing developers from feeling productive
                  are sometimes outside your control. For instance, your
                  engineers may be blocked while another team rushes to finish a
                  backend service. Or, an external API is unavailable due to an
                  upgrade. When your developers are tied to too many external
                  factors, their success becomes fragile.
                </p>

                <p>
                  Frontside helps your team implement decoupling strategies via
                  simulation and future-forward architecture advice so your
                  developers can continue working despite external dependencies.
                </p>
              </div>
              <div className={consultingTabImage}>
                <img src={dxDecoupled} alt="" />
              </div>
            </div>
          </Tab>
          <Tab label="Local Development">
            <div className={consultingTab}>
              <div>
                <h3 className={textXl}>
                  Reliable local setup = sound production release
                </h3>
                <p>
                  Cloud native teams rely on a growing set of Cloud vendors for
                  crucial workflows such as authentication. However, these
                  services come with compromises in the local development
                  experience, like integration blind spots that lead to bugs
                  leaking further in the cycle. There are also security and
                  compliance risks from using valid tokens from the Cloud
                  service in development.
                </p>
                <p>
                  Frontside helps teams create a local development environment
                  that matches production faithfully without sensitive data and
                  facilitates onboarding new colleagues.
                </p>
              </div>
              <div className={consultingTabImage}>
                <img src={dxLocalDev} alt="" />
              </div>
            </div>
          </Tab>
          <Tab label="Shift-left testing">
            <div className={consultingTab}>
              <div>
                <h3 className={textXl}>
                  Simplified testing &rarr; shorter feedback loops{' '}
                </h3>
                <p>
                  It is only possible to release multiple times a week, or a
                  day, if you have a robust testing strategy. However, testing
                  is usually a frustrating aspect of the development cycle
                  because it is often slow and unreliable. Furthermore, test
                  data management can be burdensome as it gets outdated quickly
                  if not managed correctly.
                </p>
                <p>
                  Frontside helps teams structure their testing strategy by
                  making it easier for developers to write and maintain
                  meaningful tests that reduce QA workload and minimize feedback
                  loops.
                </p>
              </div>
              <div className={consultingTabImage}>
                <img src={dxTesting} alt="" />
              </div>
            </div>
          </Tab>
        </Tabs>
      </section>

      <section className={pageWrap}>
        <header className={sectionHeader}>
          <h2 className={text3Xl}>The whole development cycle is important</h2>
          <p className={textLg}>
            You have to optimize every part of the development process if you
            want to have happy developers. They want to ship, but if the process
            is slow, convoluted, time consuming, engineers get frustrated.
          </p>
        </header>
        <div className={consultingCycleContainer}>
          <div className={consultingCycleFirst}>
            <h3 className={headingLg}>Development</h3>
            <p>
              How long does it take from the moment a person joins the team
              until they submit their first PR?
            </p>
          </div>
          <div className={consultingCycleSecond}>
            <h3 className={headingLg}>Verification</h3>
            <p>
              Do your developers write integration tests? Can developers
              refactor the application without inadvertently breaking QA tests?
            </p>
          </div>
          <div className={consultingCycleThird}>
            <h3 className={headingLg}>Release</h3>
            <p>
              Can you release twice per day? Is the release plan generated or
              crafted by a human?{' '}
            </p>
          </div>
          <div className={consultingCycleIllustration}>
            <img src={dxCycle} alt="" />
          </div>
        </div>
        <div className={homeBottomCTA}>
          <p className={homeBottomCTAtext}>
            Make your developers happier and more productive
          </p>
          <Link to="/" className={actionButton}>
            <strong className={arrowTextWhite}>Request a DX assesment</strong>
          </Link>
        </div>
      </section>

      <section className={pageWrap}>
        <header className={sectionHeader}>
          <h2 className={headingXl}>
            Latest <strong className={textGradientDemiSkybluePink}>DX</strong>{' '}
            insights
          </h2>
        </header>

        <div className={entryColumns}>
          {simplifiedPosts.map((post, i) => (
            <div className={entryColumn} key={i}>
              <BlogPreview post={post} />
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

ConsultingPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export const consultingPageQuery = graphql`
  query ConsultingQuery {
    allBlogPost(
      sort: { order: DESC, fields: [markdown___frontmatter___date] }
      filter: { markdown: { frontmatter: { tags: { in: "dx" } } } }
      limit: 3
    ) {
      edges {
        node {
          id
          title
          slug
          markdown {
            excerpt(pruneLength: 400)
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              description
              img {
                childImageSharp {
                  fixed(width: 600) {
                    src
                  }
                }
              }
            }
          }
          authorNodes {
            name
            slug
          }
        }
      }
    }
  }
`;
