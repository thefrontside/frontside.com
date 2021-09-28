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
} from '../styles/typography.css';
import { toPageButton, toPageButtonGreen } from '../styles/buttons.css';

import BlogPreview from '../components/blog-preview';
import homeHero from '../img/q3-2021/home-hero.png';
import homeInject from '../img/q3-2021/home-inject.png';
import homeRethink from '../img/q3-2021/home-rethink.png';
import homeShiftleft from '../img/q3-2021/home-shift-left.png';
import backstageSight from '../img/q3-2021/home-backstage-sight.png';
import backstageDerisk from '../img/q3-2021/home-backstage-derisk.png';
import backstageShiftleft from '../img/q3-2021/home-backstage-shift-left.png';
import metaImage from '../img/q3-2021/meta-home.png';

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
    <Layout
      title="Frontside Software &mdash; DX and Backstage consulting"
      description="Frontside creates cohesive development experiences for Cloud native
      teams"
      image={metaImage}
    >
      <header className={heroWrap}>
        <div className={heroText}>
          <h1 className={heading3Xl}>
            <span className={textGradientSkybluePurple}>Empower</span> your
            developers <br className={heroBreak} /> from{' '}
            <strong className={textGradientDemiSkybluePink}>
              onboarding to
            </strong>{' '}
            production{' '}
            <strong className={textGradientPurplePink}>release</strong>
          </h1>
          <p className={textLg}>
            Frontside creates cohesive development experiences for Cloud native
            teams – from local setup and testing to deployment and developer
            portals, we have you covered.
          </p>
          <div className={clientLogos}>
            Trusted by HP, Resideo, Honeywell, Standard Chartered, Dell, HSBC
            and others
          </div>
        </div>
        <div className={heroImage}>
          <img src={homeHero} alt="" />
        </div>
      </header>

      <section className={pageWrap}>
        <div className={featureRow}>
          <div className={featureTextAlternate}>
            <h2 className={featureHeading}>
              <strong className={textSkyblue}>Re-think</strong> productivity
              after Kubernetes
            </h2>
            <p>
              Being Cloud native comes with its own challenges, especially for
              your developers. Frontside brings in cross-functional consultants
              who'll help you remove bottlenecks throughout your workflow and
              propose game-changing strategies to boost your teams' success.
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
              Automated testing is a cornerstone for on-time deliveries that
              work, but QA is a significant source of frustration. Using Open
              Source technologies, Frontside helps teams move tests inside the
              development cycle while making them both fast and reliable.
            </p>
          </div>
          <div className={featureImage}>
            <img src={homeShiftleft} alt="" />
          </div>
        </div>

        <div className={featureRow}>
          <div className={featureTextAlternate}>
            <h2 className={featureHeading}>
              <strong className={textSkyblue}>Inject leadership</strong> into
              your team
            </h2>
            <p>
              Most companies have great developers on their teams but lack the
              leadership to identify improvement opportunities and implement
              change. Frontside offers solutions cultivated from our network of
              enterprise partners and Open Source maintainers to create and
              nurture an Inner Source culture within your organization.
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
            <Link to="/consulting" className={toPageButton}>
              <strong className={arrowTextWhite}>
                Learn how we approach DX
              </strong>
            </Link>
          </div>
          <div className={homeGraphImage}>
            <HomeGraph />
          </div>
        </div>

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
              Every <br className={heroBreak} /> service{' '}
              <br className={heroBreak} />
              in sight
            </h3>
            <p className={highlightText}>
              With Backstage, you can align your organization's code,
              collaborators, and Cloud services and make the relationship
              visible and actionable for everyone.
            </p>
            <img src={backstageSight} alt="" className={highlightImage} />
          </div>
          <div className={highlight}>
            <h3 className={highlightHeading}>
              Smarten up <br className={heroBreak} /> infrastructure{' '}
              <br className={heroBreak} /> costs
            </h3>
            <p className={highlightText}>
              Backstage allows your teams to move faster but prevents costs from
              growing as well by bringing optimization closer to your
              developers.
            </p>
            <img src={backstageShiftleft} alt="" className={highlightImage} />
          </div>
          <div className={highlight}>
            <h3 className={highlightHeading}>
              De-risk
              <br className={heroBreak} /> your
              <br className={heroBreak} /> implementation
            </h3>
            <p className={highlightText}>
              Our deep expertise with Backstage’s constantly evolving alpha
              software means we can open up new frontiers for software
              organizations that guarantee long-term success.
            </p>
            <img src={backstageDerisk} alt="" className={highlightImage} />
          </div>
        </div>
        <p className={homeBottomCTA}>
          <Link to="/backstage" className={toPageButtonGreen}>
            <strong className={arrowTextWhite}>
              Learn how we implement Backstage
            </strong>
          </Link>
        </p>
      </section>

      <section className={pageWrap}>
        <header className={sectionHeader}>
          <h2 className={headingXl}>
            Our latest{' '}
            <strong className={textGradientSkybluePink}>insights</strong>
          </h2>
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
