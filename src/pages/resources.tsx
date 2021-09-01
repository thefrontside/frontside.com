import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';

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
  clientLogos,
  sectionHeader,
  columnedhighlights,
  highlight,
  highlightImage,
  cardList,
  card,
  cardImage,
} from '../styles/page.css';
import {
  textGradientSkybluePink,
  textGradientSkyblueGreen,
  TextGradientPinkSkyblue,
  textBottomGradient,
  textGradientPinkPurple,
  textGradientPurpleSkyblue,
} from '../styles/typography.css';
import { atoms } from '../styles/atoms.css';

import heroPlaceholder from '../img/temp/hero_placeholder.png';
import featurePlaceholder from '../img/temp/feature_placeholder.png';
import BlogheroImage from '../img/plork/blog-hero@1.5x.png';

export default function ResourcesPage({
  data: {
    allBlogPost: { edges: posts },
  },
}) {
  const simplifiedPosts = posts.map(({ node }) => ({
    id: node.id,
    slug: node.slug,
    title: node.title,
    date: node.markdown.frontmatter.date,
    excerpt: node.markdown.frontmatter.description,
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
    <Layout title="Resources for engineering teams">
      <header className={heroWrap}>
        <div className={heroText}>
          <h1
            className={atoms({
              fontScale: '3xl',
              fontWeight: 'extrabold',
              textTransform: 'uppercase',
            })}
          >
            <span className={atoms({ color: 'pink' })}>
              Resources
            </span>{' '}
            for engineering teams
          </h1>
          <p className={atoms({ fontScale: 'lg' })}>
            We maintain a blog, curate a newsletter about DX, and host a
            Backstage community.
          </p>
        </div>
        <div className={heroImage}>
          <img src={BlogheroImage} alt="" />
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

        <div className={cardList}>
          {simplifiedPosts.map((post, key) => (
            <div key={key} className={card}>
              <Link className={atoms({ color: 'white' })} to={post.slug}>
                <img src={post.image} alt="" className={cardImage} />
                <h3
                  className={atoms({
                    fontScale: 'xl',
                    lineHeight: 'lg',
                    paddingX: 'sm',
                  })}
                >
                  {post.title}
                </h3>
                <p
                  className={atoms({
                    fontScale: 'sm',
                    textTransform: 'uppercase',
                    paddingX: 'sm',
                  })}
                >
                  {post.authors.filter(Boolean).map((author, i) => (
                    <React.Fragment key={author.slug}>
                      {i === 0 ? '' : post.authors.length > 2 ? ', ' : ' and '}
                      {/* Author links will lead to team member page, which is currently pending. */}
                      {/* <Link key={author.slug} to={author.slug}>
                          <Text>{author.name}</Text>
                        </Link>
                    */}
                      {author.name}
                    </React.Fragment>
                  ))}
                  &mdash; <span>{post.date}</span>
                </p>
                <p className={atoms({ fontScale: 'sm', paddingX: 'sm' })}>
                  {post.excerpt}
                </p>

                <strong
                  className={atoms({
                    display: 'inline-block',
                    fontScale: 'sm',
                    paddingX: 'sm',
                    paddingBottom: 'sm',
                  })}
                >
                  Continue reading →
                </strong>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

ResourcesPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export const resourcesPageQuery = graphql`
  query ResourcesQuery {
    allBlogPost(
      sort: { order: DESC, fields: [markdown___frontmatter___date] }
      filter: {
        markdown: {
          frontmatter: { tags: { in: ["testing", "backstage", "dx"] } }
        }
      }
      limit: 6
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
