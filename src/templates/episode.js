import React from "react";
import Helmet from "react-helmet";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";

function EpisodeRoute({
  data: {
    site: {
      siteMetadata: { title: siteTitle }
    },
    simplecastEpisode: { title, description, authors }
  }
}) {
  return (
    <Layout>
      <Helmet title={`${title} | ${siteTitle}`} />
      <h1>{title}</h1>
      <p>{description}</p>
      <ul>
        {authors.map(author => (
          <li key={author.fields.slug}>
            <Link to={author.fields.slug}>{author.frontmatter.name}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export default EpisodeRoute;

export const episodePageQuery = graphql`
  query EpisodePage($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    simplecastEpisode(id: { eq: $id }) {
      id
      season
      number
      title
      description
      publishedAt
      audioUrl
      sharingUrl
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
`;
