import { Link } from 'gatsby';
import React from 'react';
import FSIcon from '../../img/plork/fs-webclip.png';
import { textBlueDashWhite } from '../../styles/typography.css';
import {
  footernavLink,
  footerNav,
  footerLegal,
  footerAddress,
  footerCopyright,
  footerWrapper,
} from './footer.css';

const NavItem = ({ itemUrl, itemText }) => (
  <Link to={itemUrl} className={footernavLink}>
    {itemText}
  </Link>
);

const NavItems = [
  { itemUrl: '/', itemText: 'Home' },
  { itemUrl: '/about', itemText: 'About' },
  { itemUrl: '/consulting', itemText: 'Consulting' },
  { itemUrl: '/backstage', itemText: 'Backstage' },
  { itemUrl: '/blog', itemText: 'Blog' },
  { itemUrl: '/contact', itemText: 'Contact' },
];

export default function Footer() {
  let year = new Date().getFullYear();

  return (
    <footer className={footerWrapper}>
      <nav className={footerNav}>
        {NavItems.map((item) => (
          <NavItem key={item.itemUrl} {...item} />
        ))}
      </nav>
      <div className={footerLegal}>
        <a href="/" aria-label="visit homepage">
          <img src={FSIcon} width="32.5" alt="Frontside Logo" />
        </a>
        <p className={footerAddress}>
          2301 W Anderson Ln #107
          <br />
          Austin, Texas 78757
          <br />
          +1 (800) 493-4589
        </p>
        <p
          className={footerCopyright}
        >{`\u00A9 2005-${year} The Frontside Software, Inc. All rights reserved.`}</p>
        <p className={footerCopyright}>
          <Link to="/code-of-conduct" className={textBlueDashWhite}>
            Code of Conduct
          </Link>{' '}
          &mdash;{' '}
          <Link to="/privacy-policy" className={textBlueDashWhite}>
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
}
