import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import "./posts-list.css";
import Text from "../text";
import Content from "../content";

PostsList.propTypes = {
  heading: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
  hasNewer: PropTypes.bool.isRequired,
  hasOlder: PropTypes.bool.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      excerpt: PropTypes.string.isRequired,
      authors: PropTypes.arrayOf(
        PropTypes.shape({
          slug: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired
        })
      ).isRequired
    })
  ).isRequired
};

export default function PostsList({ heading, posts, pagination = null }) {
  return (
    <Content className="posts-list">
      {heading}
      <ul className="posts-list-list">
        {posts.map(post => (
          <li key={post.id} className="posts-list-entry">
            <h3 className="posts-list-title">
              <Link to={post.slug}>{post.title}</Link>
            </h3>
            <Text tag="p" className="posts-list-meta">
              <span className="posts-list-authors">
                {post.authors.map((author, i) => (
                  <Link key={i} to={author.slug}>
                    <Text>{author.name}</Text>
                  </Link>
                ))}
              </span>

              <span className="posts-list-date">{post.date}</span>
            </Text>
            <Text tag="p">{post.excerpt}</Text>
            <Link to={post.slug}>Keep Reading →</Link>
          </li>
        ))}
      </ul>
      {pagination}
    </Content>
  );
}
