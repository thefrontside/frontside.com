import React from 'react';
import PropTypes from 'prop-types';

import {
  sectionHeader,
  entriesList,
  entriesListEntry,
} from '../../styles/page.css';
import {
  heading2,
  textGradientPurpleSkyblue,
} from '../../styles/typography.css';
import PodcastPreview from '../podcast-preview/podcast-preview';

EpisodesList.propTypes = {
  heading: PropTypes.node.isRequired,
  episodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
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

export default function EpisodesList({ heading, episodes }) {
  return (
    <>
      <header className={sectionHeader}>
        <h2 className={heading2}>
          <span className={textGradientPurpleSkyblue}>Podcast</span> episodes
        </h2>
      </header>

      <ul className={entriesList}>
        {episodes.map((episode, i) => (
          <li className={entriesListEntry} key={i}>
            <PodcastPreview episode={episode} layout="sided" />
          </li>
        ))}
      </ul>
    </>
  );
}
