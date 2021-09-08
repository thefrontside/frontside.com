import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import BlogPreview from '../components/blog-preview';

import {
  pageWrap,
  heroWrap,
  heroText,
  heroImage,
  heroBreak,
  featureRow,
  featureText,
  featureTextAlternate,
  featureImage,
  sectionHeader,
  entryColumns,
  entryColumn,
} from '../styles/page.css';
import {
  textGradientSkybluePink,
  textGradientPinkSkyblue,
  heroHeading,
  textLg,
  featureHeading,
  textSkyblue,
  heading2,
  bigQuote,
  bigQuoteAuthor,
  textExtrabold,
  arrowText,
} from '../styles/typography.css';

import featurePlaceholder from '../img/temp/feature_placeholder.png';
import dxHero from '../img/q3-2021/dx-hero.png';
import dxProblems from '../img/q3-2021/dx-problems.png';
import dxFrustration from '../img/q3-2021/dx-frustration.png';
import { actionButton } from '../styles/buttons.css';

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
          <h1 className={heroHeading}>
            <span className={textGradientPinkSkyblue}>Developer</span>
            <br className={heroBreak} />
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
          &mdash; Brian Beale, Director of Software Engineering at Resideo <br />
        </p>
        <p className={bigQuoteAuthor}>
          <Link to="/" className={actionButton}>
            <strong className={arrowText}>
              Request a DX assesment
            </strong>
          </Link>
        </p>
        <div className={featureRow}>
          <div className={featureTextAlternate}>
            <h2 className={featureHeading}>
              Developers' problems are{' '}
              <strong className={textSkyblue}>business problems</strong>
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
              <strong className={textSkyblue}>less patience</strong> for a
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
              <strong className={textSkyblue}>sharp tools</strong>
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
            <img src={featurePlaceholder} alt="" />
          </div>
        </div>
      </section>

      <section className={pageWrap}>
        Tabs
      </section>

      <section className={pageWrap}>
        <header className={sectionHeader}>
          <h2 className={heading2}>
            Recent <strong className={textGradientSkybluePink}>DX</strong>{' '}
            articles
          </h2>
          <p className={textLg}>
            We like sharing the results of our experience and research to start
            discussions.
          </p>
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
