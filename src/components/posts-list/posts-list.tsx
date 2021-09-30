import React from 'react';
import PropTypes from 'prop-types';
import BlogPreview from '../blog-preview';
import SubscribeForm from '../subscribe-form/subscribe-form';

import { entriesList, entriesListEntry } from '../../styles/page.css';

export default function PostsList({
  heading = null,
  includeFeatured,
  posts,
  pagination = null,
}) {
  return (
    <>
      {heading ? (
        <section>
          <div>{heading}</div>
        </section>
      ) : (
        ''
      )}
      <ul className={entriesList}>
        {posts.map((post, i) => (
          <React.Fragment key={i}>
            <li className={entriesListEntry}>
              <BlogPreview post={post} layout={(includeFeatured && i === 0) ? 'featured': 'sided'} />
            </li>
            {(includeFeatured && i === 0 || !includeFeatured && i === 2) ? <SubscribeForm /> : <></>}
          </React.Fragment>
        ))}
      </ul>
      {pagination}
    </>
  );
}

PostsList.propTypes = {
  heading: PropTypes.node,
  pagination: PropTypes.node,
  includeFeatured: PropTypes.bool,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string,
      description: PropTypes.string.isRequired,
      authors: PropTypes.arrayOf(
        PropTypes.shape({
          slug: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};
