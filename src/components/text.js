import React, { Fragment, Children } from 'react';
import PropTypes from 'prop-types';

Text.propTypes = {
  tag: PropTypes.string,
  widows: PropTypes.number,
  component: PropTypes.node,
  children: PropTypes.node.isRequired,
};

export default function Text({
  tag,
  widows = 2,
  component: Component = tag || Fragment,
  children,
  ...props
}) {
  let childCount = Children.count(children);

  return (
    <Component {...props}>
      {Children.map(children, (child, i) =>
        i === childCount - 1 ? widowText(child, widows) : child
      )}
    </Component>
  );
}

function widowText(text, count) {
  if (typeof text === 'string') {
    let words = text.split(' ');
    let safelen = words.length - count;
    let begin = words.slice(0, safelen).join(' ');

    // replace hyphens with non-breaking hyphens
    let end = words
      .slice(safelen)
      .map((word) => {
        return word.replace(/-/g, '\u2011');
      })
      .join('\u00A0');

    return `${begin} ${end}`;
  } else {
    return text;
  }
}
