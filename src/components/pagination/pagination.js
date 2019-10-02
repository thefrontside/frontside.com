import React from "react";
import { Link } from "gatsby";
import './pagination.css';

export default function Pagination({ prefix, page, pages }) {
  return (
    <div className="pagination">
      {page + 1 !== pages ? (
        <Link to={`${prefix}/${page + 1}`}>&larr; Older</Link>
      ) : null}
      {page > 1 ? (
        <Link className="pagination-newer-link" to={page === 2 ? prefix : `${prefix}/${page - 1}`}>
          Newer &rarr;
        </Link>
      ) : null}
    </div>
  );
}
