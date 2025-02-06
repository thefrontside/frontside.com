import { call, createContext, Operation, useAbortSignal } from "effection";

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
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly image_url: string;
  readonly href: string;
  readonly duration: number;
  readonly linkname: string;
}
export function* initSimpleCast(apiKey?: string) {
  if (!apiKey) {
    console.log(`simplecast: disabled`);
    yield* PodcastContext.set([]);
  } else {
    let client = new HTTPClient({ apiKey });
    let episodes = yield* client.getEpisodes("The Frontside Podcast");
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
    let response = yield* this.request(`/podcasts/${podcast.id}/episodes`, {
      limit: "200",
    });
    let json = yield* call(() => response.json());
    return json.collection.map((episode: Episode) => ({
      ...episode,
      linkname: episode.title.toLowerCase().replaceAll(/\s/g, "-"),
    }));
  }

  *getPodcasts(): Operation<Podcast[]> {
    let response = yield* this.request("/podcasts");
    let json = yield* call(() => response.json());
    return json.collection;
  }

  private *request(
    pathname: string,
    params: Record<string, string> = {},
  ): Operation<Response> {
    let url = new URL(`https://api.simplecast.com`);
    url.pathname = pathname;
    url.search = new URLSearchParams(params).toString();
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
