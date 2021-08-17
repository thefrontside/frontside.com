import React from 'react';
import PropTypes from 'prop-types';
import { atoms } from '../atoms.css.ts';
import { Link } from 'gatsby';

Button.propTypes = {
  to: PropTypes.string,
  highlight: PropTypes.bool,
  large: PropTypes.bool,
};

export function Button({ className, highlight, large, ...props }) {
  let Component = props.to ? Link : 'button';

  return (
    <Component
      className={atoms({})}
      //css('fs-button', { 'fs-button__highlight': highlight }, { 'fs-button__large': large }, className)}
      {...props}
    />
  );
}
