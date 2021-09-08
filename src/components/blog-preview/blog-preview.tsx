import React from 'react';
import { Link } from 'gatsby';

import {
  entryPreview,
  entryPreviewHeading,
  entryPreviewImage,
  entryPreviewNewBadge,
} from './blog-preview.css';
import {
  textGradientSkyblueVioletPink,
  textMd,
  textSmCaps,
} from '../../styles/typography.css';
import { radiusMd } from '../../styles/page.css';

export default function BlogPreview({ post, layout = 'default' }) {
  return (
    <Link to={post.slug} className={entryPreview[layout]}>
      {post.image ? (
        <div className={entryPreviewImage[layout]}>
          <img src={post.image} alt="" className={radiusMd} />
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
        <h3 className={entryPreviewHeading[layout]}>{post.title}</h3>
        <p className={textSmCaps}>
          {post.authors.filter(Boolean).map((author, i) => (
            <React.Fragment key={author.slug}>
              {i === 0 ? '' : post.authors.length > 2 ? ', ' : ' and '}
              {author.name}
            </React.Fragment>
          ))}{' '}
          &mdash; <span>{post.date}</span>
        </p>
        <p className={textMd}>{post.description}</p>
        <strong className={textGradientSkyblueVioletPink}>
          Read article &#8674;
        </strong>
      </div>
    </Link>
  );
}
