import React from 'react';

import { graphql } from 'gatsby';
import Layout from '../../components/layout';
import Hero from '../../components/hero';
import Text from '../../components/text';
import Content from '../../components/content';
import TeamList from '../../components/team-list';
import CaseStudyCall from '../../components/case-study-call';
import { Link } from 'gatsby';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faComment } from '@fortawesome/free-solid-svg-icons';

import './index.css';

const coreSlugs = [
  '/people/charles-lowell/',
  '/people/jeffrey-cherewaty/',
  '/people/taras-mankovski/',
];

const AboutPage = ({
  data: {
    allMarkdownRemark: { edges: team },
  },
}) => {
  let people = team.map(({ node }) => ({
    name: node.frontmatter.name,
    slug: node.fields.slug,
    img: node.frontmatter.img,
    intro: node.frontmatter.intro,
  }));

  let coreTeam = coreSlugs.map(slug => {
    return people.find(person => person.slug.indexOf(slug) >= 0);
  });
  let otherTeam = people.filter(
    person => coreSlugs.indexOf(person.slug) === -1
  );
  let orederedTeam = [...coreTeam, ...otherTeam];

  return (
    <Layout title="About">
      <Hero
        heading={
          <Text>
            We've been bringing predictability to application development since
            2005.
          </Text>
        }
      />

      <Content>
        <Text tag="p">
          Frontside serves as a platform for technology leaders with a shared
          philosophy on software quality to come together and enable the next
          generation of engineering teams.
        </Text>
        <Text tag="p">
          Thanks to our extensive experience working with large-scale projects,
          we can leverage your team to embrace modern tooling and technologies.
          Get ready to deliver outstanding experiences to your users
          consistently, while enabling cross-teams collaboration in your
          organization as you have not seen before.
        </Text>
        <div className="about-features">
          <p className="about-feature">
            <em>Each</em> of our <em>technical leaders</em> has
            <strong>10-20 years of experience</strong>
            in <em>frontend engineering</em>.
          </p>
          <p className="about-feature">
            Our <em>approach</em> to frontend is
            <strong>Framework Agnostic</strong>
            We find the <em>right fit</em> for each case.
          </p>
          <p className="about-feature">
            The <em>quality</em> of our work creates
            <strong>Long-lasting software</strong>
            With clients <em>still using</em> and mantaining our code{' '}
            <em>after half a decade</em>.
          </p>
          <p className="about-feature">
            Our solutions are technically outstanding and
            <strong>Business Oriented</strong>
            In order to <em>maximize the value</em> of software in time.
          </p>
        </div>

        <h2 className="frontside-separator">
          <span className="frontside-separator--text">Our Principles</span>
        </h2>

        <div className="frontside-values">
          <h3>Automated Visibility</h3>
          <p>
            We make it easy for teams to collaborate by automating the delivery
            process, including real-time demos of your projects as your team
            makes progress. You get fast feedback, and the team can focus on
            delivering exactly what’s needed.
          </p>
          <h3>Flexible Architecture</h3>
          <p>
            Stay ready and responsive to changing business or technology
            requirements. We help you plan a resilient architecture for your
            software and prepare your team so they can nimbly experiment with
            new features and technologies.
          </p>
          <h3>Long-Lasting Software</h3>
          <p>
            Using leading-edge technologies doesn’t have to mean compromising on
            quality. We spend the first portion of each project helping
            establish patterns and tools for building software that’s easy to
            maintain for years, even decades.
          </p>

          <h3>Constant Learning/Teaching</h3>
          <p>
            We are constantly learning the new developments on our ecosystem and
            pushing them forward. We also share all the knowledge we can with
            our clients and community.
          </p>
        </div>
      </Content>

      <Content>
        <h2 className="frontside-separator">
          <span className="frontside-separator--text">Our team</span>
        </h2>

        <TeamList people={orederedTeam} />

        <div className="cta-box">
          <header className="cta-box--header">
            <h2>
              <Link to="/contact">Let's talk</Link>
            </h2>
            <FontAwesomeIcon icon={faComment} />
          </header>
          <div className="cta-box--body">
            <p>
              Get in touch with one of our technical leaders to discover how our
              expertise can bring value to your organization.
            </p>
            <Link className="cta-box--contact" to="/contact">
              Contact us <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>
      </Content>

      <Content>
        <h2 className="frontside-separator">
          <span className="frontside-separator--text">Open Source</span>
        </h2>
        <p className="oss-intro-parragraph">
          Frontside is a small studio but brings big results by working
          alongside the open source community. We help you leverage the benefits
          of open source in your organization, letting you use better tools with
          less in-house maintenance.
        </p>
      </Content>

      <CaseStudyCall />
    </Layout>
  );
};

export default AboutPage;

export const aboutQuery = graphql`
  query AboutQuery {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/people/" }
        frontmatter: { alumnus: { ne: true } }
      }
    ) {
      edges {
        node {
          frontmatter {
            name
            intro
            img {
              childImageSharp {
                fixed(width: 300) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
