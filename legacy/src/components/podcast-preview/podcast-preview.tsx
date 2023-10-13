import React from 'react';
import { Link } from 'gatsby';

import {
  entryPreview,
  entryPreviewHeading,
  entryPreviewImage,
  entryPreviewNewBadge,
} from '../blog-preview/blog-preview.css';
import {
  arrowText,
  textMd,
  textSmCaps,
} from '../../styles/typography.css';
import { radiusMd } from '../../styles/page.css';

export default function PodcastPreview({ episode, layout = 'sided' }) {
  return (
    <Link to={episode.slug} className={entryPreview[layout]}>
      {episode.image ? (
        <div className={entryPreviewImage[layout]}>
          <img src={episode.image} alt="" className={radiusMd} />
        </div>
      ) : (
        ''
      )}
      <div>
        {layout === 'featured' ? (
          <span className={entryPreviewNewBadge}>New</span>
        ) : (
          <></>
        )}
        <h3 className={entryPreviewHeading['layout']}>{episode.title}</h3>
        <p className={textSmCaps}>
          Hosted by{' '}
          {episode.authors.filter(Boolean).map((author, i) => (
            <React.Fragment key={author.slug}>
              {i === 0 ? '' : episode.authors.length > 2 ? ', ' : ' and '}
              {author.name}
            </React.Fragment>
          ))}{' '}
        </p>
        <p
          className={textMd}
          dangerouslySetInnerHTML={{ __html: episode.description }}
        />
        <strong className={arrowText}>
          Listen to episode
        </strong>
      </div>
    </Link>
  );
}
