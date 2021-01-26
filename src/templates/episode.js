import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Content from '../components/content';
import format from 'dateformat';
import Text from '../components/text';

import './episode.css';

export default function EpisodeRoute({
  data: {
    simplecastEpisode: {
      slug,
      title,
      longDescriptionHtml,
      authors,
      publishedAt,
      sharingUrl,
    },
  },
}) {
  let [, shareId] = sharingUrl.match(/.*\/(.*)$/);
  let isAfter2021 = (new Date(publishedAt)).getFullYear() >= 2021;
  let heroImage = `/img/podcast-heroes/${(isAfter2021) ? slug : 'podcast-default'}.png`;


  return (
    <Layout title={title} image={heroImage}>
      <section className="widewrapper herowrapper blog-post-hero w-container">
        <div className="herotext">
          <h1 className="heading blog-post-heading">
            {title}
          </h1>
          <p className="subheader blog-post-meta">
            Hosted by
            {authors.map((author, i) => (
            <>
              {i === 0 ? '' : ((authors.length) > 2 ? ', ' : ' and ')}
              {/* Author links will lead to team member page, which is currently pending. */}
              {/* <Link key={author.slug} to={author.slug}>
                <Text>{author.name}</Text>
              </Link> */}
              <Text key={author.fields.slug} >{author.frontmatter.name}</Text>
            </>
          ))}
            <br />
            <span class="blog-post-date">
              {format(publishedAt, `" on " mmmm dS, yyyy"."`)}
            </span>
          </p>
        </div>
        <div className="blog-post-hero-image">
        <img src={heroImage} alt="" />
        </div>
      </section>
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
        <section
          className="episode-transcript"
          dangerouslySetInnerHTML={{ __html: longDescriptionHtml }}
        />
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
      slug
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
