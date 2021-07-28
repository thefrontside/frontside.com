import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import './team-list.css';

// needed to override default inline style
const imgStyleOverrides = {
  display: 'block',
  height: '100%',
  width: '100%',
};

TeamList.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      img: PropTypes.object.isRequired,
      intro: PropTypes.string.isRequired,
    })
  ),
};

export default function TeamList({ people }) {
  return (
    <ul className="team-list">
      {people.map((person) => (
        <li className="team-member" key={person.name}>
          <Link to={person.slug} className="team-member--picture">
            <GatsbyImage
              image={img.childImageSharp.gatsbyImageData}
              style={imgStyleOverrides}
              className="team-img"
            />
          </Link>
          <div className="team-member--abstract">
            <h3 className="team-member--name">
              <Link to={person.slug}>{person.name}</Link>
            </h3>
            <p>{person.intro}</p>
            <Link className="team-member--more" to={person.slug}>
              Know more
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
