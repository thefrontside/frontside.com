import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import format from 'dateformat';
import PodcastCTA from '../components/follow-podcast';

import {
  heroWrap,
  heroText,
  heroImage,
  pageWrap,
  radiusMd,
} from '../styles/page.css';
import {
  heading3Xl,
  mardownColumn,
  textLg,
  textSm
} from '../styles/typography.css';

export default function EpisodeRoute({
  data: {
    simplecastEpisode: {
      episodeId,
      title,
      slug,
      descriptionHtml,
      longDescriptionHtml,
      publishedAt,
      authorNodes,
    },
  },
}) {
  let isAfter2021 = new Date(publishedAt).getFullYear() >= 2021;
  let heroImageUrl = `/img/podcast-heroes/${
    isAfter2021 ? slug : 'podcast-default'
  }.png`;

  return (
    <Layout
      title={title}
      image={heroImageUrl}
    >
      <header className={heroWrap}>
        <div className={heroText}>
          <h1
            className={heading3Xl}
          >
            {title}
          </h1>
          <p className={textLg}>
          Hosted by
            {authorNodes.filter(Boolean).map((author, i) => (
              <React.Fragment key={author.slug}>
              {i === 0 ? '' : authorNodes.length > 2 ? ', ' : ' and '}
              {/* Author links will lead to team member page, which is currently pending. */}
              {/* <Link key={author.slug} to={author.slug}>
                      <Text>{author.name}</Text>
                    </Link>
                */}
              {author.name}
            </React.Fragment>
          ))}{' '}
          </p>
          <p className={textSm}>
            {format(publishedAt, `mmmm dS, yyyy"."`)}
          </p>
        </div>
        <div className={heroImage}>
          <img src={heroImageUrl} alt="" className={radiusMd} />
        </div>
      </header>

      <div className={mardownColumn}>
      <div
          className="episode-markdown"
          dangerouslySetInnerHTML={{ __html: longDescriptionHtml }}
        />
        <iframe
          frameBorder="0"
          height="200px"
          scrolling="no"
          seamless
          src={`https://player.simplecast.com/${episodeId}`}
          width="100%"
          title={title}
        />
      </div>
      <PodcastCTA />
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
      episodeId
      title
      slug
      descriptionHtml
      longDescriptionHtml
      publishedAt
      authorNodes {
        name
        slug
      }
    }
  }
`;
