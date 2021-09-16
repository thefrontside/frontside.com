import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import HomeGraph from '../components/home-graph';

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
  highlightText,
  highlightHeading,
  entryColumn,
  entryColumns,
  homeGraphRow,
  homeGraphText,
  homeGraphImage,
  homeBottomCTA,
} from '../styles/page.css';
import {
  textGradientSkybluePink,
  textGradientSkybluePurple,
  textGradientDemiSkybluePink,
  textGradientPurplePink,
  heading3Xl,
  textLg,
  textSkyblue,
  textGreen,
  featureHeading,
  homeBackstageHeading,
  headingXl,
  arrowTextWhite,
  heading2Xl,
  textCentered,
  indentLine,
} from '../styles/typography.css';
import { actionButton, actionButtonGreen } from '../styles/buttons.css';

import heroPlaceholder from '../img/temp/hero_placeholder.png';
import BlogPreview from '../components/blog-preview';
import homeHero from '../img/q3-2021/home-hero.png';
import homeInject from '../img/q3-2021/home-inject.png';
import homeRethink from '../img/q3-2021/home-rethink.png';
import homeShiftleft from '../img/q3-2021/home-shift-left.png';
import backstageSight from '../img/q3-2021/home-backstage-sight.png';
import backstageDerisk from '../img/q3-2021/home-backstage-derisk.png';
import backstageShiftleft from '../img/q3-2021/home-backstage-shift-left.png';

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

  let firstPost = simplifiedPosts[0];
  let morePosts = simplifiedPosts.slice(1);

  return (
    <Layout title="Frontside Software &mdash; DX and Backstage consulting">
      <header className={heroWrap}>
        <div className={heroText}>
          <h1 className={heading3Xl}>
            <span className={textGradientSkybluePurple}>Empower</span> your
            developers — <br className={heroBreak} /> from{' '}
            <strong className={textGradientDemiSkybluePink}>
              onboarding to
            </strong>{' '}
            production{' '}
            <strong className={textGradientPurplePink}>release</strong>
          </h1>
          <p className={textLg}>
            Frontside creates cohesive Development Experiences for Cloud native
            teams: from local setup and testing to deployments and developer
            portals.
          </p>
        </div>
        <div className={heroImage}>
          <img src={homeHero} alt="" />
        </div>
      </header>

      <div className={clientLogos}>
        Trusted by HP, Resideo, Honeywell, Standard Chartered, Dell, HSBC and
        others
      </div>

      <section className={pageWrap}>
        <div className={featureRow}>
          <div className={featureTextAlternate}>
            <h2 className={featureHeading}>
              <strong className={textSkyblue}>Re-think</strong> productivity
              after Kubernetes
            </h2>
            <p>
              Once your break down the monolith, you're on your way to becoming
              a top-performing software organization. But Cloud native comes
              with its challenges, especially for your developers.
              <br />
              <span className={indentLine} />
              Frontside brings in cross-functional consultants who'll help you
              discover bottlenecks throughout your workflow and propose
              game-changing strategies to boost your teams' success.
            </p>
          </div>
          <div className={featureImage}>
            <img src={homeRethink} alt="" />
          </div>
        </div>

        <div className={featureRow}>
          <div className={featureText}>
            <h2 className={featureHeading}>
              <strong className={textSkyblue}>Shift left</strong> your testing
              strategy
            </h2>
            <p>
              Testing and QA are significant sources of frustration for
              developers. Yet, all Cloud native manuals point to automated
              testing being a cornerstone for frequent deliveries.
              <br />
              <span className={indentLine} />
              Using Open Source technologies, Frontside helps teams move tests
              closer to development while making them enjoyable, fast, and
              reliable.
            </p>
          </div>
          <div className={featureImage}>
            <img src={homeShiftleft} alt="" />
          </div>
        </div>

        <div className={featureRow}>
          <div className={featureTextAlternate}>
            <h2 className={featureHeading}>
              <strong className={textSkyblue}>Inject</strong> technical{' '}
              <strong className={textSkyblue}>leadership</strong> into your team
            </h2>
            <p>
              Most companies have great developers in their teams but lack
              enough leaders to identify improvement opportunities and socialize
              technical change.
              <br />
              <span className={indentLine} />
              Frontside brings in insights cultivated from our network of
              enterprise partners and Open Source maintainers to create a
              nurtured Inner Source culture in your organization.
            </p>
          </div>
          <div className={featureImage}>
            <img src={homeInject} alt="" />
          </div>
        </div>
        <div className={homeGraphRow}>
          <div className={homeGraphText}>
            <h2 className={heading2Xl}>
              We help developers thrive in complexity
            </h2>
            <Link to="/consulting" className={actionButton}>
              <strong className={arrowTextWhite}>
                Learn how we approach DX
              </strong>
            </Link>
          </div>
          <div className={homeGraphImage}>
            <HomeGraph />
          </div>
        </div>
      </section>

      <section className={pageWrap}>
        <header className={sectionHeader}>
          <h2 className={homeBackstageHeading}>
            Bring infrastructure, services, and people together with{' '}
            <strong className={textGreen}>Backstage</strong>
          </h2>
          <p className={textLg}>
            We help you adopt and extend Backstage to fit your organization's
            unique ecosystem.
          </p>
        </header>
        <div className={columnedhighlights}>
          <div className={highlight}>
            <h3 className={highlightHeading}>
              Every service at everyone's sight
            </h3>
            <p className={highlightText}>
              With Backstage, you can align your organization's code and Cloud
              services with business and make the relationship visible and
              actionable for everyone.
            </p>
            <img src={backstageSight} alt="" className={highlightImage} />
          </div>
          <div className={highlight}>
            <h3 className={highlightHeading}>Shift infrastructure costs left</h3>
            <p className={highlightText}>
              Cloud native can allow your teams to move faster; Backstage can
              help prevent infra bills from growing as fast by bringing cost
              optimization closer to your developers.
            </p>
            <img src={backstageShiftleft} alt="" className={highlightImage} />
          </div>
          <div className={highlight}>
            <h3 className={highlightHeading}>
              De-risk your implementation
            </h3>
            <p className={highlightText}>
              Backstage opens up new frontiers for many software organizations,
              but it is a constantly evolving alpha software that requires deep
              expertise to guarantee long-term success.{' '}
            </p>
            <img src={backstageDerisk} alt="" className={highlightImage} />
          </div>
        </div>
        <p className={homeBottomCTA}>
          <Link to="/backstage" className={actionButtonGreen}>
            <strong className={arrowTextWhite}>Adopt Backstage</strong>
          </Link>
        </p>
      </section>

      <section className={pageWrap}>
        <header className={sectionHeader}>
          <h2 className={headingXl}>
            Our latest{' '}
            <strong className={textGradientSkybluePink}>insights</strong>
          </h2>
          <p className={textLg}>
            We like sharing the results of our experience and research to start
            discussions.
          </p>
        </header>

        <BlogPreview post={firstPost} layout="featured" />

        <div className={entryColumns}>
          {morePosts.map((post, i) => (
            <div className={entryColumn} key={i}>
              <BlogPreview post={post} />
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
