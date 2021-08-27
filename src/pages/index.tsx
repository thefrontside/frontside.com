import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';

import {
  PageWrap,
  HeroWrap,
  HeroText,
  HeroImage,
  HeroBreak,
  FeatureRow,
  FeatureText,
  FeatureTextAlternate,
  FeatureImage,
  ClientLogos,
  SectionHeader,
  ColumnedHighlights,
  Highlight,
  HighlightImage,
  CardList,
  Card,
  CardImage,
} from '../styles/page.css';
import {
  TextGradientSkybluePink,
  TextGradientPinkSkyblue,
  TextBottomGradient,
  TextGradientPinkPurple,
  TextGradientPurpleSkyblue,
  TextGradientSkybluePurple,
  TextGradientDemiSkybluePink,
  TextGradientPurplePink,
} from '../styles/typography.css';
import { atoms } from '../styles/atoms.css';

import heroPlaceholder from '../img/temp/hero_placeholder.png';
import featurePlaceholder from '../img/temp/feature_placeholder.png';

export default function IndexPage({
  data: {
    allBlogPost: { edges: posts },
    allSimplecastEpisode: { edges: episodes },
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
    <Layout title="Frontside &mdash; DX and Backstage consulting">
      <header className={HeroWrap}>
        <div className={HeroText}>
          <h1
            className={atoms({
              fontScale: '3xl',
              fontWeight: 'extrabold',
              textTransform: 'uppercase',
            })}
          >
            <span className={TextGradientSkybluePurple}>Empower</span> your developers
            — <br className={HeroBreak} /> from{' '}
            <strong className={TextGradientDemiSkybluePink}>commit to</strong>{' '}
            production{' '}
            <strong className={TextGradientPurplePink}>release</strong>
          </h1>
          <p className={atoms({ fontScale: 'lg' })}>
            Frontside creates cohesive development experiences for Cloud native
            teams: from IDE and CLI tools to deployment and developer portals.
          </p>
        </div>
        <div className={HeroImage}>
          <img src={heroPlaceholder} alt="" />
        </div>
      </header>

      <div className={ClientLogos}>
        Trusted by HP, Resideo, Honeywell, Standard Chartered, Dell, HSBC and
        others        
      </div>

      <section className={PageWrap}>
        <div className={FeatureRow}>
          <div className={FeatureTextAlternate}>
            <h2
              className={atoms({
                fontScale: 'xl',
                marginTop: 'none',
                marginBottom: 'lg',
              })}
            >
              <strong className={atoms({ color: 'skyblue' })}>Re-think</strong>{' '}
              productivity after Kubernetes
            </h2>
            <p>
              Once your break down the monolith, you're on your way of becoming
              a top performing software organization. But Cloud native comes
              with its own challenges, specially for your developers and their
              collaboration process. Frontside brings in cross-functional
              consultants who'll help you discover bottlenecks throughout your
              entire development workflow and propose game-changing strategies
              to boost your development teams' success.
            </p>
          </div>
          <div className={FeatureImage}>
            <img src={featurePlaceholder} alt="" />
          </div>
        </div>

        <div className={FeatureRow}>
          <div className={FeatureText}>
            <h2
              className={atoms({
                fontScale: 'xl',
                marginTop: 'none',
                marginBottom: 'lg',
              })}
            >
              <strong className={atoms({ color: 'skyblue' })}>
                Shift left
              </strong>{' '}
              your testing strategy
            </h2>
            <p>
              Test suites are a major source of frustration for developers.
              Often, tests either step in their way because they're hard to
              write and run too slowly, or tests provide no confidence because
              they pass or fail arbitrarily. Frontside helps teams move tests
              closer to development through Open Source tools to make them
              enjoyable, fast, and reliable.
            </p>
          </div>
          <div className={FeatureImage}>
            <img src={featurePlaceholder} alt="" />
          </div>
        </div>

        <div className={FeatureRow}>
          <div className={FeatureTextAlternate}>
            <h2
              className={atoms({
                fontScale: 'xl',
                marginTop: 'none',
                marginBottom: 'lg',
              })}
            >
              <strong className={atoms({ color: 'skyblue' })}>Inject</strong>{' '}
              technical{' '}
              <strong className={atoms({ color: 'skyblue' })}>
                leadership
              </strong>{' '}
              into your team
            </h2>
            <p>
              Most companies have great developers in their teams, but lack
              enough leaders to identify improvement opportunities and socialize
              technical change. Frontside brings in insights cultivated from our
              network of enterprise partners and Open Source maintainers.
            </p>
          </div>
          <div className={FeatureImage}>
            <img src={featurePlaceholder} alt="" />
          </div>
        </div>
      </section>

      <section className={PageWrap}>
        <header className={SectionHeader}>
          <h2 className={atoms({ fontScale: '2xl', fontWeight: 'extrabold' })}>
            Bring infrastructure, services, and people together with{' '}
            <strong className={atoms({ color: 'green' })}>Backstage</strong>
          </h2>
          <p className={atoms({ fontScale: 'lg' })}>
            We help you adopt and extend Backstage to fit your organization's
            unique ecosystem.
          </p>
        </header>
        <div className={ColumnedHighlights}>
          <div className={Highlight}>
            <h3
              className={atoms({
                fontScale: 'xl',
                lineHeight: 'lg',
                fontWeight: 'extrabold',
                order: { mobile: 1, laptop: 0 },
              })}
            >
              Every service at everyone's sight
            </h3>
            <p className={atoms({ order: { mobile: 2, laptop: 1 } })}>
              With Backstage's catalog, you can make your repositories and Cloud
              services visible and arranged around your products and services.
            </p>
            <img src={heroPlaceholder} alt="" className={HighlightImage} />
          </div>
          <div className={Highlight}>
            <h3
              className={atoms({
                fontScale: 'xl',
                lineHeight: 'lg',
                fontWeight: 'extrabold',
                order: { mobile: 1, laptop: 0 },
              })}
            >
              Shift cost infrastructure left
            </h3>
            <p className={atoms({ order: { mobile: 2, laptop: 1 } })}>
              Cloud native can allow your teams move faster, but that may lead
              to billing from Cloud providers grow rapidly.
            </p>
            <img src={heroPlaceholder} alt="" className={HighlightImage} />
          </div>
          <div className={Highlight}>
            <h3
              className={atoms({
                fontScale: 'xl',
                lineHeight: 'lg',
                fontWeight: 'extrabold',
                order: { mobile: 1, laptop: 0 },
              })}
            >
              De-risk your custom implementation
            </h3>
            <p className={atoms({ order: { mobile: 2, laptop: 1 } })}>
              Every organization has a unique system domain
            </p>
            <img src={heroPlaceholder} alt="" className={HighlightImage} />
          </div>
        </div>
      </section>

      <section className={PageWrap}>
        <header className={SectionHeader}>
          <h2
            className={atoms({
              fontScale: 'xl',
              fontWeight: 'extrabold',
              textTransform: 'uppercase',
            })}
          >
            Our latest{' '}
            <strong className={TextGradientSkybluePink}>insights</strong>
          </h2>
          <p className={atoms({ fontScale: 'lg' })}>
            We like sharing the results of our experience and research to start
            discussions.
          </p>
        </header>

        <div className={CardList}>
          {simplifiedPosts.map((post, key) => (
            <div key={key} className={Card}>
              <Link className={atoms({ color: 'white' })} to={post.slug}>
                <img src={post.image} alt="" className={CardImage} />
                <h3
                  className={atoms({
                    fontScale: 'xl',
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

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
    allSimplecastEpisode: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export const indexPageQuery = graphql`
  query IndexQuery {
    allBlogPost(
      sort: { order: DESC, fields: [markdown___frontmatter___date] }
      limit: 4
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
    allSimplecastEpisode(limit: 5) {
      edges {
        node {
          id
          title
          slug
          publishedAt(formatString: "MMMM DD, YYYY")
          authorNodes {
            name
            slug
          }
        }
      }
    }
  }
`;
