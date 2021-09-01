import React from 'react';
import { Link } from 'gatsby';

import {
  entryPreview,
  entryPreviewImage,
} from '../blog-preview/blog-preview.css';
import { atoms } from '../../styles/atoms.css';

export default function PodcastPreview({ episode }) {
  return (
    <>
      <li className={entryPreview}>
        <Link
          to={episode.slug}
          className={atoms({
            color: { default: 'blue', darkMode: 'white' },
          })}
        >
          {episode.image ? (
            <img src={episode.image} alt="" className={entryPreviewImage} />
          ) : (
            ''
          )}
          <h3
            className={atoms({
              fontScale: 'xl',
              lineHeight: 'lg',
            })}
          >
            {episode.title}
          </h3>
          <p
            className={atoms({
              fontScale: 'sm',
              textTransform: 'uppercase',
            })}
          >
            {episode.authors.filter(Boolean).map((author, i) => (
              <React.Fragment key={author.slug}>
                {i === 0 ? '' : episode.authors.length > 2 ? ', ' : ' and '}
                {/* Author links will lead to team member page, which is currently pending. */}
                {/* <Link key={author.slug} to={author.slug}>
                        <Text>{author.name}</Text>
                      </Link>
                  */}
                Hosted by {author.name}
              </React.Fragment>
            ))}{' '}
          </p>
          <p
            className={atoms({ fontScale: 'base' })}
            dangerouslySetInnerHTML={{ __html: episode.description }}
          />
          <strong>Go to episode →</strong>
        </Link>
      </li>
    </>
  );
}
