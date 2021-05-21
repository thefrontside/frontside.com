const SimpleCastClient = require("simplecast-api-client");

module.exports = async function getEpisodes(client, podcastId) {
  let episodes = await client.episodes.getEpisodes(podcastId, { limit: 100000 });
  let results = [];
  for (let group of batch(episodes.collection, 2)) {
    results = results.concat(await Promise.all(group.map(({ id }) => client.episodes.getEpisode(id))));
  }
  return results;
}

function batch(iterable, size) {
  return {
    *[Symbol.iterator]() {
      let group = [];
      for (let current of iterable) {
        group.push(current);
        if (group.length >= size) {
          yield group;
          group = [];
        }
      }
      if (group.length > 0) {
        yield group;
      }
    }
  }
}
