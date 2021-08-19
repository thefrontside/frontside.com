import React from 'react';
import PropTypes from 'prop-types';
import Input from '../input';

import { atoms } from '../../styles/atoms.css.ts';

TextField.propTypes = {
  label: PropTypes.string,
};

export default function TextField({ label, ...props }) {
  return (
    <div
      className={atoms({})}
      //'text-field')}
    >
      <label
        className={atoms({})}
        //'text-field-label')}
        htmlFor={props.id}
      >
        {label}
      </label>
      <Input {...props} />
    </div>
  );
}
