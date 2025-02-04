import { type JSXHandler } from "revolution/jsx-runtime";
import { usePodcastEpisodes } from "../podcast/podcast.ts";

export function podcastIndexRoute(): JSXHandler {
  return function* () {
    let episodes = yield* usePodcastEpisodes();
    return (
      <html>
        <body>
          <ol>
            {episodes.map((episode) => <li><a href={`podcast/${episode.linkname}`}>{episode.title}</a></li>)}
          </ol>
        </body>
      </html>
    );
  };
}
