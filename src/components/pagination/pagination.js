import React from 'react';
import { Link } from 'gatsby';

import './pagination.css';

export default function Pagination({ prefix, page, pages }) {
  return (
    <div className="pagination">
      {page > 1 ? (
        <Link className="fs-button topage w-button" to={page === 2 ? prefix : `${prefix}/${page - 1}`}>
          &larr; Newer
        </Link>
      ) : null}
      {page + 1 !== pages ? (
        <Link className="fs-button topage w-button" to={`${prefix}/${page + 1}`}>Older &rarr;</Link>
      ) : null}
    </div>
  );
}
