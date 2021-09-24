import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { PopupButton } from '@typeform/embed-react';
import Plausible from 'plausible-tracker';

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
  consultingCycleContainer,
  consultingCycleIllustration,
  consultingCycleFirst,
  consultingCycleSecond,
  consultingCycleThird,
  consultingTab,
  consultingTabImage,
  consultingTopTCA,
  ctaSubmittedBox,
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
  headingLg,
  textSm,
  textGradientPurpleSkyblue,
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

function ConsultingCTA({ submitted, setSubmitted }) {
  let questionsTrack = 'dx0';
  const { trackEvent } = Plausible({
    domain: 'frontside.com',
  });

  const onSubmit = () => {
    document.body.style.overflow = '';
    setSubmitted(true);
    trackEvent('cta-dx', {
      props: {
        status: 'submitted',
        qt: questionsTrack,
      },
    });
  };

  const onOpenedForm = () => {
    trackEvent('cta-consulting', {
      props: {
        status: 'active',
        qt: questionsTrack,
      },
    });
  };

  const onQuestionChange = ({ ref }) => {
    questionsTrack = `${questionsTrack}->${ref.slice(0, 4)}`;
    trackEvent('cta-dx', {
      props: {
        status: 'active',
        qt: questionsTrack,
      },
    });
  };

  const onClose = () => {
    trackEvent('cta-dx', {
      props: {
        status: 'closed',
        qt: questionsTrack,
      },
    });
  };

  return (
    <>
      {!submitted ? (
        <PopupButton
          id="n5Hz8E9N"
          hidden={{ topic: 'dx' }}
          className={actionButton}
          onSubmit={onSubmit}
          onReady={onOpenedForm}
          onQuestionChanged={onQuestionChange}
          onClose={onClose}
        >
          <strong className={arrowTextWhite}>Request a DX assessment</strong>
        </PopupButton>
      ) : (
        <p className={ctaSubmittedBox}>
          <strong className={textGradientPurpleSkyblue}>
            Thanks for reaching out!
          </strong>
          <br />
          <span className={textSm}>
            We'll get back to you within a business day.
          </span>
        </p>
      )}
    </>
  );
}

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

  const [submitted, setSubmitted] = useState(false);

  return (
    <Layout title="DX Consulting for Cloud native teams">
      <header className={heroWrap}>
        <div className={heroText}>
          <h1 className={heading3Xl}>
            <span className={textGradientPinkSkyblue}>Developer</span>
            <br />
            <span className={textGradientPinkSkyblue}>Experience: </span> where
            deliveries and retention meet
          </h1>
          <p className={textLg}>
            Frontside helps Cloud native orgs create Developer Experiences that
            put the joy back in productivity
          </p>
          <p className={consultingTopTCA}>
            <ConsultingCTA submitted={submitted} setSubmitted={setSubmitted} />
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

        <div className={featureRow}>
          <div className={featureTextAlternate}>
            <h2 className={featureHeading}>
              Developers' problems are{' '}
              <span className={textSkyblue}>business problems</span>
            </h2>
            <p>
              There’s a clear path from engineers complaining about being
              blocked to managers concerned about burnout rates to leadership
              worried about deadlines being continuously pushed back. Frontside
              implements strategies that allow developers to decouple their work
              from external dependencies to keep shipping smoothly.
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
              Developers don’t just get frustrated when they stumble upon
              obstacles in their workflow—they leave to find new opportunities
              that allow them to rediscover the joy of coding. Frontside takes a
              proactive approach to discovering pain points in the development
              process to ensure firms retain their talent and deliver on time.
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
              Dealing with flimsy CI/CD integrations or antiquated patterns
              makes development feel like navigating a bureaucracy rather than a
              creative endeavor. Frontside helps firms transform their
              development workflow into an inspiring process for developers and
              management alike.
            </p>
          </div>
          <div className={featureImage}>
            <img src={dxTools} alt="" />
          </div>
        </div>

        <Tabs title="Ship faster &amp; happier: ">
          <Tab label="Decoupled Teams">
            <div className={consultingTab}>
              <div>
                <h3 className={textXl}>Decoupled teams &rarr; happier teams</h3>
                <p>
                  The obstacles preventing developers from feeling productive
                  can appear outside of your control. Typical development
                  processes can lead to engineers being blocked while another
                  team rushes to finish a backend service or waiting for an
                  external API to get upgraded. Frontside helps your team
                  implement decoupling strategies via simulation and
                  future-forward architecture advice so your developers can
                  continue working despite external dependencies.
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
                  The success of Cloud native teams can feel increasingly
                  fragile when they depend on Cloud vendors for crucial
                  workflows such as authentication. These services oftentimes
                  lead to frustrations in the development experience like
                  integration blind spots or security and compliance risks when
                  using Cloud service tokens. Frontside helps teams create a
                  local development environment that matches production
                  faithfully without exposing sensitive data.
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
                  Frustration with testing in the development cycle seems
                  inevitable because too often tests are slow and unreliable. At
                  the same time test data management can be burdensome and
                  quickly become outdated if not managed correctly. Frontside
                  helps teams structure a robust testing strategy by making it
                  easier for developers to write and maintain meaningful tests
                  that reduce QA workload and minimize feedback loops.
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
            Optimizing every part of the development process is crucial if you
            want happy and productive developers. Engineers quickly get
            frustrated and releases don’t ship if any part of the development
            process is slow or convoluted.
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
            Are developers afraid of inadvertently breaking tests? Are dev teams and QA stepping on each other toes?
            </p>
          </div>
          <div className={consultingCycleThird}>
            <h3 className={headingLg}>Release</h3>
            <p>
            How much effort does it take your team to make a release? Can they release multiple times a day?
            </p>
          </div>
          <div className={consultingCycleIllustration}>
            <img src={dxCycle} alt="" />
          </div>
        </div>
        <div className={homeBottomCTA}>
          <ConsultingCTA submitted={submitted} setSubmitted={setSubmitted} />
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
