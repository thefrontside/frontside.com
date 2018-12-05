import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Layout from "../../components/Layout";
import Helmet from "react-helmet";
// import Img from "gatsby-image"

const PodcastPage = ({
  data: {
    site: {
      siteMetadata: { title }
    },
    allSimplecastEpisode: {
      edges
    }
  }
}) => {
  let episodes = edges.map(({ node }) => node);

  return (
    <Layout>
      <Helmet title={`Team | ${title}`} />
      <ul>
        {episodes.map(episode => (
          <li key={episode.id}>
            <h3><Link to={`/podcast/${episode.slug}`} >{episode.title}</Link></h3>
            <p>{episode.description}</p>
            <ul>
              {episode.authors.map(author => (
                <li key={author.fields.slug}>
                  <Link to={author.fields.slug}>
                    {author.frontmatter.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

PodcastPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default PodcastPage;

export const episodesQuery = graphql`
  query EpisodesQuery {
    site {
      siteMetadata {
        title
      }
    }
    allSimplecastEpisode {
      edges {
        node {
          id
          number
          season
          title
          description
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
