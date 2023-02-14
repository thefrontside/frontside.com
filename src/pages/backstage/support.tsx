import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';

import Layout from '../../components/layout';
import Animation from '../../components/animation';
import SupportCTA from '../../components/cta-support';

import {
  contentGrow,
  contentRow,
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
  logoContainer,
  pageWrap,
  sectionHeader,
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
  featureHeading,
  textGradientGreenSkyblue,
  homeBackstageHeading,
  boldCaps,
  bodyCopy,
  textGradientVioletGreen,
} from '../../styles/typography.css';
import { actionButtonGreen } from '../../styles/buttons.css';

import backstageSupportHero from '../../img/backstage-support/backstagesupport-header-40.png';
import backstageValuePropI48 from '../../img/backstage-support/backstagesupport-48.png';
import backstageValuePropI49 from '../../img/backstage-support/backstagesupport-49.png';
import backstageValuePropI50 from '../../img/backstage-support/backstagesupport-50.png';
import backstageValuePropI51 from '../../img/backstage-support/backstagesupport-51.png';
import backstageValuePropI52 from '../../img/backstage-support/backstagesupport-52.png';
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

import clientHpLogo from '../../img/clients/HP_Black_RGB_150_SM.png';
import clientIndeedLogo from '../../img/clients/Indeed_2021_Logo_RGB_Blue.svg';
import clientFannieMaeLogo from '../../img/clients/Fannie-Mae-Logo.png';

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
      <ValueProp />
      <LeftRight />
      <Testimonials />
      <Trust />
      <PlansComparisonChart />
      <FinalCTA {...{ submitted, setSubmitted }} />
    </Layout>
  );
}

const Hero = ({ submitted, setSubmitted }) => (
  <header className={heroWrap}>
    <div className={heroText}>
      <h1 className={heading3Xl}>
        Enterprise Support for{' '}
        <span className={textGradientVioletGreen}>Backstage</span> by{' '}
        <span className={textGradientVioletGreen}>Frontside</span>
      </h1>
      <p className={textLg}>
        Accelerate your Backstage adoption with experience, insight and
        practical advice from Backstage contributors.
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
      <img
        src={backstageSupportHero}
        alt="backstage support hero illustration"
      />
    </div>
  </header>
);

const Badges = () => (
  <section className={badgesWrap}>
    <header className={badgesHeader}>
      <img
        src={leftLaurel}
        alt="left side of laurel surrounding the section header"
      />
      <div>
        We Are A Professional
        <div>
          <span className={badgesTextBackstage}>Backstage</span> Services
          Partner
        </div>
      </div>

      <img
        src={rightLaurel}
        alt="right side of laurel surrounding the section header"
      />
    </header>
    <p className={badgesBody}>
      <img
        className={badgeRibbon}
        src={backstageRibbon}
        alt="ribbon showing backstage  achievements"
      />

      <img
        src={backstageContributorOfMonth}
        alt="selected contributor of the month"
      />
      <div className={badgeCaption}>
        Recognized as "Contributor of the Month"
      </div>
      <img
        src={backstageContributionCount}
        alt="badge showing 34 pull requests"
      />
      <div className={badgeCaption}>
        49 Pull Requests Merged Into Backstage Project
      </div>
      <img
        src={backstageActiveSigParticipants}
        alt="many file folder active at once"
      />
      <div className={badgeCaption}>
        Contributors to Catalog SIG and Adoption SIG
      </div>
      <img src={backstageConPresentationCount} alt="presentation count" />
      <div className={badgeCaption}>2 Presentations at Backstage Conf</div>
    </p>
  </section>
);

const ValueProp = () => (
  <section className={pageWrap}>
    <header className={sectionHeader}>
      <h2 className={homeBackstageHeading}>
        Expert Knowledge from{' '}
        <strong className={textGradientVioletGreen}>
          Leaders in Backstage
        </strong>
      </h2>
    </header>
    <p className={bodyCopy}>
      We are early adopters, core contributors, and leaders in the Backstage
      community. We have extensive experience with Backstage and have led
      Backstage, Developer Experience, and Internal Developer Platform (IDPs)
      projects that support over 100k developers. We have indispensable
      knowledge to help you, your team, and your organization reach your
      Backstage project goals.
    </p>
  </section>
);

const LeftRight = () => (
  <section className={pageWrap}>
    <div className={featureRow}>
      {/* class for text on right */}
      <div className={featureTextAlternate}>
        <h2 className={featureHeading}>
          Give your DX Team{' '}
          <span className={textGradientVioletGreen}>A Boost</span>
        </h2>
        <p className={bodyCopy}>
          Backstage is a powerful tool because it comes complete with
          architecture, many plugins, and best practices. With power comes a
          learning curve that can be difficult to master without help. Frontside
          gives your team the information they need to be productive with
          Backstage.
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
          Gain Traction with{' '}
          <span className={textGradientVioletGreen}>Proven Strategies</span>
        </h2>
        <p>
          Companies are using Backstage to improve developer experience, improve
          employee retention and build Internal Developer Platforms. Frontside
          has seen firsthand how successful Backstage adopters design their
          roadmaps.
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
          Avoiding Forking With{' '}
          <span className={textGradientVioletGreen}>the Lastest Features</span>
        </h2>
        <p>
          When Backstage doesn't do what your team needs, modifying Backstage
          without applying changes upstream makes upgrading difficult and locks
          you out of using the latest features of Backstage. Frontside keeps
          your team unblocked by contributing changes to the Backstage project
          so you can always upgrade and quickly get the latest features.
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
          Be Bold in Face of Ambitious{' '}
          <span className={textGradientVioletGreen}>DX&nbsp;initatives</span>
        </h2>
        <p>
          Each organization is unique. Solutions to your ambitious initiatives
          may not exist in the open-source Backstage project. With Frontside by
          your side, you can take on any initiative knowing that your team can
          reach your goals. Frontside can help your team architect, build and
          optimize your Backstage portal.
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
          Ship new DX features with{' '}
          <span className={textGradientVioletGreen}>confidence</span>
        </h2>
        <p>
          As your Backstage project grows, so does the risk of breaking existing
          features. Reliable testing practices can catch problems before they
          impact your users' productivity. Frontside helps DX teams implement
          Backstage ingestion and integration testing practices that give you
          confidence without blocking your team from shipping new Backstage
          features.
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
    <header className={sectionHeader}>
      <h2 className={featureHeading}>
        {'Trusted by '}
        <strong className={textGreen}>Our Clients</strong>
      </h2>
    </header>
    <div className={contentRow}>
      <div className={contentGrow}>
        <div className={logoFlex}>
          <Logo src={clientHpLogo} alt="HP logo" width="55px" />
          <Logo src={clientFannieMaeLogo} alt="Fannie Mae Logo" width="200px" />
          <Logo src={clientIndeedLogo} alt="Indeed Logo" width="100px" />
        </div>
      </div>
    </div>
  </section>
);

const Logo = ({ src, alt, width }) => (
  <div className={logoContainer}>
    <img className={logoItem} src={src} alt={alt} width={width} />
  </div>
);

const TestimonialCarousel = ({ children }) => (
  <div className={testimonialCarousel}>{children}</div>
);

const Testimonial = ({ source, children }) => (
  <div className={testimonialWrap}>
    <div className={testimonialQuoteChar}>&ldquo;</div>
    <div>
      <span className={testimonialQuote}>{children}</span>
      <span className={testimonialSource}>{source}</span>
    </div>
  </div>
);

const Testimonials = () => (
  <section className={pageWrap}>
    <header className={sectionHeader}>
      <h2 className={homeBackstageHeading}>
        The work we do{' '}
        <strong className={textGradientVioletGreen}>Transcends</strong>
      </h2>
      <p className={textLg}>Our clients speak.</p>
    </header>
    <TestimonialCarousel>
      <Testimonial source="North, at Hewlett-Packard">
        I learned more working with Frontside for six months than I have in six
        years.
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
          <th>
            <img src={supportTierSilver} alt="" />
          </th>
          <th>
            <img src={supportTierGold} alt="" />
          </th>
          <th>
            <img src={supportTierPlatnium} alt="" />
          </th>
        </tr>
        <tr className={rowBorder}>
          <th className={tableCellLeftHeader}>+Benefits</th>
          <th className={boldCaps}>
            Silver
            <br />
            Plan
          </th>
          <th className={boldCaps}>
            Gold
            <br />
            Plan
          </th>
          <th className={boldCaps}>
            Platnium
            <br />
            Plan
          </th>
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
          <td className={tableCellLeft}>
            Recommended for <br />
            teams with
          </td>
          <td>less than 2 developers</td>
          <td>3 to 5 developers</td>
          <td>more than 5 developers</td>
        </tr>
        <tr className={rowBorder}>
          <td className={tableCellLeft}>Standing Meetings</td>
          <td>not included</td>
          <td>1 per week</td>
          <td>2 per week</td>
        </tr>
        <tr className={rowBorder}>
          <td className={tableCellLeft}>
            Pair programming <br /> sessions
          </td>
          <td>1 per week</td>
          <td>3 per week</td>
          <td>20 per month</td>
        </tr>
        <tr className={rowBorder}>
          <td className={tableCellLeft}>Code Reviews</td>
          <td>not included</td>
          <td>1 per week</td>
          <td>12 per month</td>
        </tr>
        <tr className={rowBorder}>
          <td className={tableCellLeft}>Code examples</td>
          <td>not included</td>
          <td>2 per month</td>
          <td>4 per month</td>
        </tr>
        <tr className={rowBorder}>
          <td className={tableCellLeft}>Upstream changes</td>
          <td>not included</td>
          <td>1 concurrent</td>
          <td>2 concurrent</td>
        </tr>
        <tr>
          <td className={tableCellLeft}>Chat Support</td>
          <td>1 seat</td>
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
