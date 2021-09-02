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
} from '../styles/page.css';
import {
  textGradientSkybluePink,
  textGradientSkyblueGreen,
} from '../styles/typography.css';
import { atoms } from '../styles/atoms.css';

import heroPlaceholder from '../img/temp/hero_placeholder.png';
import featurePlaceholder from '../img/temp/feature_placeholder.png';
import BlogPreview from '../components/blog-preview';

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
    <Layout title="DX Consulting for Cloud native teams">
      <header className={heroWrap}>
        <div className={heroText}>
          <h1
            className={atoms({
              fontScale: '3xl',
              fontWeight: 'extrabold',
              textTransform: 'uppercase',
            })}
          >
            Own your{' '}
            <span className={atoms({ color: 'green' })}>Backstage</span>{' '}
            implementation{' '}
            <span className={textGradientSkyblueGreen}>
              without forking out
            </span>
          </h1>
          <p className={atoms({ fontScale: 'lg' })}>
            We help Cloud native teams create cohesive developer experiences to
            make their teams thrive.
          </p>
        </div>
        <div className={heroImage}>
          <img src={heroPlaceholder} alt="" />
        </div>
      </header>

      <section className={pageWrap}>
        <div className={featureRow}>
          <div className={featureTextAlternate}>
            <h2
              className={atoms({
                fontScale: 'xl',
                marginTop: 'none',
                marginBottom: 'lg',
              })}
            >
              Make Backstage represent your{' '}
              <strong className={atoms({ color: 'green' })}>ecosystem</strong>
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
            <img src={featurePlaceholder} alt="" />
          </div>
        </div>

        <div className={featureRow}>
          <div className={featureText}>
            <h2
              className={atoms({
                fontScale: 'xl',
                marginTop: 'none',
                marginBottom: 'lg',
              })}
            >
              <strong className={atoms({ color: 'green' })}>De-risk</strong>{' '}
              your Backstage adoption
            </h2>
            <p>
              Backstage is an alpha software, and requires significant resources
              to put in place. Yet it has already proven to be a game-change for
              top performing engineering organizations. We help you de-risk your
              Backstage organization.
            </p>
          </div>
          <div className={featureImage}>
            <img src={featurePlaceholder} alt="" />
          </div>
        </div>

        <div className={featureRow}>
          <div className={featureTextAlternate}>
            <h2
              className={atoms({
                fontScale: 'xl',
                marginTop: 'none',
                marginBottom: 'lg',
              })}
            >
              <strong className={atoms({ color: 'green' })}>Integrate</strong>{' '}
              Backstage in your DX
            </h2>
            <p>
              Setting up Backstage is powerful, but it's the beginning of the
              journey. Once developers are powered up by Backstage affordances,
              they'll uncover new opportunities for growth and optimization.
            </p>
          </div>
          <div className={featureImage}>
            <img src={featurePlaceholder} alt="" />
          </div>
        </div>
      </section>

      <section className={pageWrap}>
        <header className={sectionHeader}>
          <h2
            className={atoms({
              fontScale: 'xl',
              fontWeight: 'extrabold',
              textTransform: 'uppercase',
            })}
          >
            Recent <strong className={textGradientSkybluePink}>DX</strong>{' '}
            articles
          </h2>
          <p className={atoms({ fontScale: 'lg' })}>
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
      filter: { markdown: { frontmatter: { tags: { in: "backstage" } } } }
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
