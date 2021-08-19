import React from 'react';
import { Link } from 'gatsby';

import { EntryPreview, EntryPreviewImage } from './blog-preview.css';
import { atoms } from '../../styles/atoms.css';

export default function BlogPreview({ post }) {
  return (
    <>
      <li className={EntryPreview}>
        <Link
          to={post.slug}
          className={atoms({
            color: { default: 'blue', darkMode: 'white' },
          })}
        >
          {post.image ? (
            <img src={post.image} alt="" className={EntryPreviewImage} />
          ) : (
            ''
          )}
          <h3
            className={atoms({
              fontScale: 'xl',
              lineHeight: 'lg',
            })}
          >
            {post.title}
          </h3>
          <p
            className={atoms({
              fontScale: 'sm',
              textTransform: 'uppercase',
            })}
          >
            {post.authors.filter(Boolean).map((author, i) => (
              <React.Fragment key={author.slug}>
                {i === 0 ? '' : post.authors.length > 2 ? ', ' : ' and '}
                {/* Author links will lead to team member page, which is currently pending. */}
                {/* <Link key={author.slug} to={author.slug}>
                        <Text>{author.name}</Text>
                      </Link>
                  */}
                {author.name}
              </React.Fragment>
            ))}{' '}
            &mdash; <span>{post.date}</span>
          </p>
          <p className={atoms({ fontScale: 'base' })}>{post.description}</p>
          <strong>Read article →</strong>
        </Link>
      </li>
    </>
  );
}
