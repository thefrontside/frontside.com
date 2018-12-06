const assert = require("assert");
const SimpleCastClient = require("simplecast-api-client");
const camelCase = require("lodash.camelcase");
const kebabCase = require("lodash.kebabcase");
const { EPISODE_TYPE } = require('./constants');

const { keys } = Object;

exports.setFieldsOnGraphQLNodeType = require("./extend-node-type").setFieldsOnGraphQLNodeType;

exports.sourceNodes = async (
  {
    actions: { createNode, createNodeField },
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

  let episodes;
  try {
    episodes = await client.episodes.getEpisodes(podcastId);
  } catch (e) {
    console.error(`Could not retrieve episodes for podcast ${podcastId}`, e);
    return;
  }

  function createEpisode(episode) {
    const nodeId = createNodeId(`simplecast-episode-${episode.id}`);
    const nodeContent = JSON.stringify(episode);

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
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: EPISODE_TYPE,
        content: nodeContent,
        contentDigest: createContentDigest(episode)
      }
    });
  }

  episodes.forEach(createEpisode);
};