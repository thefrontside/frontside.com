import React from 'react';
import PropTypes from 'prop-types';
import css from 'classnames';
import { Link } from 'gatsby';

import './button.css';

Button.propTypes = {
  to: PropTypes.string,
  highlight: PropTypes.bool,
  large: PropTypes.bool
};

export default function Button({ className, highlight, large, ...props }) {
  let Component = props.to ? Link : 'button';

  return <Component className={css('fs-button', { 'fs-button__highlight': highlight }, { 'fs-button__large': large }, className)} {...props} />;
}
