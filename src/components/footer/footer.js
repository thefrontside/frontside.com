import React from 'react';
import { Link } from 'gatsby';

import Text from '../text';
import logo from '../../img/logo-no-text.svg'
import './footer.css';

export default function Footer() {
  let year = new Date().getFullYear();

  return (
    <footer className="footer">
      <Link to="/" className="footer-logo">
        <img src={logo} alt="Frontside" />
      </Link>

      <ul className="footer-menu">
        <li><Link to="/about">About</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/podcast">Podcast</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <address className="footer-address">
        P.O. Box 170249 <br/>
        Austin, TX 78717 <br/>
        <a href="tel:18004934589">
          +1 (800) 493-4589
        </a>
      </address>

      <Text tag="p" className="footer-copyright" widows={3}>
        {`\u00A9 2005-${year} The Frontside, Inc. All rights reserved.`}
      </Text>
    </footer>
  );
}
