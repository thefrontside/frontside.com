import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../../components/layout';
import EpisodesList from '../../components/episodes-list';
import Text from '../../components/text';

const PodcastPage = ({
  data: {
    allSimplecastEpisode: { edges },
  },
}) => {
  return (
    <Layout title="Podcast">
      <EpisodesList
        heading={<Text tag="h2">The Frontside Podcast</Text>}
        episodes={edges.map(({ node }) => {
          return {
            title: node.title,
            slug: node.slug,
            id: node.id,
            description: node.description,
            date: new Date(node.publishedAt).toLocaleDateString('en-US'),
            authors: node.fields.authors.filter(Boolean).map(author => ({
              slug: author.fields.slug,
              name: author.frontmatter.name,
            })),
          }
        })}
      />
    </Layout>
  );
};

PodcastPage.propTypes = {
  data: PropTypes.object.isRequired,
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
          title
          description
          slug
          publishedAt
          fields {
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
  }
`;
