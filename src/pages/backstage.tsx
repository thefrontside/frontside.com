import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import Animation from '../components/animation';
import ContactCTA from '../components/cta-contact';

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
  homeBottomCTA,
  heroPlayerForceSize,
  featurePlayerForceSize,
} from '../styles/page.css';
import {
  textGradientSkyblueGreen,
  heading3Xl,
  textGreen,
  textLg,
  featureHeading,
  headingXl,
  text2Xl,
  arrowTextWhite,
  textGradientGreenSkyblue,
  textXl,
  arrowTextGreen,
  headingLg,
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
import metaImage from '../img/q3-2021/meta-backstage.png';

import heroAnimation from '../img/q3-2021/animations/backstage-hero.json';
import deriskAnimation from '../img/q3-2021/animations/backstage-derisk.json';

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

  const [submitted, setSubmitted] = useState(false);

  return (
    <Layout
      title="Adopt Backstage your way with Frontside"
      description="We help you get the most out of Backstage for the long-run"
      image={metaImage}
    >
      <header className={heroWrap}>
        <div className={heroText}>
          <h1 className={heading3Xl}>
            Own your <span className={textGreen}>Backstage</span> implementation{' '}
            <span className={textGradientSkyblueGreen}>
              without forking out
            </span>
          </h1>
          <p className={textLg}>
            We help enterprise teams get the most out of Backstage for the long-run
          </p>
          <p className={consultingTopTCA}>
            <ContactCTA
              submitted={submitted}
              setSubmitted={setSubmitted}
              label="Adopt Backstage with Frontside"
              topic="backstage"
              eventId="cta-backstage"
              ctaId="landing-top"
              className={actionButtonGreen}
              thanksClassName={textGradientGreenSkyblue}
            />
          </p>
        </div>
        <div className={heroImage}>
          <Animation src={heroAnimation} />
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
              your organization. But you don't have to compromise your needs to
              fit them into what Backstage supports today. As an active
              contributor to Backstage, Frontside can help you cover all your
              use-cases—even those not yet in platform—without moving away from
              OSS.
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
              Avoid getting locked out of future Backstage upgrades with
              uninformed early choices in your Backstage adoption. Frontside
              understands Backstage's current alpha software limitations and can
              help you set up the platform so you can get what you need now and
              keep getting value in the long term.
            </p>
          </div>
          <div className={featureImage}>
            <Animation src={deriskAnimation} />
          </div>
        </div>

        <div className={featureRow}>
          <div className={featureTextAlternate}>
            <h2 className={featureHeading}>
              <span className={textGreen}>Integrate</span> Backstage in your DX
            </h2>
            <p>
              Setting up Backstage's Catalog unleashes its power, but it's only
              the beginning of the journey. Once developers familiarize
              themselves with Backstage’s affordances, they'll uncover new
              opportunities for growth and optimization. Frontside helps your
              teams integrate more tools into Backstage and streamline their
              workflow to take advantage of their new self-service capabilities.
            </p>
          </div>
          <div className={featureImage}>
            <img src={backstageDx} alt="" />
          </div>
        </div>
        <p className={homeBottomCTA}>
          <ContactCTA
            submitted={submitted}
            setSubmitted={setSubmitted}
            label="Make Backstage work for you"
            topic="backstage"
            eventId="cta-backstage"
            ctaId="landing-bottom"
            className={actionButtonGreen}
            thanksClassName={textGradientGreenSkyblue}
          />
        </p>

        <div className={caseStudySection}>
          <span className={headingLg}>Case study</span>
          <h2 className={text2Xl}>
            Boosting Resideo's Developers Experience with Backstage
          </h2>
          <p className={textLg}>
            Frontside helped Resideo set up and customize Backstage to enable
            org-wide service discoverability, standardize access to
            documentation across teams and languages, and kick-start ship-ready
            projects.
          </p>
          <br />
          <Link to="/backstage/resideo" className={actionButton}>
            <span className={arrowTextWhite}>Read more</span>
          </Link>
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
  }
`;
