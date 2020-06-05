import React from 'react';
import PropTypes from 'prop-types';
import css from 'classnames';
import './hero.css';

Hero.propTypes = {
  align: PropTypes.oneOf(['left', 'right', 'center']),
  heading: PropTypes.node.isRequired,
  subheading: PropTypes.node,
};

export default function Hero({ align, heading, subheading }) {
  return (
    <section
      className={css('hero', {
        [`align-${align}`]: !!align,
      })}
    >
      <h1>{heading}</h1>

      {!!subheading && <p>{subheading}</p>}
    </section>
  );
}
