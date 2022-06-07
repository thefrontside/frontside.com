import { graphql, Link } from 'gatsby';
import React, { useState } from 'react';

import Animation from '../components/animation';
import ContactCTA from '../components/contact-cta';
import Layout from '../components/layout';
import BlogPreview from '../components/blog-preview';

import {
  actionButtonGreen,
  actionButton,
  toPageButtonGreen,
} from '../styles/buttons.css';
import {
  caseStudySection,
  columnedhighlights,
  consultingTopTCA,
  entryColumn,
  entryColumns,
  featureImage,
  featureRow,
  featureText,
  featureTextAlternate,
  heroBreak,
  heroImage,
  heroText,
  heroWrap,
  highlight,
  highlightHeading,
  highlightImage,
  highlightText,
  homeBottomCTA,
  pageWrap,
  sectionHeader,
} from '../styles/page.css';
import {
  arrowTextWhite,
  featureHeading,
  heading3Xl,
  headingLg,
  headingXl,
  homeBackstageHeading,
  text2Xl,
  textGradientGreenSkyblue,
  textGradientPinkPurple,
  textGradientSkyblueGreen,
  textGradientSkybluePink,
  textGreen,
  textLg,
} from '../styles/typography.css';

import heroAnimation from '../img/q3-2021/animations/backstage-hero.json';
import backstageDomain from '../img/q3-2021/backstage-map-domain.png';
import deriskAnimation from '../img/q3-2021/animations/backstage-derisk.json';
import backstageSight from '../img/q3-2021/home-backstage-sight.png';
import backstageDerisk from '../img/q3-2021/home-backstage-derisk.png';
import backstageShiftleft from '../img/q3-2021/home-backstage-shift-left.png';

const DesignSystem = ({
  data: {
    allBlogPost: { edges: posts },
    allSimplecastEpisode: { edges: episodes },
  },
}) => {
  // this is used as a light state layer for when a CTA
  // has been had some interaction
  const [submitted, setSubmitted] = useState(false);

  // this is how we pull in data in gatsby
  // the include a graphql query (see the bottom of the file)
  // then take it in through props above, and adjust here
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

  // then we return our jsx (which is similar in structure to jsx)
  return (
    <Layout
      title="Frontside Design System"
      description="We help you get the most out of Backstage for the long-run"
    >
      {/* the layout includes the header and nav links */}

      {/* generic top level text */}
      <header className={sectionHeader}>
        <h2 className={headingXl}>
          <span className={textGradientPinkPurple}>Frontside Design</span>
        </h2>
      </header>

      <hr />
      {/* hero with text on left */}
      <Hero />

      <hr />
      {/* content in rows with text and image flipping left/right */}
      <LeftRight />

      <hr />
      {/* call to action button */}
      <CTAOptions />

      <hr />
      {/* highlight rectangle */}
      <HighlightRect />

      <hr />
      {/* lead in to a section (such as a feature grid */}
      <LeadIn />

      <hr />
      {/* feature grid section */}
      <FeatureGrid />

      <hr />
      {/* blog preview section */}
      <BlogPreviewSection {...{ firstPost, morePosts }} />

      <hr />
      {/* close the layout, this holds the footer and such */}
    </Layout>
  );
};

export default DesignSystem;

const Hero = () => (
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
          submitted={false}
          setSubmitted={() => console.log('do a thing')}
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
  </section>
);

const CTAOptions = () => (
  <section className={pageWrap}>
    {/* button before submission */}
    <p className={homeBottomCTA}>
      <ContactCTA
        submitted={false}
        // hook this up to a useState
        setSubmitted={() => console.log('do a thing')}
        label="Make Backstage work for you"
        topic="backstage"
        eventId="cta-backstage"
        ctaId="landing-bottom"
        className={actionButtonGreen}
        thanksClassName={textGradientGreenSkyblue}
      />
    </p>
    {/* button after submission */}
    <p className={homeBottomCTA}>
      <ContactCTA
        submitted={true}
        // hook this up to a useState
        setSubmitted={() => console.log('do a thing')}
        label="Make Backstage work for you"
        topic="backstage"
        eventId="cta-backstage"
        ctaId="landing-bottom"
        className={actionButtonGreen}
        thanksClassName={textGradientGreenSkyblue}
      />
    </p>
  </section>
);

const HighlightRect = () => (
  <section className={pageWrap}>
    <div className={caseStudySection}>
      <span className={headingLg}>Case study</span>
      <h2 className={text2Xl}>
        Boosting Resideo's Developers Experience with Backstage
      </h2>
      <p className={textLg}>
        Frontside helped Resideo set up and customize Backstage to enable
        org-wide service discoverability, standardize access to documentation
        across teams and languages, and kick-start ship-ready projects.
      </p>
      <br />
      <Link to="/backstage/resideo" className={actionButton}>
        <span className={arrowTextWhite}>Read more</span>
      </Link>
    </div>
  </section>
);

const LeadIn = () => (
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

const FeatureGrid = () => (
  <section className={pageWrap}>
    <div className={columnedhighlights}>
      <div className={highlight}>
        <h3 className={highlightHeading}>
          Every <br className={heroBreak} /> service{' '}
          <br className={heroBreak} />
          in sight
        </h3>
        <p className={highlightText}>
          With Backstage, you can align your organization's code, collaborators,
          and Cloud services and make the relationship visible and actionable
          for everyone.
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
          growing as well by bringing optimization closer to your developers.
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
          Our deep expertise with Backstage’s constantly evolving alpha software
          means we can open up new frontiers for software organizations that
          guarantee long-term success.
        </p>
        <img src={backstageDerisk} alt="" className={highlightImage} />
      </div>
    </div>
    <p className={homeBottomCTA}>
      <Link to="/backstage" className={toPageButtonGreen}>
        <span className={arrowTextWhite}>Learn how we implement Backstage</span>
      </Link>
    </p>
  </section>
);

const BlogPreviewSection = ({ firstPost, morePosts }) => (
  <section className={pageWrap}>
    <header className={sectionHeader}>
      <h2 className={headingXl}>
        Our latest <strong className={textGradientSkybluePink}>insights</strong>
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
);

// this is the graphql query that pulls in the data that is
// available in the props as noted above
// note that the query needs to be globally unique
export const designSystemQuery = graphql`
  query DesignSystemQuery {
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
