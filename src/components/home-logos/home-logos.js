import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { atoms } from '../../styles/atoms.css.ts';

Logo.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  square: PropTypes.bool,
};

export function Logo({ src, alt, square }) {
  return (
    <li
      className={
        //'home-logo',
        atoms({})
      } // 'is-square': square })}
    >
      <img src={src} alt={alt} />
    </li>
  );
}

HomeLogos.propTypes = {
  children: (props, propName, componentName) => {
    let arr = Children.toArray(props[propName]);
    if (arr.some((child) => child instanceof Logo)) {
      throw new Error(`Invalid children for ${componentName}, expected Logo`);
    }
  },
};

export default function HomeLogos({ children }) {
  return <ul className="home-logos">{children}</ul>;
}
