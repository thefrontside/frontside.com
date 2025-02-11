import { all, call, createContext, Operation, useAbortSignal } from "effection";

const PodcastContext = createContext<Episode[]>(
  "podcast",
);

export interface SimplecastClient {
  getEpisodes(name: string): Operation<Episode[]>;
}

export interface Podcast {
  readonly title: string;
  readonly id: string;
}

export interface Episode {
  linkname: string;
  season: {
    href: string;
    number: number;
    next_episode_number: number;
  };
  audio_file_name: string;
  is_explicit: boolean;
  waveform_pack: string;
  audio_file_url: string;
  sponsors: {
    href: string;
  };
  number: number;
  authors: {
    href: string;
    collection: Array<
      {
        href: string;
        name: string;
        id: string;
      }
    >;
  };
  analytics: {
    href: string;
  };
  long_description: string;
  podcast: {
    id: string;
    href: string;
    title: string;
    status: "published";
    image_url: string;
    episodes: { count: number };
    created_at: string;
    account_id: string;
    account: {
      id: string;
      href: string;
      owner: {
        name: string;
        id: string;
        email: string;
      };
    };
  };
  description: string;
  audio_status: "transcoded";
  legacy_id: number;
  transcription: string | null;
  audio_file_size: number;
  waveform_json: string;
  slug: string;
  title: string;
  campaign_preview: {
    href: string;
  };
  is_hidden: false;
  is_published: true;
  warnings: Record<string | number | symbol, string>;
  audio_file_path: string;
  dashboard_link: string;
  audio_content_type: string;
  episode_feeds: [
    {
      id: string;
      feed_id: string;
    },
  ];
  days_since_release: number;
  published_at: string;
  href: string;
  audio: {
    href: string;
  };
  image_url: string;
  id: string;
  enclosure_url: string;
  ad_free_audio_file_url: string;
  duration: number;
  keywords: {
    href: string;
    collection: Array<
      {
        href: string;
        value: string;
        id: string;
        hide: false;
      }
    >;
  };
  token: string;
  guid: string;
  created_at: string;
  image_path: string;
  episode_url: string;
  audio_file_path_tc: string;
  updated_at: string;
  audio_file: {
    url: string;
    size: number;
    path_tc: string;
    path: string;
    name: string;
    href: string;
    headliner_url: string;
    ad_free_url: string;
  };
}

export function* initSimpleCast(apiKey?: string) {
  if (!apiKey) {
    console.log(`simplecast: disabled`);
    yield* PodcastContext.set([]);
  } else {
    let client = new HTTPClient({ apiKey });
    let episodes = yield* client.getEpisodes("The Frontside Podcast");
    console.dir(episodes[0].linkname);
    console.log(`simplecast: loaded ${episodes.length} episodes`);
    yield* PodcastContext.set(episodes);
  }
}

export function* usePodcastEpisodes(): Operation<Episode[]> {
  return yield* PodcastContext;
}

interface HTTPCLientOptions {
  apiKey: string;
}

class HTTPClient implements SimplecastClient {
  constructor(public readonly options: HTTPCLientOptions) {}

  *getEpisodes(title: string): Operation<Episode[]> {
    let podcasts = yield* this.getPodcasts();
    let podcast = podcasts.find((p) => p.title === title);
    if (!podcast) {
      throw new Error(
        `unable to find podcast: ${title} in [${
          podcasts.map((p) => p.title).join(", ")
        }]`,
      );
    }

    let response = yield* this.request(
      `/podcasts/${podcast.id}/episodes`,
      { limit: 1000, offset: 0 },
    );

    let json = yield* call(() => response.json());
    return (yield* all(
      json.collection.map((episodeMetadata: { id: string }) => {
        let request = this.request.bind(this);
        return call(function* () {
          let response = yield* request(`/episodes/${episodeMetadata.id}`);
          let episode = yield* call(() => response.json());
          return {
            ...episode,
            linkname: episode.title.toLowerCase().replaceAll(/\s/g, "-"),
          };
        });
      }),
    )) as Episode[];
  }

  *getPodcasts(): Operation<Podcast[]> {
    let response = yield* this.request("/podcasts");
    let json = yield* call(() => response.json());
    return json.collection;
  }

  private *request(
    pathname: string,
    params: Record<string, string | number> = {},
  ): Operation<Response> {
    let url = new URL(`https://api.simplecast.com`);
    url.pathname = pathname;
    let searchParams: Record<string, string> = {};
    for (let key in params) {
      searchParams[key] = String(params[key]);
    }
    url.search = new URLSearchParams(searchParams).toString();
    let signal = yield* useAbortSignal();
    let response = yield* call(() =>
      fetch(url, {
        signal,
        headers: {
          "Authorization": `Bearer ${this.options.apiKey}`,
        },
      })
    );
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`, {
        cause: pathname,
      });
    } else {
      return response;
    }
  }
}
