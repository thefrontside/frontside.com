const { camelCase, kebabCase } = require('lodash');
const { EPISODE_TYPE } = require('./constants');
const getPodcast = require('./get-episodes');

const { keys } = Object;

exports.setFieldsOnGraphQLNodeType = require('./extend-node-type').setFieldsOnGraphQLNodeType;

exports.sourceNodes = async (
  { actions: { createNode }, createNodeId, createContentDigest },
  { apiKey, podcastId }
) => {
  try {
    const podcast = await getPodcast(apiKey, podcastId);
    for (let episode of podcast.episodes) {
      let nodeId = createNodeId(`simplecast-episode-${episode.id}`);
      let nodeContent = JSON.stringify(episode);

      const data = keys(episode).reduce(
        (camelcased, key) => ({
          ...camelcased,
          [camelCase(key)]: episode[key],
        }),
        {}
      );

      const authors = episode.authors.collection.reduce((authors, item) => {
        const authorArray = item.name.split(',').map(author => author.trim());
        return authors.concat(authorArray);
      }, []);

      // we may want to normalize the urls in the future, but for now, overwrite this
      // single episode so it matches the old url, otherwise everything matches the old url
      const slug = episode.title.startsWith('100')
        ? '100-100-th-episode-celebration-with-brandon-hays'
        : kebabCase(episode.title);

      createNode({
        ...data,
        slug,
        authors,
        episodeId: episode.id,
        id: nodeId,
        parent: null,
        children: [],
        internal: {
          type: EPISODE_TYPE,
          content: nodeContent,
          contentDigest: createContentDigest(episode),
        },
      });
    }
  } catch (e) {
    console.error(`Could not retrieve episodes for podcast ${podcastId}`, e);
    return;
  }
};

// https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#createResolvers
// resolve the each item in the array of `authors` to a `People` node
exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    SimplecastEpisode: {
      authorNodes: {
        type: ['People'],
        resolve: (source, args, context, info) =>
          Promise.all(
            source.authors.map(author =>
              context.nodeModel.runQuery({
                query: {
                  filter: {
                    name: { eq: author },
                  },
                },
                type: 'People',
                firstOnly: true,
              })
            )
          ),
      },
    },
  };
  createResolvers(resolvers);
};
