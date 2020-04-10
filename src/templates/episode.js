import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import Content from "../components/content";
import format from "dateformat";

import "./episode.css";;

export default function EpisodeRoute({
  data: {
    simplecastEpisode: {
      title,
      longDescriptionHtml,
      authors,
      publishedAt,
      sharingUrl
    }
  }
}) {
  let [, shareId] = sharingUrl.match(/.*\/(.*)$/);

  return (
    <Layout title={title}>
      <Content>
        <iframe
          frameBorder="0"
          height="200px"
          scrolling="no"
          seamless
          src={`https://embed.simplecast.com/${shareId}?color=f5f5f5`}
          width="100%"
          title={title}
        />
        <div>
          {"Hosted by "}
          {authors.map((author, i) => (
            <span key={author.fields.slug}>
              <Link to={author.fields.slug}>{author.frontmatter.name}</Link>
              {authors.length > i + 1 ? ", " : null}
            </span>
          ))}
          {format(publishedAt, `" on " mmmm dS, yyyy"."`)}
        </div>
        <section className="episode-transcript" dangerouslySetInnerHTML={{ __html: longDescriptionHtml }} />
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
      title
      description
      longDescriptionHtml
      publishedAt
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
