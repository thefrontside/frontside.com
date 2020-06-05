import React from 'react';
import PropTypes from 'prop-types';
import css from 'classnames';
import { Link } from 'gatsby';

import './button.css';

Button.propTypes = {
  to: PropTypes.string,
};

export default function Button({ className, ...props }) {
  let Component = props.to ? Link : 'button';

  return <Component className={css('button', className)} {...props} />;
}
