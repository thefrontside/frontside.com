import React from "react";
import Helmet from "react-helmet";
import { Link, graphql } from "gatsby";
import Layout from "../../components/layout";
import Img from "gatsby-image";

const AboutPage = ({
  data: {
    allMarkdownRemark,
    site: {
      siteMetadata: { title }
    }
  }
}) => {
  let team = allMarkdownRemark.edges.map(({ node }) => node);

  return (
    <Layout>
      <Helmet title={`About | ${title}`} />
      <section>
        <strong>
          Bringing predictability to web application projects since 2005
        </strong>
      </section>
      <section>
        <div class="column">
          We help you choose the best solution for long-term maintainability
        </div>
        <div class="column">
          <p>
            Choosing frontend technologies on an as-needed basis can lead to a
            complicated web of conflicting code.
          </p>
          <p>
            Our goal, on the other hand, is to help you identify and utilize the
            right tools that will set the stage for your frontend code bases for
            years to come.
          </p>
          <p>
            So expect longevity. Expect higher quality work than you’ve ever
            created before, and see what it’s like to have the time to focus on
            new features instead of triaging bugs.
          </p>
        </div>
      </section>
      <section>
        <h2>With Frontside, your team can deploy faster</h2>
        <h3>Deep technical experience</h3>
        <p>
          Every member of our team has significant experience in web UI
          platforms. From day one, you’ll get practical guidance on how to
          navigate interactions between frameworks like React, Angular, Ember,
          and more—all from specialists who have experienced similar challenges
          firsthand.
        </p>
        <h3>Systems that scale</h3>
        <p>
          We help development teams multiply their productivity with testing and
          deployment methods that ensure every line of code is ready for the
          long haul.
        </p>
        <h3>Predictable results</h3>
        <p>
          By embedding ourselves in your team, we remove the unknowns. Get
          in-depth insight on your toughest challenges, see real progress every
          step of the way, and watch your team write the highest quality code of
          their careers.
        </p>
      </section>
      <section>
        <h2>We’re active members of the open source community</h2>
        <p>
          When your platform is missing a key tool that doesn’t exist yet, we
          build it ourselves. This means we’re able to create the perfect
          solution for your organization while contributing to the open source
          community. Our latest tool is{" "}
          <a href="https://bigtestjs.io">BigTest</a>, designed to test single
          page apps faster than any similar solutions available today.
        </p>
        <a href="/work">Learn more about our work</a>
      </section>
      <section>
        <h2>Meet the team</h2>
        <ul>
          {team.map(person => (
            <li key={person.frontmatter.name}>
              <Link to={person.fields.slug}>
                <Img fixed={person.frontmatter.img.childImageSharp.fixed} />
                {person.frontmatter.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Feel confident in what you’re building</h2>
        <p>
          We’ll help you make the best choices for your platform’s long-term
          health so you can move forward with certainty. Contact us today to get
          practical guidance on your toughest platform challenges.
        </p>
        <Link to="contact">Get Started</Link>
      </section>
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
