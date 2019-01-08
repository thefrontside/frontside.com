import React, { Children } from 'react';
import PropTypes from 'prop-types';
import css from 'classnames';

import Button from './button';

ButtonGroup.propTypes = {
  align: PropTypes.oneOf(['center', 'start', 'end']),
  justify: PropTypes.oneOf(['center', 'between', 'around']),
  children: (props, propName, componentName) => {
    let arr = Children.toArray(props[propName]);
    if (arr.some(child => child instanceof Button)) {
      throw new Error(`Invalid children for ${componentName}, expected Button`);
    }
  }
};

export default function ButtonGroup({
  align,
  justify,
  children,
  className,
  ...props
}) {
  return (
    <div
      className={css('button-group', {
        [`align-${align}`]: !!align,
        [`justify-${justify}`]: !!justify
      }, className)}
      {...props}
    >
      {children}
    </div>
  );
}
