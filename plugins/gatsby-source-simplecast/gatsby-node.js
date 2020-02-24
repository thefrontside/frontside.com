const assert = require("assert");
const SimpleCastClient = require("simplecast-api-client");
const camelCase = require("lodash.camelcase");
const kebabCase = require("lodash.kebabcase");
const { EPISODE_TYPE } = require('./constants');

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

  let episodes;
  let dev_samplecast = [{
    id: 1,
    number: 1,
    season: 1,
    podcast_id: 96,
    guid: '00000',
    title: "001: Podcast Example",
    author: 'Charles Lowell, Taras Mankovski',
    duration: 100,
    explicit: false,
    published: true,
    description: 'Sample Description',
    long_description: 'You are seeing this because you\'re in development mode and do not have access to SIMPLECAST_API key.',
    published_at: '2019-01-01T06:20:00.000-07:00',
    audio_file_size: 100000,
    audio_url: 'http://audio.simplecast.com/41252.mp3',
    sharing_url: 'https://simplecast.com/s/e3b70a0d'
  }];

  console.log("PENE", process.env.NODE_ENV, "WEEEEEEEEEEEEEEEE");

  if (process.env.NODE_ENV == 'development' && process.env.SIMPLECAST_API) {
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
      episodes = await client.episodes.getEpisodes(podcastId);
    } catch (e) {
      console.error(`Could not retrieve episodes for podcast ${podcastId}`, e);
      return;
    }
  } else {
    episodes = dev_samplecast;
    podcastId = 96;
  };

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
