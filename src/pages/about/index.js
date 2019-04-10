import React from "react";
import Helmet from "react-helmet";

import { graphql } from "gatsby";
import Layout from "../../components/layout";
import Hero from "../../components/hero";
import Text from "../../components/text";
import Content from "../../components/content";
import Box from '../../components/box';
import Button, { ButtonGroup } from "../../components/button";
import TeamList from '../../components/team-list';
import { Link } from 'gatsby';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faComment } from '@fortawesome/free-solid-svg-icons';

import './index.css';
import logo from '../../img/logo-no-text.svg';

const AboutPage = ({
  data: {
    allMarkdownRemark: { edges: team },
    site: {
      siteMetadata: { title }
    }
  }
}) => {
  return (
    <Layout>
      <Helmet title={`About | ${title}`} />

      <Hero
        heading={
          <Text>
            We've been bringing predictability to web application projects since 2005.
          </Text>
        }
      />

      <Content>
        <Text tag="p">
          Every member of our team has significant experience in web UI platforms. From day one, you’ll get practical guidance on how to navigate interactions between frameworks like React, Angular, Ember, and more—all from specialists who have experienced similar challenges firsthand.
        </Text>
        <div className="about-features">
          <p className="about-feature">
            <em>Each</em> of our <em>leaders</em> has
            <strong>15-20 years of experience</strong>
            in <em>frontend engineering</em>.
          </p>
          <p className="about-feature">
            Our <em>leadership</em> benefits
            <strong>30 developers per leader</strong>
            in each <em>client team</em>.
          </p>
          <p className="about-feature">
            Our <em>approach</em> to frontend is
            <strong>Framework Agnostic</strong>
            We find the <em>right fit</em> for each case.
          </p>
          <p className="about-feature">
            Some other <em>awesome</em>
            <strong>Shiny Feature</strong>
            goes <em>here</em>.
          </p>
        </div>

        <h2 className="frontside-separator">
          <span className="frontside-separator--text">
            <span>The</span>
            <img src={logo} alt="Frontside" />
            <span>values</span>
          </span>
        </h2>

        <div className="frontside-values">
          <h3>
            Future ready solutions
          </h3>
          <p>
            We help our clients move with confidence by taking decisions that prepare them for the future. We are mindful of the implications each choice will have today and tomorrow.
          </p>

          <h3>
            Development Experience
          </h3>
          <p>
            We believe in empowering engineers with the right tools and setup for a delightful and productive development experience. This includes a robust test strategy that will allow everyone to keep moving nimbly.
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
            <span>Meet the</span>
            <img src={logo} alt="Frontside" />
            <span>team</span>
          </span>
        </h2>

        <TeamList people={team.map(({ node }) => ({
          name: node.frontmatter.name,
          slug: node.fields.slug,
          img: node.frontmatter.img
        }))}/>

        <div className="cta-box">
          <header className="cta-box--header">
            <h2>
              <Link to='contact'>
                Let's talk
              </Link>
            </h2>
            <FontAwesomeIcon icon={faComment} />
          </header>
          <div className="cta-box--body">
            <p>
              Get in touch with one of our technical leaders to discover how our expertise can bring value to your organization.
            </p>
            <Link className="cta-box--contact" to='contact'>
              Contact us <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>
      </Content>

      <Content>
        <Text tag="h2">
          We help you choose the best solution for long-term maintainability
        </Text>
        <Text tag="p">
          Choosing frontend technologies on an as-needed basis can lead to a
          complicated web of conflicting code.
        </Text>
        <Text tag="p">
          Our goal, on the other hand, is to help you identify and utilize the
          right tools that will set the stage for your frontend code bases for
          years to come.
        </Text>
        <Text tag="p">
          So expect longevity. Expect higher quality work than you’ve ever
          created before, and see what it’s like to have the time to focus on
          new features instead of triaging bugs.
        </Text>
      </Content>

      <Content>
        <Box direction="column">
          <Text tag="h2" className="margin-bottom-triple">
            With Frontside, your team can deploy faster
          </Text>
          <Box marginBottom="double">
            <Text tag="h3">Deep technical experience</Text>
            <Text tag="p">
              Every member of our team has significant experience in web UI
              platforms. From day one, you’ll get practical guidance on how to
              navigate interactions between frameworks like React, Angular, Ember,
              and more—all from specialists who have experienced similar challenges
              firsthand.
            </Text>
          </Box>
          <Box marginBottom="double">
            <Text tag="h3">Systems that scale</Text>
            <Text tag="p">
              We help development teams multiply their productivity with testing and
              deployment methods that ensure every line of code is ready for the
              long haul.
            </Text>
          </Box>
          <Box>
            <Text tag="h3">Predictable results</Text>
            <Text tag="p">
              By embedding ourselves in your team, we remove the unknowns. Get
              in-depth insight on your toughest challenges, see real progress every
              step of the way, and watch your team write the highest quality code of
              their careers.
            </Text>
          </Box>
        </Box>
      </Content>

      <Content>
        <Text tag="h2">
          We’re active members of the open source community
        </Text>
        <Text tag="p">
          When your platform is missing a key tool that doesn’t exist yet, we
          build it ourselves. This means we’re able to create the perfect
          solution for your organization while contributing to the open source
          community. Our latest tool is <a href="https://bigtestjs.io">BigTest</a>, designed to test single
          page apps faster than any similar solutions available today.
        </Text>
        <ButtonGroup>
          <Button to="/work">
            <Text>Learn more about our work</Text>
          </Button>
        </ButtonGroup>
      </Content>

      <Content>
        <Text tag="h2">
          Feel confident in what you’re building
        </Text>
        <Text tag="p">
          We’ll help you make the best choices for your platform’s long-term
          health so you can move forward with certainty. Contact us today to get
          practical guidance on your toughest platform challenges.
        </Text>
        <ButtonGroup>
          <Button to="/contact">Get Started</Button>
        </ButtonGroup>
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
