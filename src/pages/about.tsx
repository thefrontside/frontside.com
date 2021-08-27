import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/layout';

import {
  PageWrap,
  HeroWrap,
  HeroText,
  HeroImage,
  FeatureRow,
  FeatureTextAlternate,
  FeatureImage,
  SectionHeader,
  ColumnedHighlights,
  AboutHighlight,
  AboutHighlightDecor,
  AboutTeamImg,
} from '../styles/page.css';
import {
  TextGradientSkybluePink,
  TextGradientSkybluePurple,
  BigQuote,
} from '../styles/typography.css';
import { atoms } from '../styles/atoms.css';

import aboutHero from '../img/q3-2021/about-hero.png';
import decor1 from '../img/q3-2021/about-decor-1.png';
import decor2 from '../img/q3-2021/about-decor-2.png';
import decor3 from '../img/q3-2021/about-decor-3.png';
import decor4 from '../img/q3-2021/about-decor-4.png';
import decor5 from '../img/q3-2021/about-decor-5.png';
import decor6 from '../img/q3-2021/about-decor-6.png';

import charles from '../img/q3-2021/team/charles.jpg';
import taras from '../img/q3-2021/team/taras.jpg';
import jeffrey from '../img/q3-2021/team/jeffrey.jpg';
import rachelle from '../img/q3-2021/team/rachelle.jpg';
import paul from '../img/q3-2021/team/paul.jpg';
import elrick from '../img/q3-2021/team/elrick.jpg';
import jacob from '../img/q3-2021/team/jacob.jpg';
import min from '../img/q3-2021/team/min.jpg';
import jorge from '../img/q3-2021/team/jorge.jpg';

// FIX: I couldn't make the people query work so I'm hard coding it here
const teamMembers = [
  {
    name: 'Charles Lowell',
    title: 'Founder / Head of Research \u0026  Development',
    location: 'Austin, Texas \u2014 Helsinki, Finland',
    bio: `
      More than 25 years ago, Charles torched a promising career in
      biochemistry and joined the dot-com revolution. After coding
      daily on systems big and small, he founded Frontside in 2005
      based on the belief that good software development patterns are
      universal. Charles currently researches testing platforms and
      structured concurrency to power up every developer’s daily
      coding life.
  `,
    image: charles,
    imageAlt:
      'Portrait of Charles Lowell. He has a salt and pepper beard beard and a hat.',
  },
  {
    name: 'Taras Mankovski',
    title: 'CEO',
    location: 'Toronto, Canada',
    bio: `
      Taras began his journey into the realm of digital technology
      when in early 2000s his first clients started asking him to
      build websites. He quickly realized that rather than go it alone
      how much more satisfying it was to bring together cross
      disciplinary teams to work collaboratively towards common goals.
      At Frontside, Taras creates and nourishes relationships among
      his team, clients and partners to achieve ambitious long-term
      objectives.
    `,
    image: taras,
    imageAlt:
      'Portrait of Taras. He has long straight hair. He has no beard in this picture but usually fashions a short stubble.',
  },
  {
    name: 'Jeffrey Cherewaty',
    title: 'COO',
    location: 'Austin, Texas',
    bio: `
      After succeeding in the trenches of the startup world—leading
      frontend teams through hyper-growth and a decade consulting for
      global corporations—Jeffrey now calls himself a "software
      diplomat." With a masters in Software Engineering from The
      University of Texas at Austin, he facilitates technical
      conversations and rolls up his sleeves to make change happen.
    `,
    image: jeffrey,
    imageAlt: 'Portrait of Jeffrey. He has a short haircut and no beard.',
  },
  {
    name: 'Rachelle Stewart',
    title: 'Business Administrator',
    location: 'Richmond, Virginia',
    bio: `
      After leaving the U.S. Air Force, Rachelle began her decade-long
      career in business administration. She has successfully managed
      two businesses of her own and earned an MBA from Capella
      University. She now orchestrates financial and legal affairs at
      Frontside and is at the core of its strategic planning.
    `,
    image: rachelle,
    imageAlt: "Portrait of Rachelle. She's wearing a hat and has curly hair.",
  },
  {
    name: 'Paul Cowan',
    title: 'Engineering Consultant',
    location: 'Glasgow, Scotland (UK)',
    bio: `
      In his more than 20 years of experience, Paul has done it all:
      from leading the entire frontend division of a key public
      institution to working on one of the most famous worldwide yacht
      races. Indeed, large British banks also carry Paul's work in
      their codebases. Not only is he an elite developer, but he also
      shines in Competitive Boxing and MMA. At Frontside, Paul
      specializes in building tools and automation that power up
      developers.
    `,
    image: paul,
    imageAlt: 'Portrait of Paul sporting trimmed haircut and beard.',
  },
  {
    name: 'Elrick Ryan',
    title: 'Engineering Consultant',
    location: 'Boston, Massachusetts',
    bio: `
      For over a decade, Elrick has been leading product teams as a
      creative engineer. Drawing from his background in print design
      and marketing, he brings together impeccable user experiences
      that deliver business value.
    `,
    image: elrick,
    imageAlt: 'Portrait of Elrick. He has short hair and a short beard.',
  },
  {
    name: 'Min Kim',
    title: 'Engineering Consultant',
    location: 'Toronto, Canada',
    bio: `
      Min's career as a professional cellist took a turn when a friend
      introduced him to programming a few years ago. He now
      specializes in creating developer tools and CI/CD pipelines, and
      has two Google Cloud certificates under his belt.
    `,
    image: min,
    imageAlt:
      "Portrait of Min. He's wearing round glasses and has medium-long hair. He's holding a cello.",
  },
  {
    name: 'Jacob Bolda',
    title: 'Engineering Consultant',
    location: 'Milwaukee, Wisconsin',
    bio: `
      After designing skylights and touring the US and Europe through
      structural engineering, Jacob started transitioning to software
      engineering over the past decade. At Frontside, he combines the
      rigor he used to make buildings stand up with in-depth technical
      knowledge to ensure your development tools and apps will run
      smoothly.
    `,
    image: jacob,
    imageAlt:
      "Portrait of Jacob. He's sporting a trimmed haircut and a wide smile.",
  },
  {
    name: 'Jorge Lainfiesta',
    title: 'Director of Communications',
    location: 'Barcelona, Spain',
    bio: `
      After working in software engineering for five years, Jorge
      pursued his interests with a masters in digital communication at
      UCLA and AAU. Now Jorge channels the tech enthusiasm at
      Frontside into messages for everyone.
    `,
    image: jorge,
    imageAlt:
      "Portrait of Jorge. He has short hair a short stubble.",
  },
];

export default function IndexPage({
  data: {
    allPeople: { edges: people },
  },
}) {
  return (
    <Layout title="About Frontside">
      <header className={HeroWrap}>
        <div className={HeroText}>
          <h1
            className={atoms({
              fontScale: '3xl',
              fontWeight: 'extrabold',
              textTransform: 'uppercase',
            })}
          >
            We've been{' '}
            <span className={TextGradientSkybluePurple}>improving</span>{' '}
            engineering orgs{' '}
            <span className={atoms({ color: 'skyblue' })}>since 2005</span>
          </h1>
          <p className={atoms({ fontScale: 'lg' })}>
            We are a purposefully small group of engineers who want to create
            scale-ready tools.
          </p>
        </div>
        <div className={HeroImage}>
          <img src={aboutHero} alt="" />
        </div>
      </header>

      <section className={PageWrap}>
        <blockquote className={BigQuote}>
          “Everyone at Frontside has a great attitude of{' '}
          <strong className={atoms({ fontWeight: 'extrabold' })}>can do</strong>{' '}
          and{' '}
          <strong className={atoms({ fontWeight: 'extrabold' })}>
            we will solve this
          </strong>
          . Their work ethic is strong, coupled with the desire to be a great
          partner.”
        </blockquote>
        <p className={atoms({ textAlign: 'center', marginBottom: '2xl' })}>
          &mdash; Brian Beale, Director of Software Engineering at Resideo
        </p>
        <ul className={ColumnedHighlights}>
          <li className={AboutHighlight}>
            <h3
              className={atoms({ textTransform: 'uppercase', fontScale: 'lg' })}
            >
              <span className={atoms({ color: 'pink' })}>We build</span>
              <br />
              long-lasting software
            </h3>
            <p>
              High-quality applications should not require re-writing every few
              months or years. We design future-forward software system with
              predictable long-term maintenance.
            </p>
            <img src={decor1} className={AboutHighlightDecor} alt="" />
          </li>
          <li className={AboutHighlight}>
            <h3
              className={atoms({ textTransform: 'uppercase', fontScale: 'lg' })}
            >
              <span className={atoms({ color: 'skyblue' })}>We plan</span>
              <br />
              for evolution
            </h3>
            <p>
              The best version of your software always exists in the future. We
              provide robust architectures and tools that enable your team to
              experiment and pivot quickly.
            </p>
            <img src={decor2} className={AboutHighlightDecor} alt="" />
          </li>
          <li className={AboutHighlight}>
            <h3
              className={atoms({ textTransform: 'uppercase', fontScale: 'lg' })}
            >
              <span className={atoms({ color: 'pink' })}>We favor</span>
              <br />
              delivering consistenly
            </h3>
            <p>
              Not delivering features fast enough can have costly consequences.
              We equip your teams with the tools and know-how to minimize
              regressions and shorten feedback loops.
            </p>
            <img src={decor3} className={AboutHighlightDecor} alt="" />
          </li>
          <li className={AboutHighlight}>
            <h3
              className={atoms({ textTransform: 'uppercase', fontScale: 'lg' })}
            >
              <span className={atoms({ color: 'skyblue' })}>We care</span>
              <br />
              about developer experience
            </h3>
            <p>
              The right tools get more done swiftly and effortlessly. We reduce
              bottlenecks and untangle technical complexities by automating
              deployments and other repetitive tasks.
            </p>
            <img src={decor4} className={AboutHighlightDecor} alt="" />
          </li>
          <li className={AboutHighlight}>
            <h3
              className={atoms({ textTransform: 'uppercase', fontScale: 'lg' })}
            >
              <span className={atoms({ color: 'pink' })}>We lead</span>
              <br />
              with insight
            </h3>
            <p>
              The most substantial challenges in software design are not at the
              codebase level. We develop deep relationships with our clients to
              help them improve their velocity across the organization.
            </p>
            <img
              src={decor5}
              className={atoms({ marginLeft: 'auto' })}
              alt=""
            />
          </li>
          <li className={AboutHighlight}>
            <h3
              className={atoms({ textTransform: 'uppercase', fontScale: 'lg' })}
            >
              <span className={atoms({ color: 'skyblue' })}>We work</span>
              <br />
              with OSS contributors
            </h3>
            <p>
              Our long-standing relationships with top performing experts from
              the Open Source community allows us to bring you elite level
              talent who can address short term needs and identify issues on the
              horizon.
            </p>
            <img src={decor6} className={AboutHighlightDecor} alt="" />
          </li>
        </ul>
      </section>

      <section className={PageWrap}>
        <header className={SectionHeader}>
          <h2
            className={atoms({
              fontScale: 'xl',
              fontWeight: 'extrabold',
              textTransform: 'uppercase',
            })}
          >
            <strong className={TextGradientSkybluePink}>Meet the team</strong>
          </h2>
          <p className={atoms({ fontScale: 'lg' })}>
            We bring together people from interdisciplinary backgrounds.
          </p>
        </header>
        <ul
          className={atoms({
            listStyle: 'none',
            padding: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          })}
        >
          {teamMembers.map((person, i) => (
            <li className={FeatureRow}>
              <div className={FeatureTextAlternate}>
                <h3
                  className={atoms({
                    fontScale: 'xl',
                    textTransform: 'uppercase',
                    marginY: 'none',
                  })}
                >
                  {person.name}
                </h3>
                <strong>{person.title}</strong>
                <p>{person.location}</p>
                <p>{person.bio}</p>
              </div>
              <div className={FeatureImage}>
                <img
                  src={person.image}
                  alt={person.imageAlt}
                  className={AboutTeamImg}
                />
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
    allPeople {
      group(field: person___frontmatter___alumnus) {
        edges {
          node {
            name
            person {
              frontmatter {
                title
                intro
                img {
                  childImageSharp {
                    fixed(width: 300) {
                      ...GatsbyImageSharpFixed
                    }
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
