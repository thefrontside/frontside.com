import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";

export default function IndexPage({ data: { allMarkdownRemark, allSimplecastEpisode } }) {
  let posts = allMarkdownRemark.edges.map(({ node }) => node);
  let episodes = allSimplecastEpisode.edges.map(({ node }) => node);
  return (
    <Layout>
      <section>
        <strong>
          Build a better platform—without the missteps, timeline setbacks, or{" "}
          <i>even regressions</i>.
        </strong>
        <p>We help your team build web applications at scale.</p>
      </section>
      <section>
        <div className="column">
          <p>
            When your framework decisions today will impact the state of your
            product—and team—for years to come, we’ve got your back.
          </p>
          <p>
            Frontside is a small team with deep experience in web UI platform
            integrations. Since 2005, we’ve been helping engineering teams build
            rock-solid web applications—and assembling the toolkits that support
            them.
          </p>
        </div>
        <div className="column">
          <Link to="services">See how we can Help</Link>
        </div>
      </section>
      <section>
        <h3>Trusted by top development teams</h3>
        <ul>
          <li>
            <img src="" alt="Honeywell logo" />
          </li>
          <li>
            <img src="" alt="Dell logo" />
          </li>
          <li>
            <img src="" alt="Conde Nast logo" />
          </li>
          <li>
            <img src="" alt="EBSCO logo" />
          </li>
          <li>
            <img src="" alt="SXSW logo" />
          </li>
          <li>
            <img src="" alt="Standard Chartered Bank logo" />
          </li>
        </ul>
      </section>
      <section>
        <h3>React. Ember. Angular. And many more.</h3>
        <p>
          We’re here to make your large-scale application projects run smoothly.
        </p>
        <Link to="about">Get to know us</Link>
      </section>
      <section>
        <div className="column">
          <h3>Latest on the blog</h3>
          <ul>
            {posts.map(post => (
              <li key={post.id}>
                <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
                <p>
                  Published by{" "}
                  {post.fields.authors.map(author => (
                    <Link to={author.fields.slug}>
                      {author.frontmatter.name}
                    </Link>
                  ))}{" "}
                  on {post.frontmatter.date}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="column">
          <h3>Latest on the podcast</h3>
          <ul>
            {episodes.map(episode => (
              <li key={episode.id}>
                <Link to={`/podcast/${episode.slug}`}>{episode.title}</Link>
                <p>
                  Published by{" "}
                  {episode.authors.map(author => (
                    <Link to={author.fields.slug}>
                      {author.frontmatter.name}
                    </Link>
                  ))}{" "}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    }),
    allSimplecastEpisode: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export const indexPageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      limit: 5
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
            authors {
              frontmatter {
                name
              }
              fields {
                slug
              }
            }
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
    allSimplecastEpisode(
      limit: 5
    ) {
      edges {
        node {
          id
          title
          slug
          authors {
            frontmatter {
              name
            }
            fields {
              slug
            }
          }
        }      
      }
    }
  }
`;
