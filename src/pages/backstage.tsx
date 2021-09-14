import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';

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
  caseStudySection,
  consultingTopTCA,
} from '../styles/page.css';
import {
  textGradientSkybluePink,
  textGradientSkyblueGreen,
  heading3Xl,
  textGreen,
  textLg,
  featureHeading,
  headingXl,
  textSm,
  text2Xl,
  arrowText,
  arrowTextWhite,
  textGradientGreenSkyblue,
} from '../styles/typography.css';
import { actionButton, actionButtonGreen } from '../styles/buttons.css';

import BlogPreview from '../components/blog-preview';

import backstageHero from '../img/q3-2021/backstage-hero.png';
import backstageDomain from '../img/q3-2021/backstage-map-domain.png';
import backstageDerisk from '../img/q3-2021/backstage-derisk.png';
import backstageDx from '../img/q3-2021/backstage-integrate-dx.png';

export default function BackstagePage({
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
    <Layout title="Adopt Backstage your way with Frontside">
      <header className={heroWrap}>
        <div className={heroText}>
          <h1 className={heading3Xl}>
            Own your <span className={textGreen}>Backstage</span> implementation{' '}
            <span className={textGradientSkyblueGreen}>
              without forking out
            </span>
          </h1>
          <p className={textLg}>
            We help Cloud native teams create cohesive developer experiences to
            make their teams thrive.
          </p>
          <p className={consultingTopTCA}>
            <Link to="/" className={actionButtonGreen}>
              <strong className={arrowTextWhite}>
                Make Backstage work for you
              </strong>
            </Link>
          </p>
        </div>
        <div className={heroImage}>
          <img src={backstageHero} alt="" />
        </div>
      </header>

      <section className={pageWrap}>
        <div className={featureRow}>
          <div className={featureTextAlternate}>
            <h2 className={featureHeading}>
              Make Backstage represent your{' '}
              <span className={textGreen}>ecosystem</span>
            </h2>
            <p>
              Your combination of stack, services, and people are unique to your
              team. Backstage is a powerful and flexible platform, but it's also
              early in its development. Thus, you must be careful before taking
              your own path with it, because you risk losing on a lot of
              community value.
            </p>
          </div>
          <div className={featureImage}>
            <img src={backstageDomain} alt="" />
          </div>
        </div>

        <div className={featureRow}>
          <div className={featureText}>
            <h2 className={featureHeading}>
              <span className={textGreen}>De-risk</span> your Backstage
              adoption
            </h2>
            <p>
              Backstage is an alpha software, and requires significant resources
              to put in place. Yet it has already proven to be a game-change for
              top performing engineering organizations. We help you de-risk your
              Backstage organization.
            </p>
          </div>
          <div className={featureImage}>
            <img src={backstageDerisk} alt="" />
          </div>
        </div>

        <div className={featureRow}>
          <div className={featureTextAlternate}>
            <h2 className={featureHeading}>
              <span className={textGreen}>Integrate</span> Backstage in your
              DX
            </h2>
            <p>
              Setting up Backstage is powerful, but it's the beginning of the
              journey. Once developers are powered up by Backstage affordances,
              they'll uncover new opportunities for growth and optimization.
            </p>
          </div>
          <div className={featureImage}>
            <img src={backstageDx} alt="" />
          </div>
        </div>
      </section>

      <section className={pageWrap}>
        <div className={caseStudySection}>
          <span className={textSm}>Case study</span>
          <h2 className={text2Xl}>
            Making a dozen documentation system work with Backstage
          </h2>
          <p className={textLg}>
            Frontside helped Resideo adopt Backstage's Catalog, Scaffolding, and
            specially, TechDocs to alliviate a critical issue with
            documentation.
          </p>
          <br />
          <strong className={actionButton}>
            <span className={arrowTextWhite}>Read more</span>
          </strong>
        </div>
      </section>

      <section className={pageWrap}>
        <header className={sectionHeader}>
          <h2 className={headingXl}>
            Latest <strong className={textGradientGreenSkyblue}>Backstage</strong>{' '}
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

BackstagePage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export const backstagePageQuery = graphql`
  query BackstageQuery {
    allBlogPost(
      sort: { order: DESC, fields: [markdown___frontmatter___date] }
      filter: { markdown: { frontmatter: { tags: { in: ["backstage"] } } } }
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
