import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import './episodes-list.css';
import Text from '../text';
import Content from '../content';

EpisodesList.propTypes = {
  heading: PropTypes.node.isRequired,
  episodes: PropTypes.arrayOf(
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

export default function EpisodesList({ heading, episodes }) {
  return (
    <Content className="episodes-list">
      {heading}

      <ul className="episodes-list-list">
        {episodes.map(episode => (
          <li key={episode.id} className="episodes-list-entry">
            <Text tag="h3" className="episodes-list-title">
              <Link to={`/podcast/${episode.slug}`}>
                <Text>{episode.title}</Text>
              </Link>
            </Text>

            <Text tag="p" className="episodes-list-meta">
              <span className="episodes-list-authors">
                {episode.authors.map((author, i) => (
                  <Link key={i} to={author.slug}>
                    <Text>{author.name}</Text>
                  </Link>
                ))}
              </span>

              <span className="episodes-list-date">{episode.date}</span>
            </Text>
          </li>
        ))}
      </ul>
    </Content>
  );
}
