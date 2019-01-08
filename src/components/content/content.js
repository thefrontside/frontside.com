import React from 'react'
import PropTypes from 'prop-types'
import css from 'classnames';
import './content.css';

HTMLContent.propTypes = Content.propTypes;

export function HTMLContent({
  align,
  className,
  content
}) {
  return (
    <section
      className={css('content-container', {
        [`align-${align}`]: !!align
      }, className)}
      dangerouslySetInnerHTML={{
        __html: content
      }}
    />
  );
}

Content.propTypes = {
  align: PropTypes.oneOf(['center', 'left', 'right']),
  className: PropTypes.string,
  content: PropTypes.node,
  children: PropTypes.node
};

export default function Content({
  align,
  className,
  children,
  content = children
}) {
  return (
    <section
      className={css('content-container', {
        [`align-${align}`]: !!align
      }, className)}
    >
      {content}
    </section>
  );
}
