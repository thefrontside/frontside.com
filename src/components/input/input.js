import React from 'react';
import PropTypes from 'prop-types';
import css from 'classnames';

import './input.css';

Input.propTypes = {
  multiline: PropTypes.bool,
  highlight: PropTypes.bool,
};

export default function Input({ multiline, highlight, ...props }) {
  let Component = multiline ? 'textarea' : 'input';

  return (
    <>
    {!highlight ? 
      <Component className={css('fs-text-field', 'fs-text-field--input')} {...props} />
    :
      <div className="input-boder__highlight fs-text-field">
        <Component className={css('fs-text-field', 'fs-text-field--input', 'fs-text-field--input__highlight')} {...props} />
      </div>
    }
   </>
  );
}
