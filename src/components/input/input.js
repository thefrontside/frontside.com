import React from 'react';
import PropTypes from 'prop-types';
import css from 'classnames';

import './input.css';

Input.propTypes = {
  multiline: PropTypes.bool,
};

export default function Input({ multiline, ...props }) {
  let Component = multiline ? 'textarea' : 'input';

  return <Component className={css('input')} {...props} />;
}
