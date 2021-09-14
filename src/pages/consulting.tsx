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
} from '../styles/typography.css';
import { actionButton } from '../styles/buttons.css';

import homePlaceholder from '../img/temp/hero_placeholder.png';
import dxHero from '../img/q3-2021/dx-hero.png';
import dxProblems from '../img/q3-2021/dx-problems.png';
import dxFrustration from '../img/q3-2021/dx-frustration.png';
import dxTools from '../img/q3-2021/dx-tools.png';

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
            We help Cloud native teams create cohesive developer experiences to
            make their teams thrive.
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
              There's a clear path from developers complaining about how nobody
              can run an app easily and managers concerned about the burnout
              rates in their team to leadership worried about deadlines being
              continuously pushed back. Frontside implements strategies that
              allows developers decoupled from external dependencies, including
              other teams, so they can keep shipping smoothly.
            </p>
          </div>
          <div className={featureImage}>
            <img src={dxProblems} alt="" />
          </div>
        </div>

        <div className={featureRow}>
          <div className={featureText}>
            <h2 className={featureHeading}>
              Engineers have{' '}
              <span className={textSkyblue}>less patience</span> for a
              frustrating job
            </h2>
            <p>
              The tech industry is witnessing record salaries for engineers in
              2021, along with the highest rate of people quitting their job.
              Developers want to feel productive and get frustrated when they
              stumble upon so many obstacles in their workflow. Frontside takes
              a proactive approach to discovering pain points in the development
              process and areas of improvement now and in the long-term.
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
              Your team is incredibly talented, but it’s often bogged down by a
              faulty developer experience. Dealing with flimsy CI/CD
              integrations or antiquated patterns makes development feel like
              bureaucracy rather than a creative endeavour. Frontside helps you
              transform your development workflow into an inspiring process for
              your developers.
            </p>
          </div>
          <div className={featureImage}>
            <img src={dxTools} alt="" />
          </div>
        </div>
      </section>

      <section className={pageWrap}>
        <Tabs title="Ship faster &amp; happier: ">
          <Tab label="Team Decoupling">
            <h3 className={textXl}>Team decoupling</h3>
            <p>
              Not shipping often eats away the feeling of productivity in
              developers. But there's many circumstances that are outside of
              your control of theirs for that to happen. For example, a backend
              service from another team that is under development, or vendor
              APIs down due to maintenance.
            </p>
            <p>
              Frontside helps your team implement decoupling strategies with
              simulation so they can continue working despite external
              dependencies, and integrate effortlessly once the delays are
              resolved.
            </p>
          </Tab>
          <Tab label="Local Development">
            <h3 className={textXl}>Local development</h3>
            <p>
              If you have to go to a production or staging environment to see an
              error, your local development experience is not mature enough.
              When developers don't have a local environment that resemble
              production close enough, they'll miss bugs that will be hard to
              catch later on. Cloud native teams tend to have a harder time
              achieving this.
            </p>
            <p>Frontside ...</p>
          </Tab>
          <Tab label="Shift-left testing">
            <h3 className={textXl}>Shift-left testing</h3>
            <p>Automated testing harness blah blah blah blah</p>
            <p>Frontside ...</p>
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
          <img src={homePlaceholder} alt="" />
        </header>
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
