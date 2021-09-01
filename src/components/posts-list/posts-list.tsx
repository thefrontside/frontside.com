import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import Text from '../text';
import SubscribeForm from '../subscribe-form';
import BlogPreview from '../blog-preview';

import { entriesList } from '../../styles/page.css';
import { atoms } from '../../styles/atoms.css';

export default function PostsList({
  heading = null,
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
          <BlogPreview post={post} key={i} />
        ))}
      </ul>
      {pagination}
    </>
  );
}

PostsList.propTypes = {
  heading: PropTypes.node,
  pagination: PropTypes.node,
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
