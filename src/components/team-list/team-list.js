import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Img from "gatsby-image";
import './team-list.css';

TeamList.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    img: PropTypes.object.isRequired
  }))
};

export default function TeamList({ people }) {
  return (
    <ul className="team-list">
      {people.map(person => (
        <li key={person.name}>
          <Link to={person.slug}>
            <Img fixed={person.img.childImageSharp.fixed}/>
            <p>{person.name}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
