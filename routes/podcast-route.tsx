import { type JSXHandler } from "revolution/jsx-runtime";
import { usePodcastEpisodes } from "../podcast/podcast.ts";
import { respondNotFound, useParams } from "revolution";

export function podcastRoute(): JSXHandler {
  return function* () {
    let { id } = yield* useParams<{ id: string }>();
    let episodes = yield* usePodcastEpisodes();

    let episode = episodes.find((episode) => episode.linkname === id);
    if (!episode) {
      return yield* respondNotFound();
    }

    return (
      <html>
        <body>
          <h1>{episode.title}</h1>
          <ul>
            <li><strong>description</strong>: {episode.description}</li>
            <li><strong>image_url</strong>: {episode.image_url}</li>
            <li><strong>duration</strong>: {episode.duration}</li>
          </ul>
        </body>
      </html>
    );
  };
}
