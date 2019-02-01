import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby';

import './client.css';

Client.propTypes = {
  children: PropTypes.node,
  company: PropTypes.string.isRequired,
  link: PropTypes.string,
  logo: PropTypes.string
};

export default function Client({ children, company, link, logo }) {
  return (
    <div class="client">
      <h3>
        {link ? (
          <Link to={link}>
            <img src={logo} alt={company} class="client-logo" />
          </Link>
        ) : (
          <img src={logo} alt={company} class="client-logo" />
        )}
      </h3>
      {children}
      {link && (
        <Link to={link}>Read more →</Link>
      )}
    </div>
  );
}
