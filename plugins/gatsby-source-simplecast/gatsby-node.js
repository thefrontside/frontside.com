const { camelCase, kebabCase } = require('lodash');
const { EPISODE_TYPE } = require('./constants');
const getEpisodes = require('./get-episodes');

const { keys } = Object;

exports.setFieldsOnGraphQLNodeType = require("./extend-node-type").setFieldsOnGraphQLNodeType;

exports.sourceNodes = async (
  {
    actions: { createNode },
    createNodeId,
    createContentDigest
  },
  { apiKey, podcastId }
) => {

  assert(
    apiKey,
    `gatsby-source-simplecast requires SimpleCast API apiKey to be specified in options expected a string, received ${apiKey}`
  );
  assert(
    podcastId,
    `gatsby-source-simplecast requires SimpleCast podcastId to be specified in options expected to be present, received ${podcastId}`
  );
  let client = new SimpleCastClient({ apikey: apiKey });

  try {
    let episodes = await getEpisodes(client, podcastId);

    for (let episode of episodes) {
      let nodeId = createNodeId(`simplecast-episode-${episode.id}`);
      let nodeContent = JSON.stringify(episode);

      const data = keys(episode).reduce(
        (camelcased, key) => ({
          ...camelcased,
          [camelCase(key)]: episode[key]
        }),
        {
          slug: kebabCase(episode.title)
        }
      );


      createNode({
        ...data,
        id:  nodeId,
        parent: null,
        children: [],
        internal: {
          type: EPISODE_TYPE,
          content: nodeContent,
          contentDigest: createContentDigest(episode)
        }
      })
    }
  } catch (e) {
    console.error(`Could not retrieve episodes for podcast ${podcastId}`, e);
    return;
  }
};
