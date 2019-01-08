import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

Text.propTypes = {
  tag: PropTypes.string,
  widows: PropTypes.number,
  component: PropTypes.node,
  children: PropTypes.string.isRequired,
};

export default function Text({
  tag,
  widows = 2,
  component:Component = tag || Fragment,
  children,
  ...props
}) {
  return (
    <Component {...props}>
      {widowText(children, widows)}
    </Component>
  );
}

function widowText(text, count) {
  let words = text.split(' ');
  let safelen = words.length - count;
  let begin = words.slice(0, safelen).join(' ');
  let end = words.slice(safelen).join('\u00A0');
  return `${begin} ${end}`;
}
