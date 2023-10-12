import React from 'react';
import { Link } from 'gatsby';
import { paginationButton } from '../../styles/buttons.css';
import { paginationWrap } from '../../styles/page.css';

export default function Pagination({ prefix, page, pages }) {
  return (
    <div className={paginationWrap}>
      {page > 1 ? (
        <Link
          className={paginationButton}
          to={page === 2 ? prefix : `${prefix}/${page - 1}`}
        >
          &larr; Newer entries
        </Link>
      ) : null}
      {page + 1 !== pages ? (
        <Link
          className={paginationButton}
          to={`${prefix}/${page + 1}`}
        >
          Older entries &rarr;
        </Link>
      ) : null}
    </div>
  );
}
