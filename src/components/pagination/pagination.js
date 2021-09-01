import React from 'react';
import { Link } from 'gatsby';
import { atoms } from '../../styles/atoms.css';
import { paginationButton } from '../../styles/buttons.css';

export default function Pagination({ prefix, page, pages }) {
  return (
    <div className={atoms({ textAlign: 'center', marginTop: 'md' })}>
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
