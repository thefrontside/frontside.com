import React from 'react';
import PropTypes from 'prop-types';
import './home-hero.css';

HomeHero.propTypes = {
  heading: PropTypes.node.isRequired,
  subheading: PropTypes.node.isRequired
};

export default function HomeHero({ heading, subheading }) {
  return (
    <section className="home-hero">
      <h1>{heading}</h1>
      <p>{subheading}</p>
    </section>
  )
}
