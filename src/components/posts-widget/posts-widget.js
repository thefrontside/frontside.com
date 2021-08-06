import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import Text from '../text';
import Button, { ButtonGroup } from '../button';

PostsWidget.propTypes = {
  heading: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      authors: PropTypes.arrayOf(
        PropTypes.shape({
          slug: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default function PostsWidget({ heading, linkTo, posts }) {
  return (
    <div className="posts-widget">
      <Text tag="h2">{heading}</Text>

      <ul className="posts-widget-list">
        {posts.map((post) => (
          <li key={post.id} className="posts-widget-entry">
            <h3 className="posts-widget-title">
              <Link to={post.slug}>
                <Text>{post.title}</Text>
              </Link>
            </h3>

            <p className="posts-widget-meta">
              <span className="posts-widget-authors">
                {post.authors.map((author, i) => (
                  <Link key={i} to={author.slug}>
                    <Text>{author.name}</Text>
                  </Link>
                ))}
              </span>

              <span className="posts-widget-date">{post.date}</span>
            </p>
          </li>
        ))}
      </ul>

      <ButtonGroup>
        <Button to={linkTo}>
          <span>More</span>
        </Button>
      </ButtonGroup>
    </div>
  );
}
