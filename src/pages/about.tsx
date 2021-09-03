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
  featureTextAlternate,
  featureImage,
  sectionHeader,
  columnedhighlights,
  aboutHighlight,
  aboutHighlightDecor,
  aboutTeamImg,
  aboutHighlightHeading,
  aboutHighlightDecorMarginFix,
  aboutTeamList,
} from '../styles/page.css';
import {
  textGradientSkybluePink,
  textGradientSkybluePurple,
  bigQuote,
  heroHeading,
  textSkyblue,
  textLg,
  textExtrabold,
  bigQuoteAuthor,
  textPink,
  heading2,
  textBlueDashWhite,
  heading2NoMargin,
} from '../styles/typography.css';

import aboutHero from '../img/q3-2021/about-hero.png';
import decor1 from '../img/q3-2021/about-decor-1.png';
import decor2 from '../img/q3-2021/about-decor-2.png';
import decor3 from '../img/q3-2021/about-decor-3.png';
import decor4 from '../img/q3-2021/about-decor-4.png';
import decor5 from '../img/q3-2021/about-decor-5.png';
import decor6 from '../img/q3-2021/about-decor-6.png';

export default function IndexPage({ data: { allPeople } }) {
  const formattedPeople = allPeople.edges.map(
    ({
      node: {
        name,
        slug,
        person: { frontmatter },
      },
    }) => ({
      name,
      slug,
      title: frontmatter.title,
      location: frontmatter.location,
      img: frontmatter.img,
      imgAlt: frontmatter.imgAlt,
      intro: frontmatter.intro,
    })
  );

  return (
    <Layout title="About Frontside">
      <header className={heroWrap}>
        <div className={heroText}>
          <h1 className={heroHeading}>
            We've been{' '}
            <span className={textGradientSkybluePurple}>improving</span>{' '}
            engineering orgs <span className={textSkyblue}>since 2005</span>
          </h1>
          <p className={textLg}>
            We are a purposefully small group of engineers who want to create
            scale-ready tools.
          </p>
        </div>
        <div className={heroImage}>
          <img src={aboutHero} alt="" />
        </div>
      </header>

      <section className={pageWrap}>
        <blockquote className={bigQuote}>
          “Everyone at Frontside has a great attitude of{' '}
          <strong className={textExtrabold}>can do</strong> and{' '}
          <strong className={textExtrabold}>we will solve this</strong>. Their
          work ethic is strong, coupled with the desire to be a great partner.”
        </blockquote>
        <p className={bigQuoteAuthor}>
          &mdash; Brian Beale, Director of Software Engineering at Resideo
        </p>
        <ul className={columnedhighlights}>
          <li className={aboutHighlight}>
            <h3 className={aboutHighlightHeading}>
              <span className={textPink}>We build</span>
              <br />
              long-lasting software
            </h3>
            <p>
              High-quality applications should not require re-writing every few
              months or years. We design future-forward software system with
              predictable long-term maintenance.
            </p>
            <img src={decor1} className={aboutHighlightDecor} alt="" />
          </li>
          <li className={aboutHighlight}>
            <h3 className={aboutHighlightHeading}>
              <span className={textSkyblue}>We plan</span>
              <br />
              for evolution
            </h3>
            <p>
              The best version of your software always exists in the future. We
              provide robust architectures and tools that enable your team to
              experiment and pivot quickly.
            </p>
            <img src={decor2} className={aboutHighlightDecor} alt="" />
          </li>
          <li className={aboutHighlight}>
            <h3 className={aboutHighlightHeading}>
              <span className={textPink}>We favor</span>
              <br />
              delivering consistenly
            </h3>
            <p>
              Not delivering features fast enough can have costly consequences.
              We equip your teams with the tools and know-how to minimize
              regressions and shorten feedback loops.
            </p>
            <img src={decor3} className={aboutHighlightDecor} alt="" />
          </li>
          <li className={aboutHighlight}>
            <h3 className={aboutHighlightHeading}>
              <span className={textSkyblue}>We care</span>
              <br />
              about developer experience
            </h3>
            <p>
              The right tools get more done swiftly and effortlessly. We reduce
              bottlenecks and untangle technical complexities by automating
              deployments and other repetitive tasks.
            </p>
            <img src={decor4} className={aboutHighlightDecor} alt="" />
          </li>
          <li className={aboutHighlight}>
            <h3 className={aboutHighlightHeading}>
              <span className={textPink}>We lead</span>
              <br />
              with insight
            </h3>
            <p>
              The most substantial challenges in software design are not at the
              codebase level. We develop deep relationships with our clients to
              help them improve their velocity across the organization.
            </p>
            <img src={decor5} className={aboutHighlightDecorMarginFix} alt="" />
          </li>
          <li className={aboutHighlight}>
            <h3 className={aboutHighlightHeading}>
              <span className={textSkyblue}>We work</span>
              <br />
              with OSS contributors
            </h3>
            <p>
              Our long-standing relationships with top performing experts from
              the Open Source community allows us to bring you elite level
              talent who can address short term needs and identify issues on the
              horizon.
            </p>
            <img src={decor6} className={aboutHighlightDecor} alt="" />
          </li>
        </ul>
      </section>

      <section className={pageWrap}>
        <header className={sectionHeader}>
          <h2 className={heading2}>
            <strong className={textGradientSkybluePink}>Meet the team</strong>
          </h2>
          <p className={textLg}>
            We bring together people from interdisciplinary backgrounds.
          </p>
        </header>
        <ul className={aboutTeamList}>
          {formattedPeople.map((person, i) => (
            <li className={featureRow} key={i}>
              <div className={featureTextAlternate}>
                <h3 className={heading2NoMargin}>
                  <Link to={person.slug} className={textBlueDashWhite}>
                    {person.name}
                  </Link>
                </h3>
                <strong>{person.title}</strong>
                <p>{person.location}</p>
                <p>{person.intro}</p>
              </div>
              <div className={featureImage}>
                {person.img && (
                  <img
                    src={person.img.childImageSharp.fixed.src}
                    alt={person.imgAlt}
                    className={aboutTeamImg}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
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

export const peoplePageQuery = graphql`
  query PeopleListQuery {
    site {
      siteMetadata {
        title
      }
    }
    allPeople(
      filter: {
        person: { frontmatter: { alumnus: { ne: true }, order: { gt: 0 } } }
      }
      sort: { order: ASC, fields: [person___frontmatter___order] }
    ) {
      edges {
        node {
          name
          slug
          person {
            frontmatter {
              title
              intro
              alumnus
              location
              img {
                childImageSharp {
                  fixed(width: 600) {
                    src
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
