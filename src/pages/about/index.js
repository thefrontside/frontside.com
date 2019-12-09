import React from "react";
import Helmet from "react-helmet";

import { graphql } from "gatsby";
import Layout from "../../components/layout";
import Hero from "../../components/hero";
import Text from "../../components/text";
import Content from "../../components/content";
import TeamList from '../../components/team-list';
import { Link } from 'gatsby';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faComment, faCodeBranch, faStar } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import './index.css';

const coreSlugs = [
  '/people/charles-lowell/',
  '/people/jeffrey-cherewaty/',
  '/people/taras-mankovski/'
];


const AboutPage = ({
  data: {
    allMarkdownRemark: { edges: team },
    site: {
      siteMetadata: { title }
    }
  }
}) => {

  let people = team.map(({ node }) => ({
    name: node.frontmatter.name,
    slug: node.fields.slug,
    img: node.frontmatter.img,
    intro: node.frontmatter.intro
  }));

  let coreTeam = coreSlugs.map((slug) => {
    return people.find(person => person.slug.indexOf(slug) >= 0);
  });
  let otherTeam = people.filter(person => coreSlugs.indexOf(person.slug) === -1);
  let orederedTeam = [...coreTeam, ...otherTeam];

  return (
    <Layout>
      <Helmet title={`About | ${title}`} />

      <Hero
        heading={
          <Text>
            We've been bringing predictability to application development since 2005.
          </Text>
        }
      />

      <Content>
        <Text tag="p">
          Frontside serves as a platform for technology leaders with a shared philosophy on software quality to come together and enable the next generation of engineering teams.
        </Text>
        <Text tag="p">
          Thanks to our extensive experience working with large-scale projects, we can leverage your team to embrace modern tooling and technologies. Get ready to deliver outstanding experiences to your users consistently, while enabling cross-teams collaboration in your organization as you have not seen before.
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
            With clients <em>still using</em> and mantaining our code <em>after half a decade</em>.
          </p>
          <p className="about-feature">
            Our solutions are technically outstanding and
            <strong>Business Oriented</strong>
            In order to <em>maximize the value</em> of software in time.
          </p>
        </div>

        <h2 className="frontside-separator">
          <span className="frontside-separator--text">
            Our Principles
          </span>
        </h2>

        <div className="frontside-values">
          <h3>
            Automated Visibility
          </h3>
          <p>
            We make it easy for teams to collaborate by automating the delivery process, including real-time demos of your projects as your team makes progress. You get fast feedback, and the team can focus on delivering exactly what’s needed.
          </p>
          <h3>
            Flexible Architecture
          </h3>
          <p>
            Stay ready and responsive to changing business or technology requirements. We help you plan a resilient architecture for your software and prepare your team so they can nimbly experiment with new features and technologies. 
          </p>
          <h3>
            Long-Lasting Software
          </h3>
          <p>
            Using leading-edge technologies doesn’t have to mean compromising on quality. We spend the first portion of each project helping establish patterns and tools for building software that’s easy to maintain for years, even decades.
          </p>

          <h3>
            Constant Learning/Teaching
          </h3>
          <p>
            We are constantly learning the new developments on our ecosystem and pushing them forward. We also share all the knowledge we can with our clients and community.
          </p>
        </div>
      </Content>

      <Content>
        <h2 className="frontside-separator">
          <span className="frontside-separator--text">
            Our team
          </span>
        </h2>

        <TeamList people={orederedTeam}/>

        <div className="cta-box">
          <header className="cta-box--header">
            <h2>
              <Link to="/contact">
                Let's talk
              </Link>
            </h2>
            <FontAwesomeIcon icon={faComment} />
          </header>
          <div className="cta-box--body">
            <p>
              Get in touch with one of our technical leaders to discover how our expertise can bring value to your organization.
            </p>
            <Link className="cta-box--contact" to="/contact">
              Contact us <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>
      </Content>

      <Content>
        <h2 className="frontside-separator">
          <span className="frontside-separator--text">
            Open Source
          </span>
        </h2>

        <p className="oss-intro-parragraph">
          Frontside is a small studio but brings big results by working alongside the open source community. We help you leverage the benefits of open source in your organization, letting you use better tools with less in-house maintenance.
        </p>

        <div className="oss-projects-list">
          <div className="oss-project">
            <h3>
              <a href="https://github.com/microstates" target="_blank"  rel="noopener noreferrer" className="oss-project--title">
                Microstates
              </a>
            </h3>
            <p>
              Immutable state primitives for building domain specific models that work equally well in all frameworks.
            </p>
            <footer>
              <a href="https://github.com/microstates" target="_blank"  rel="noopener noreferrer" className="oss-project--github-link">
                <FontAwesomeIcon icon={faGithub} />
                <span className="oss-project--stars-label">
                  <FontAwesomeIcon icon={faStar} />
                  1,236
                </span>
              </a>
            </footer>
          </div>
          <div className="oss-project">
            <h3>
              <a href="https://bigtestjs.io" target="_blank"  rel="noopener noreferrer" className="oss-project--title">
                Big Test
              </a>
            </h3>
            <p>
              Functional testing toolchain to create test suites that support testing applications consisting of multiple frameworks in a single application.
            </p>
            <footer>
              <a href="https://github.com/bigtestjs" target="_blank"  rel="noopener noreferrer" className="oss-project--github-link">
                <FontAwesomeIcon icon={faGithub} />
                <span className="oss-project--stars-label">
                  <FontAwesomeIcon icon={faStar} />
                  85
                </span>
              </a>
            </footer>
          </div>
          <div className="oss-project">
            <h3>
              <a href="https://github.com/thefrontside/frontmacs" target="_blank"  rel="noopener noreferrer" className="oss-project--title">
                Frontmacs
              </a>
            </h3>
            <p>
              A package-based, web-centric, customizable, awesome-by-default, acceptance-tested Emacs distribution.
            </p>
            <footer>
              <a href="https://github.com/thefrontside/frontmacs" target="_blank"  rel="noopener noreferrer" className="oss-project--github-link">
                <FontAwesomeIcon icon={faGithub} />
                <span className="oss-project--stars-label">
                  <FontAwesomeIcon icon={faStar} />
                  405
                </span>
              </a>
            </footer>
          </div>
          <div className="oss-project">
            <h3>
              <a href="https://github.com/thefrontside/funcadelic.js" target="_blank"  rel="noopener noreferrer" className="oss-project--title">
                funcadelic.js
              </a>
            </h3>
            <p>
              Haskell typeclasses and functional primitives for JavaScript
            </p>
            <footer>
              <a href="https://github.com/thefrontside/funcadelic.js" target="_blank"  rel="noopener noreferrer" className="oss-project--github-link">
                <FontAwesomeIcon icon={faGithub} />
                <span className="oss-project--stars-label">
                  <FontAwesomeIcon icon={faStar} />
                  158
                </span>
              </a>
            </footer>
          </div>
        </div>

        <div className="cta-box">
          <header className="cta-box--header">
            <h2>
              <Link to="/contact">
                Collaborate
              </Link>
            </h2>
            <FontAwesomeIcon icon={faCodeBranch} />
          </header>
          <div className="cta-box--body">
            <p>
            Reach out if you have feedback or questions about our projects, or just want to talk about open source.
            </p>
            <Link className="cta-box--contact" to="/contact">
              Contact us <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>
      </Content>

    </Layout>
  );
};

export default AboutPage;

export const aboutQuery = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
      }
    }
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
          fields {
            slug
          }
        }
      }
    }
  }
`;
