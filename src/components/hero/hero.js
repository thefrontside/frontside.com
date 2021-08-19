import React from 'react';
import PropTypes from 'prop-types';
import { atoms } from '../../styles/atoms.css.ts';

Hero.propTypes = {
  align: PropTypes.oneOf(['left', 'right', 'center']),
  heading: PropTypes.node.isRequired,
  subheading: PropTypes.node,
};

export default function Hero({ align, heading, subheading }) {
  return (
    <section
      className={
        // 'hero'
        atoms({
          // [`align-${align}`]: !!align,
        })
      }
    >
      <h1>{heading}</h1>

      {!!subheading && <p>{subheading}</p>}
    </section>
  );
}
