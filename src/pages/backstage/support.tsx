import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';

import Layout from '../../components/layout';
import Animation from '../../components/animation';
import ContactCTA from '../../components/contact-cta';

import {
  contentGrow,
  contentRow,
  contentShrink,
  consultingTopTCA,
  featureRow,
  featureText,
  featureTextAlternate,
  featureImage,
  heroWrap,
  heroText,
  heroImage,
  homeBottomCTA,
  contentGrow,
  contentRow,
  contentShrink,
  logoFlex,
  logoItem,
  pageWrap,
  sectionHeader,
} from '../../styles/page.css';
import {
  textGradientSkyblueGreen,
  heading3Xl,
  textGreen,
  textLg,
  featureHeading,
  textGradientGreenSkyblue,
  homeBackstageHeading,
  medQuote,
  medQuoteAuthor,
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
      <Testimonials />
      <LeftRight />
      <Trust />
      <ValueProp />
      <FinalCTA {...{ submitted, setSubmitted }} />
    </Layout>
  );
}

const Hero = ({ submitted, setSubmitted }) => (
  <header className={heroWrap}>
    <div className={heroText}>
      <h1 className={heading3Xl}>
        Enterprise Support for <span className={textGreen}>Backstage</span> {' '}
        by <span className={textGradientSkyblueGreen}>Frontside</span>
      </h1>
      <p className={textLg}>
        Accelerate your Backstage adoption with experience, insight and practical advice from Backstage contributors.
      </p>
      <p className={consultingTopTCA}>
        <ContactCTA
          submitted={submitted}
          setSubmitted={setSubmitted}
          label="Get Support today"
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
        TODO: Add a value prop short description
        <strong className={textGreen}> [Why? Backstage Enterprise Support]</strong>
      </h2>
      <p className={textLg}>
        Empower your team with the Expert Knowledge from Leaders of Backstage.
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
          Your DX Team <span className={textGreen}>A Boost</span>
        </h2>
        <p>
          Backstage is a powerful tool because it comes complete with an architecture, many plugins and best practices. With power comes a learning curve that can be difficult to master without help. Frontside gives your team information they need to be productive with Backstage.
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
          Gain Traction with <span className={textGreen}>Proven Strategies</span>
        </h2>
        <p>
          Companies are using Backstage to improve developer experience, impact employee retention and accelerate their Cloud Native adoption strategy. Frontside has seen first hand how successful Backstage adopters design their
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
          Avoiding Forking With <span className={textGreen}>the Lastest Features</span>
        </h2>
        <p>
          Sometimes Backstage doesn't do exactly what your team needs. Modifying Backstage without pushing changes to Backstage project makes upgrading difficult and locks you out or using the latest features of Backstage. Frontside keeps your team unblocked by adovcating and contributing changes to the Backstage project so yo can always upgrade and get the latest features with ease.
        </p>
      </div>
      <div className={featureImage}>
        <img src={backstageDomain} alt="" />
      </div>
    </div>

    <div className={featureRow}>
      {/* class for text from left */}
      <div className={featureTextAlternate}>
        <h2 className={featureHeading}>
          Be Bold in Face of Ambitious DX<span className={textGreen}>initatives</span>
        </h2>
        <p>
          Each organization is unique. Solutions to your ambitous initaives may not exsist in the open source Backstage project instead of limitiing your project to what is available in open source, Frontside helps you to take on your ambitious iniative knowing that with Frontside's help you'll be able to successfully accomplish your goals. Frontside can help you architect, build and optimize new Backstage plugins.
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
          Ship new DX features with <span className={textGreen}>confidence</span>
        </h2>
        <p>
          As your Backstage project grows, so withh the risk of breaking exisiting features that your users rely on. Reliable shift-left and shift-right testing practices can prevent frustration for your users by helping you catch problems before they're deployed to your users. Frontside helps DX teams implement integration testing harnesses that give you confidence without blocking your team from shipping new Backstage features.
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
    <div className={contentRow}>
      <div className={contentShrink}>
        <h2 className={featureHeading}>
          {'Trusted by '}
          <strong className={textGreen}>Our Clients</strong>
        </h2>
      </div>
      <div className={contentGrow}>
        <div className={logoFlex}>
          <Logo
            src="https://tailwindui.com/img/logos/workcation-logo-indigo-900.svg"
            alt="Workcation"
          />
          <Logo
            src="https://tailwindui.com/img/logos/tuple-logo-indigo-900.svg"
            alt="Tuple"
          />
          <Logo
            src="https://tailwindui.com/img/logos/level-logo-indigo-900.svg"
            alt="Level"
          />
        </div>
      </div>
    </div>
  </section>
);

const Logo = ({ src, alt }) => (
  <div className={logoItem}>
    <img src={src} alt={alt} />
  </div>
);

const Testimonials = () => (
  <section className={pageWrap}>
    <header className={sectionHeader}>
      <h2 className={homeBackstageHeading}>
        The work we do{' '}
        <strong className={textGreen}>Transcends</strong>
      </h2>
      <p className={textLg}>
        Our clients speak.
      </p>
    </header>
    <blockquote className={medQuote}>
      &ldquo;Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
      expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in
      laborum sed rerum et corporis.&rdquo;
    </blockquote>
    <p className={medQuoteAuthor}>&mdash; Amazing Person, CEO, Generic Place</p>
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
