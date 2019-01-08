import React from 'react';
import PropTypes from 'prop-types';
import css from 'classnames';
import { Link } from 'gatsby';

import './button.css';

Button.propTypes = {
  type: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  to: PropTypes.string
};

export default function Button({
  type = 'primary',
  className,
  ...props
}) {
  let Component = props.to ? Link : 'button';

  return (
    <Component
      className={css('button', {
        [`is-${type}`]: true
      }, className)}
      {...props}
    />
  );
}
