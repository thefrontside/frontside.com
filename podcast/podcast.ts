import { call, createContext, Operation } from "effection";

export interface Podcast {
  getEpisodes(): Episode[];
  getEpisode(slug: string): Episode | undefined;
}

export interface Episode {
  id: string;
  slug: string;
  title: string;
  description: string;
  publishedAt: Date;
  authors: Author[];
  audioUrl?: string;
  imageUrl?: string;
}

export interface Author {
  name: string;
  slug: string;
}

interface SimplecastEpisode {
  id: string;
  slug: string;
  title: string;
  description: string;
  published_at: string;
  authors?: {
    collection?: Array<{ name: string; slug?: string }>;
  };
  audio_file_url?: string;
  image_url?: string;
}

interface SimplecastResponse {
  episodes: SimplecastEpisode[];
}

let podcastData: Podcast | null = null;

export function* usePodcast(): Operation<Podcast> {
  if (!podcastData) {
    let apiKey = Deno.env.get("SIMPLECAST_API");
    let podcastId = "c27dcb5f-6c33-4c38-99c1-b32d3b52fec1";

    let episodes: Episode[] = [];
    if (apiKey) {
      episodes = yield* fetchEpisodesFromAPI(apiKey, podcastId);
    }

    let episodeMap = new Map<string, Episode>();
    for (let episode of episodes) {
      episodeMap.set(episode.slug, episode);
    }

    podcastData = {
      getEpisodes: () => episodes,
      getEpisode: (slug) => episodeMap.get(slug),
    };
  }

  return podcastData;
}

function* fetchEpisodesFromAPI(
  apiKey: string,
  podcastId: string,
): Operation<Episode[]> {
  let url =
    `https://api.simplecast.com/podcasts/${podcastId}/episodes?limit=10000&offset=0`;

  let response = yield* call(() =>
    fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
  );

  if (!response.ok) {
    throw new Error(`Simplecast API error: ${response.status}`);
  }

  let data = yield* call(() => response.json());
  let collection = data.collection || [];

  // Fetch detailed info for each episode
  let episodes: Episode[] = [];
  for (let meta of collection) {
    let detailUrl = `https://api.simplecast.com/episodes/${meta.id}`;
    let detailResponse = yield* call(() =>
      fetch(detailUrl, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      })
    );

    if (detailResponse.ok) {
      let episode = yield* call(() => detailResponse.json());
      episodes.push(transformEpisode(episode));
    }
  }

  return episodes.sort((a, b) =>
    b.publishedAt.getTime() - a.publishedAt.getTime()
  );
}

function transformEpisode(raw: SimplecastEpisode): Episode {
  let authorsCollection = raw.authors?.collection || [];

  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    description: raw.description,
    publishedAt: new Date(raw.published_at),
    authors: authorsCollection.map((author) => ({
      name: author.name,
      slug: author.slug || author.name.toLowerCase().replace(/\s+/g, "-"),
    })),
    audioUrl: raw.audio_file_url,
    imageUrl: raw.image_url,
  };
}
