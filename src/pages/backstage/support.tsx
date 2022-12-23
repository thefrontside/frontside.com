import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';

import Layout from '../../components/layout';
import Animation from '../../components/animation';
import SupportCTA from '../../components/cta-support';

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
  badgesWrap,
  badgesHeader,
  badgesTextBackstage,
  badgesBody,
  badgeCaption,
  homeBottomCTA,
  logoFlex,
  logoItem,
  pageWrap,
  sectionHeader,
  testimonialBlock,
  comparisonChartTable,
  tableCellLeft,
  rowBorder,
  tableCellLeftHeader,
  testimonialCarousel,
  testimonialQuote,
  testimonialSource,
  testimonialWrap,
  testimonialQuoteChar,
  badgeRibbon,
} from '../../styles/page.css';
import {
  heading3Xl,
  textGreen,
  textLg,
  text4Xl,
  featureHeading,
  textGradientGreenSkyblue,
  homeBackstageHeading,
  medQuote,
  medQuoteAuthor,
  boldCaps,
  textGradientVioletGreen,
} from '../../styles/typography.css';
import { actionButtonGreen } from '../../styles/buttons.css';

import backstageSupportHero from '../../img/backstage-support/backstagesupport-header-40.png';
import backstageValuePropI48 from '../../img/backstage-support/backstagesupport-48.png';
import backstageValuePropI49 from '../../img/backstage-support/backstagesupport-49.png';
import backstageValuePropI50 from '../../img/backstage-support/backstagesupport-50.png';
import backstageValuePropI51 from '../../img/backstage-support/backstagesupport-51.png';
import backstageValuePropI52 from '../../img/backstage-support/backstagesupport-52.png';
import backstageDerisk from '../../img/q3-2021/backstage-derisk.png';
import backstageDx from '../../img/q3-2021/backstage-integrate-dx.png';
import metaImage from '../../img/q3-2021/meta-backstage.png';

import leftLaurel from '../../img/backstage-support/artboard-41.png';
import rightLaurel from '../../img/backstage-support/artboard-42.png';
import backstageRibbon from '../../img/backstage-support/artboard-43.png';
import backstageContributorOfMonth from '../../img/backstage-support/artboard-44.png';
import backstageContributionCount from '../../img/backstage-support/artboard-45.png';
import backstageActiveSigParticipants from '../../img/backstage-support/artboard-46.png';
import backstageConPresentationCount from '../../img/backstage-support/artboard-47.png';

import supportTierSilver from '../../img/backstage-support/tierSilver-artboard-53.png';
import supportTierGold from '../../img/backstage-support/tierGold-artboard-54.png';
import supportTierPlatnium from '../../img/backstage-support/tierPlatnium-artboard-55.png';

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
      title="
        Adopt Backstage your way with Frontside"
      description="We help you get the most out of Backstage for the long-run"
      image={metaImage}
    >
      <Hero {...{ submitted, setSubmitted }} />
      <Badges />
      <LeftRight />
      <Testimonials />
      <Trust />
      <ValueProp />
      <PlansComparisonChart />
      <FinalCTA {...{ submitted, setSubmitted }} />
    </Layout>
  );
}

const Hero = ({ submitted, setSubmitted }) => (
  <header className={heroWrap}>
    <div className={heroText}>
      <h1 className={heading3Xl}>
        Enterprise Support for <span className={textGradientVioletGreen}>Backstage</span> {' '}
        by <span className={textGradientVioletGreen}>Frontside</span>
      </h1>
      <p className={textLg}>
        Accelerate your Backstage adoption with experience, insight and practical advice from Backstage contributors.
      </p>
      <p className={consultingTopTCA}>
        <SupportCTA
          submitted={submitted}
          setSubmitted={setSubmitted}
          label="Get Support today"
          topic="backstage-support"
          eventId="cta-backstage-support"
          ctaId="support-hero-top"
          className={actionButtonGreen}
          thanksClassName={textGradientGreenSkyblue}
        />
      </p>
    </div>
    <div className={heroImage}>
      <img src={backstageSupportHero} alt="backstage support hero illustration" />
    </div>
  </header>
);

const Badges = () => (
  <section className={badgesWrap}>
      <header className={badgesHeader}>
          <img src={leftLaurel} alt="left side of laurel surrounding the section header" />
          <div>
              We Are A Professional
              <div>
                  <span className={badgesTextBackstage}>Backstage</span> Services Partner
              </div>
          </div>

          <img src={rightLaurel} alt="right side of laurel surrounding the section header" />
      </header>
      <p className={badgesBody}>
          <img className={badgeRibbon} src={backstageRibbon} alt="ribbon showing backstage  achievements" />

          <img src={backstageContributorOfMonth} alt="selected contributor of the month"/>
          <div className={badgeCaption}>Recognized as "Contributor of the Month"</div>
          <img src={backstageContributionCount} alt="badge showing 34 pull requests" />
          <div className={badgeCaption}>34 Pull Requests Merge Into Backstage Project</div>
          <img src={backstageActiveSigParticipants} alt="many file folder active at once" />
          <div className={badgeCaption}>Active Participant in Backstage Catalog SIG</div>
          <img src={backstageConPresentationCount} alt="presentation count" />
          <div className={badgeCaption}>2 Presentations at Backstage Conf</div>
      </p>
  </section>
)

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
          Give your DX Team <span className={textGradientVioletGreen}>A Boost</span>
        </h2>
        <p>
          Backstage is a powerful tool because it comes complete with an architecture, many plugins and best practices. With power comes a learning curve that can be difficult to master without help. Frontside gives your team information they need to be productive with Backstage.
        </p>
      </div>
      <div className={featureImage}>
        <img src={backstageValuePropI48} alt="" />
      </div>
    </div>

    <div className={featureRow}>
      {/* class for text on left */}
      <div className={featureText}>
        <h2 className={featureHeading}>
          Gain Traction with <span className={textGradientVioletGreen}>Proven Strategies</span>
        </h2>
        <p>
          Companies are using Backstage to improve developer experience, impact employee retention and accelerate their Cloud Native adoption strategy. Frontside has seen first hand how successful Backstage adopters design their
        </p>
      </div>
      <div className={featureImage}>
        <img src={backstageValuePropI49} alt="" />
      </div>
    </div>

    <div className={featureRow}>
      {/* class for text on right */}
      <div className={featureTextAlternate}>
        <h2 className={featureHeading}>
          Avoiding Forking With <span className={textGradientVioletGreen}>the Lastest Features</span>
        </h2>
        <p>
          Sometimes Backstage doesn't do exactly what your team needs. Modifying Backstage without pushing changes to Backstage project makes upgrading difficult and locks you out or using the latest features of Backstage. Frontside keeps your team unblocked by adovcating and contributing changes to the Backstage project so yo can always upgrade and get the latest features with ease.
        </p>
      </div>
      <div className={featureImage}>
        <img src={backstageValuePropI50} alt="" />
      </div>
    </div>

    <div className={featureRow}>
      {/* class for text from left */}
      <div className={featureText}>
        <h2 className={featureHeading}>
          Be Bold in Face of Ambitious <span className={textGradientVioletGreen}>DX&nbsp;initatives</span>
        </h2>
        <p>
          Each organization is unique. Solutions to your ambitous initaives may not exsist in the open source Backstage project instead of limitiing your project to what is available in open source, Frontside helps you to take on your ambitious iniative knowing that with Frontside's help you'll be able to successfully accomplish your goals. Frontside can help you architect, build and optimize new Backstage plugins.
        </p>

      </div>
      <div className={featureImage}>
        <img src={backstageValuePropI51} alt="" />
      </div>
    </div>

    <div className={featureRow}>
      {/* class for text on right */}
      <div className={featureTextAlternate}>
        <h2 className={featureHeading}>
          Ship new DX features with <span className={textGradientVioletGreen}>confidence</span>
        </h2>
        <p>
          As your Backstage project grows, so withh the risk of breaking exisiting features that your users rely on. Reliable shift-left and shift-right testing practices can prevent frustration for your users by helping you catch problems before they're deployed to your users. Frontside helps DX teams implement integration testing harnesses that give you confidence without blocking your team from shipping new Backstage features.
        </p>

      </div>
      <div className={featureImage}>
        <img src={backstageValuePropI52} alt="" />
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

const TestimonialCarousel = ({ children }) => (
  <div className={testimonialCarousel}>
      {children}
  </div>
);

const Testimonial = ({ source, children }) => (
  <div className={testimonialWrap}>
      <div className={testimonialQuoteChar}>&ldquo;</div>
      <div>
          <span className={testimonialQuote}>{children}</span>
          <span className={testimonialSource}>{source}</span>
      </div>
  </div>
)

const Testimonials = () => (
  <section className={pageWrap}>
      <header className={sectionHeader}>
          <h2 className={homeBackstageHeading}>
              The work we do{' '}
              <strong className={textGradientVioletGreen}>Transcends</strong>
          </h2>
          <p className={textLg}>
              Our clients speak.
          </p>
      </header>
      <TestimonialCarousel>
          <Testimonial source="North, at Hewlett-Packard">
              I learned more working with Frontside for six months than I have in six years.
          </Testimonial>
          <Testimonial source="Brian Beale, Engr Manager at Resideo">
              Frontside has a dedication to engineering excellence.
          </Testimonial>
          <Testimonial source="Kaspar for Grünberg, CEO of Humanitec">
              Hard to find a team more knowledgeable in Backstage than Frontside.
          </Testimonial>
      </TestimonialCarousel>
  </section>
);

const PlansComparisonChart = () => (
  <section className={pageWrap}>
    <header className={sectionHeader}>
      <h2 className={homeBackstageHeading}>
        Choose The Best Plan For Your Enterprise
      </h2>
    </header>
    {/* Table */}
    <table className={comparisonChartTable}>
      <thead>
        <tr>
          <th></th>
          <th><img src={supportTierSilver} alt="" /></th>
          <th><img src={supportTierGold} alt="" /></th>
          <th><img src={supportTierPlatnium} alt="" /></th>
        </tr>
        <tr className={rowBorder}>
          <th className={tableCellLeftHeader}>+Benefits</th>
          <th className={boldCaps}>Silver<br/>Plan</th>
          <th className={boldCaps}>Gold<br/>Plan</th>
          <th className={boldCaps}>Platnium<br/>Plan</th>
        </tr>
      </thead>
      <tbody>
        <tr className={rowBorder}>
          <td className={tableCellLeft}>Adoption Stage</td>
          <td>POC</td>
          <td>Early</td>
          <td>Advanced</td>
        </tr>
        <tr className={rowBorder}>
          <td className={tableCellLeft}>Recommended Teams <br/>(including Managers)</td>
          <td>1-2 Devs</td>
          <td>3 Devs <br /> 2 PMs</td>
          <td>
            5 Devs <br />
            1 Designer <br />
            2 Managers
          </td>
        </tr>
        <tr className={rowBorder}>
          <td className={tableCellLeft}>Standing Core Meeting</td>
          <td>x</td>
          <td>1 per week</td>
          <td>5 - 6 per month</td>
        </tr>
        <tr className={rowBorder}>
          <td className={tableCellLeft}>Ad-hoc Working Sessions <br />(Pair Programming or planning)</td>
          <td>2 per week</td>
          <td>3 per week</td>
          <td>20 per month</td>
        </tr>
        <tr className={rowBorder}>
          <td className={tableCellLeft}>Code Spikes <br />(POC, Code Samples, Pseudo Code)</td>
          <td>x</td>
          <td>2 per month</td>
          <td>4 per month</td>
        </tr>
        <tr className={rowBorder}>
          <td className={tableCellLeft}>Code Reviews</td>
          <td>x</td>
          <td>1 per week</td>
          <td>12 per month</td>
        </tr>
        <tr className={rowBorder}>
          <td className={tableCellLeft}>Rfcs</td>
          <td>x</td>
          <td>1 per month</td>
          <td>2 per month</td>
        </tr>
        <tr>
          <td className={tableCellLeft}>Chat Support</td>
          <td>x</td>
          <td>2 seats</td>
          <td>4 seats</td>
        </tr>
      </tbody>
    </table>
  </section>
);

const FinalCTA = ({ submitted, setSubmitted }) => (
  <section className={pageWrap}>
    <p className={homeBottomCTA}>
      <SupportCTA
        submitted={submitted}
        setSubmitted={setSubmitted}
        label="Get Support Today"
        topic="backstage-support"
        eventId="cta-backstage-support"
        ctaId="support-page-bottom"
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
