import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import './posts-list.css';
import Text from '../text';
import Content from '../content';

PostsList.propTypes = {
  heading: PropTypes.node,
  pagination: PropTypes.node,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      excerpt: PropTypes.string.isRequired,
      authors: PropTypes.arrayOf(
        PropTypes.shape({
          slug: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default function PostsList({
  heading = null,
  posts,
  pagination = null,
}) {
  return (
    <>
    { (heading) ?
      <section className="widewrapper herowrapper w-container">
        <div className="herotext">
          {heading}
        </div>
      </section>
    : ''}
    <div className="widewrapper column w-container">
      <ul className="entries-list">
        {posts.map(post => (
          <li key={post.id} className="colorborderwrapping entrypreview">
            <dvi className="entry-preview">
              <h3 className="posts-list-title">
                <Link to={post.slug}>{post.title}</Link>
              </h3>
              <Text tag="p" className="posts-list-meta">
                <span className="posts-list-authors">
                  {post.authors.map(author => (
                    <Link key={author.slug} to={author.slug}>
                      <Text>{author.name}</Text>
                    </Link>
                  ))}
                </span>

                <span className="posts-list-date">{post.date}</span>
              </Text>
              <Text tag="p">{post.description}</Text>
              <Link to={post.slug} class="post-link">
                Read more <span class="post-link--arrow">→</span>
              </Link>
            </dvi>
          </li>
        ))}
      </ul>
      {pagination}
    </div>
    </>
  );
}
