import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';

import Layout from '../../components/layout';
import Animation from '../../components/animation';
import ContactCTA from '../../components/contact-cta';

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
  consultingTopTCA,
  homeBottomCTA,
} from '../../styles/page.css';
import {
  textGradientSkyblueGreen,
  heading3Xl,
  textGreen,
  textLg,
  featureHeading,
  textGradientGreenSkyblue,
  homeBackstageHeading,
} from '../../styles/typography.css';
import { actionButtonGreen } from '../../styles/buttons.css';

import backstageHero from '../../img/q3-2021/backstage-hero.png';
import backstageDomain from '../../img/q3-2021/backstage-map-domain.png';
import backstageDerisk from '../../img/q3-2021/backstage-derisk.png';
import backstageDx from '../../img/q3-2021/backstage-integrate-dx.png';
import metaImage from '../../img/q3-2021/meta-backstage.png';

import heroAnimation from '../../img/q3-2021/animations/backstage-hero.json';
import deriskAnimation from '../../img/q3-2021/animations/backstage-derisk.json';

export default function BackstageSupport({
  data: {
    allBlogPost: { edges: posts },
  },
}) {
  const [submitted, setSubmitted] = useState(false);
  return (
    <Layout
      title="Adopt Backstage your way with Frontside"
      description="We help you get the most out of Backstage for the long-run"
      image={metaImage}
    >
      <Hero {...{ submitted, setSubmitted }} />
      <ValueProp />
      <LeftRight />
      <Trust />
      <Testimonials />
      <FinalCTA {...{ submitted, setSubmitted }} />
    </Layout>
  );
}

const Hero = ({ submitted, setSubmitted }) => (
  <header className={heroWrap}>
    <div className={heroText}>
      <h1 className={heading3Xl}>
        Own your <span className={textGreen}>Backstage</span> implementation{' '}
        <span className={textGradientSkyblueGreen}>without forking out</span>
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
);

const ValueProp = () => (
  <section className={pageWrap}>
    <header className={sectionHeader}>
      <h2 className={homeBackstageHeading}>
        Bring infrastructure, services, and people together with{' '}
        <strong className={textGreen}>Backstage</strong>
      </h2>
      <p className={textLg}>
        We help you adopt and extend Backstage to fit your organization's unique
        ecosystem.
      </p>
    </header>
  </section>
);

const LeftRight = () => (
  <section className={pageWrap}>
    <div className={featureRow}>
      {/* class for text on right */}
      <div className={featureTextAlternate}>
        <h2 className={featureHeading}>
          Master your <span className={textGreen}>ecosystem</span> with
          Backstage
        </h2>
        <p>
          Your combination of tech stack, services, and people is unique to your
          organization. But you don't have to compromise your needs to fit them
          into what Backstage supports today. As an active contributor to
          Backstage, Frontside can help you cover all your use-cases—even those
          not yet in platform—without moving away from OSS.
        </p>
      </div>
      <div className={featureImage}>
        <img src={backstageDomain} alt="" />
      </div>
    </div>

    <div className={featureRow}>
      {/* class for text on left */}
      <div className={featureText}>
        <h2 className={featureHeading}>
          <span className={textGreen}>De-risk</span> your Backstage adoption
        </h2>
        <p>
          Avoid getting locked out of future Backstage upgrades with uninformed
          early choices in your Backstage adoption. Frontside understands
          Backstage's current alpha software limitations and can help you set up
          the platform so you can get what you need now and keep getting value
          in the long term.
        </p>
      </div>
      <div className={featureImage}>
        <Animation src={deriskAnimation} />
      </div>
    </div>

    <div className={featureRow}>
      {/* class for text on right */}
      <div className={featureTextAlternate}>
        <h2 className={featureHeading}>
          Master your <span className={textGreen}>ecosystem</span> with
          Backstage
        </h2>
        <p>
          Your combination of tech stack, services, and people is unique to your
          organization. But you don't have to compromise your needs to fit them
          into what Backstage supports today. As an active contributor to
          Backstage, Frontside can help you cover all your use-cases—even those
          not yet in platform—without moving away from OSS.
        </p>
      </div>
      <div className={featureImage}>
        <img src={backstageDomain} alt="" />
      </div>
    </div>
  </section>
);

const Trust = () => (
  <section className={pageWrap}>
    <h2 className={homeBackstageHeading}>
      {'Trusted by '}
      <strong className={textGreen}>Our Clients</strong>
    </h2>
    <p className={textLg}>To Be Fleshed Out</p>
  </section>
);

const Testimonials = () => (
  <section className={pageWrap}>
    <h2 className={homeBackstageHeading}>Testimonials</h2>
    <p className={textLg}>To Be Fleshed Out</p>
  </section>
);

const FinalCTA = ({ submitted, setSubmitted }) => (
  <section className={pageWrap}>
    <p className={homeBottomCTA}>
      <ContactCTA
        submitted={submitted}
        setSubmitted={setSubmitted}
        label="Start Today"
        topic="backstage"
        eventId="cta-backstage"
        ctaId="landing-bottom"
        className={actionButtonGreen}
        thanksClassName={textGradientGreenSkyblue}
      />
    </p>
  </section>
);

BackstageSupport.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export const backstageSupportQuery = graphql`
  query BackstageSupportQuery {
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
