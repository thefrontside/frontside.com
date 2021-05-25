const fs = require('fs/promises');
const path = require('path');
const assert = require('assert');
const fetch = require('node-fetch');

const cacheFile = path.join(__dirname, './data.json');

module.exports = async function getPodcast(apiKey, podcastId) {
  // try reading from the data file
  try {
    const podcastCache = await fs.readFile(cacheFile);
    return JSON.parse(podcastCache);
  } catch (e) {
    // if it errors, fetch directly and save response
    console.warn(
      `Could not find ${cacheFile}. Fetching fresh from the simplecast API.`
    );
    return cacheEpisodes(apiKey, podcastId);
  }
};

async function fetchEpisodes(apiKey, podcastId, limit = 10000, offset = 0) {
  assert(
    apiKey,
    `gatsby-source-simplecast requires SimpleCast API apiKey to be specified in options expected a string, received ${apiKey}`
  );
  assert(
    podcastId,
    `gatsby-source-simplecast requires SimpleCast podcastId to be specified in options expected to be present, received ${podcastId}`
  );

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  };

  return await fetch(
    `https://api.simplecast.com/podcasts/${podcastId}/episodes?limit=${limit}&offset=${offset}`,
    requestOptions
  )
    .then(response => response.json()) // returns list of episodes
    .then(result =>
      Promise.all(
        // for each episode, query it direct to get more info
        // this is necessary for obtaining authors for example
        result.collection.map(episodeMetadata =>
          fetch(
            `https://api.simplecast.com/episodes/${episodeMetadata.id}`,
            requestOptions
          )
            .then(async response => response.json())
            .catch(error => console.log('error', error))
        )
      ).catch(error => console.log('error', error))
    )
    .then(episodes => ({ episodes })) // place episodes in object
    .catch(error => console.log('error', error));
}

async function cacheEpisodes(apiKey, podcastId) {
  const episodes = await fetchEpisodes(apiKey, podcastId).catch(e => {
    throw new Error(e);
  });
  // write it out to a `data.json` that is adjacent to this file
  await fs.writeFile(cacheFile, JSON.stringify(episodes, null, 2));
  return episodes;
}

// if you run this file directly, it will query and update the data.json file
// and this also includes a helper for testing a query response quickly
if (process.argv0 === 'node' && process.argv[1].endsWith('get-episodes.js')) {
  const apiKey = process.env.SIMPLECAST_API;
  const podcastId = 'c27dcb5f-6c33-4c38-99c1-b32d3b52fec1';
  if (process.argv[2]) {
    // no top level awake :(
    async function log() {
      const episodes = await fetchEpisodes(
        apiKey,
        podcastId,
        process.argv[2],
        process.argv[3] || 1
      );
      console.log(episodes);
    }
    return log();
  } else {
    return cacheEpisodes(apiKey, podcastId).catch(e => {
      console.error(e);
    });
  }
}
