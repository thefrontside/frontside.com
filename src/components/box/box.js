import React from 'react';
import PropTypes from 'prop-types';
import css from 'classnames';

import './box.css';

const sizes = [
  'half',
  'single',
  'one-half',
  'double',
  'triple'
];

Box.propTypes = {
  direction: PropTypes.oneOf(['column', 'row']),
  align: PropTypes.oneOf(['start', 'end', 'center']),
  justify: PropTypes.oneOf(['between', 'around', 'center']),
  padding: PropTypes.oneOf(sizes),
  paddingTop: PropTypes.oneOf(sizes),
  paddingLeft: PropTypes.oneOf(sizes),
  paddingRight: PropTypes.oneOf(sizes),
  paddingBottom: PropTypes.oneOf(sizes),
  margin: PropTypes.oneOf(sizes),
  marginTop: PropTypes.oneOf(sizes),
  marginLeft: PropTypes.oneOf(sizes),
  marginRight: PropTypes.oneOf(sizes),
  marginBottom: PropTypes.oneOf(sizes),
  className: PropTypes.string,
};

export default function Box({
  direction,
  align,
  justify,
  padding,
  paddingTop,
  paddingLeft,
  paddingRight,
  paddingBottom,
  margin,
  marginTop,
  marginLeft,
  marginRight,
  marginBottom,
  className,
  ...props
}) {
  return (
    <div
      className={css(className, {
        [`flex-${direction}`]: !!direction,
        [`flex-align-${align}`]: !!align,
        [`flex-justify-${justify}`]: !!justify,
        [`pad-${padding}`]: !!padding,
        [`pad-top-${padding}`]: !!paddingTop,
        [`pad-left-${paddingLeft}`]: !!paddingLeft,
        [`pad-right-${paddingRight}`]: !!paddingRight,
        [`pad-bottom-${paddingBottom}`]: !!paddingBottom,
        [`margin-${margin}`]: !!margin,
        [`margin-top-${margin}`]: !!marginTop,
        [`margin-left-${marginLeft}`]: !!marginLeft,
        [`margin-right-${marginRight}`]: !!marginRight,
        [`margin-bottom-${marginBottom}`]: !!marginBottom
      })}
      {...props}
    />
  );
}
