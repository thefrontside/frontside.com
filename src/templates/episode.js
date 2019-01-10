import React from "react";
import Helmet from "react-helmet";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import Content from "../components/content";
import Text from "../components/text";

export default function EpisodeRoute({
  data: {
    site: {
      siteMetadata: { title: siteTitle }
    },
    simplecastEpisode: { title, longDescriptionHtml, authors, publishedAt }
  }
}) {
  return (
    <Layout>
      <Helmet title={`${title} | ${siteTitle}`} />
      <Content>
        <Text tag="h1">{title}</Text>
        <Text tag="p">
          Hosts:{" "}
          {authors.map((author, i) => (
            <span key={author.fields.slug}>
              <Link to={author.fields.slug}>
                {author.frontmatter.name}
              </Link>
              {authors.length > i + 1 ? ", " : null}
            </span>
          ))}
          <br />
          Published on: {new Date(publishedAt).toLocaleDateString("en-US")}
        </Text>
        <div dangerouslySetInnerHTML={{ __html: longDescriptionHtml }} />
      </Content>
    </Layout>
  );
}

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
      longDescriptionHtml
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
