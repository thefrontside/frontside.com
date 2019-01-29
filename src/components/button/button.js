import React from 'react';
import PropTypes from 'prop-types';
import css from 'classnames';
import { Link } from 'gatsby';

import './button.css';

Button.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  to: PropTypes.string,
};

export default function Button({ color = 'primary', className, ...props }) {
  let Component = props.to ? Link : 'button';

  return (
    <Component
      className={css(
        'button',
        {
          [`is-${color}`]: true,
        },
        className
      )}
      {...props}
    />
  );
}
