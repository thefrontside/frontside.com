import React from 'react';
import PropTypes from 'prop-types';
import css from 'classnames';
import Input from '../input';

import './text-field.css';

TextField.propTypes = {
  label: PropTypes.string,
};

export default function TextField({ label, ...props }) {
  return (
    <div className={css('text-field')}>
      <label className={css('text-field-label')} htmlFor={props.id}>
        {label}
      </label>
      <Input {...props} />
    </div>
  );
}
