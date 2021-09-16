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
  backstageOpenMicBox,
  backstageOpenMicLine,
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
  indentLine,
  textXl,
  textArrowGreen,
  arrowTextGreen,
} from '../styles/typography.css';
import {
  actionButton,
  actionButtonGreen,
  openmicButton,
} from '../styles/buttons.css';

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
            We help you adapt, extend and get the most out of Backstage for the
            long-run.
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
              Master your <span className={textGreen}>ecosystem</span> with
              Backstage
            </h2>
            <p>
              Your combination of tech stack, services, and people is unique to
              your organization. Don't compromise your needs to fit them into
              what Backstage supports today.
              <br />
              <span className={indentLine} />
              As an active contributor to Backstage, Frontside can help you
              cover all your use-cases, even those not yet in platform—and
              without moving away from the OSS project.
            </p>
          </div>
          <div className={featureImage}>
            <img src={backstageDomain} alt="" />
          </div>
        </div>

        <div className={featureRow}>
          <div className={featureText}>
            <h2 className={featureHeading}>
              <span className={textGreen}>De-risk</span> your Backstage adoption
            </h2>
            <p>
              Backstage is alpha software and requires significant resources to
              put in place. Avoid getting locked out of future upgrades with
              uninformed early choices in your Backstage adoption.
              <br />
              <span className={indentLine} />
              Frontside understands Backstage's current limitations and roadmap
              in and out and will help you set up the platform so you can keep
              getting more value out of your Backstage instance in the long
              term.
            </p>
          </div>
          <div className={featureImage}>
            <img src={backstageDerisk} alt="" />
          </div>
        </div>

        <div className={featureRow}>
          <div className={featureTextAlternate}>
            <h2 className={featureHeading}>
              <span className={textGreen}>Integrate</span> Backstage in your DX
            </h2>
            <p>
              Setting up Backstage's Catalog brings in power, but it's the
              beginning of the journey. Once Backstage affordances power up
              developers, they'll uncover new opportunities for growth and
              optimization.
              <br />
              <span className={indentLine} />
              Frontside helps your teams integrate more tools into Backstage and
              streamline their workflow to take advantage of their new
              self-service capabilities.
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
            Boosting Resideo's Developers Experience with Backstage
          </h2>
          <p className={textLg}>
            Frontside helped Resideo set up and customize Backstage to enable
            org-wide service discoverability, standardize the access to
            documentation across teams and languages, and kick-start
            shipping-ready projects.
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
            <strong className={textGradientGreenSkyblue}>Backstage</strong>{' '}
            Resources
          </h2>
        </header>

        <div className={entryColumns}>
          <div className={backstageOpenMicBox}>
            <h3 className={textXl}>Backstage Open Mic</h3>
            <p className={textLg}>
              Open Mic is a community of Backstage users, co-hosted by
              Frontside, who share their insights and help each other.
            </p>
            <a
              href="https://backstage-openmic.com/"
              className={openmicButton}
              target="_blank"
            >
              <span className={arrowTextGreen}>Join the community</span>
            </a>
            <hr className={backstageOpenMicLine}></hr>
            <h3 className={textXl}>Roadie's Backstage Weekly Newsletter</h3>
            <p className={textLg}>
              Our friends at Roadie will keep you up to date with the latest
              developments in the Backstage project. They also highlight
              community insights, such as contributions and publications.
            </p>
            <a
              href="https://roadie.io/backstage-weekly/"
              className={openmicButton}
              target="_blank"
            >
              <span className={arrowTextGreen}>
                Suscribe to Roadie's Newsletter
              </span>
            </a>
          </div>
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
