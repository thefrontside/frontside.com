import { Link } from 'gatsby';
import React from 'react';
import FSIcon from '../../img/plork/fs-webclip.png';
import { atoms } from '../../styles/atoms.css';
import { footerNavLink, footerNav } from './footer.css';

const NavItem = ({ itemUrl, itemText }) => (
  <Link to={itemUrl} className={footerNavLink}>
    {itemText}
  </Link>
);

const NavItems = [
  { itemUrl: '/', itemText: 'Homepage' },
  { itemUrl: '/about', itemText: 'About' },
  { itemUrl: '/consulting', itemText: 'Consulting' },
  { itemUrl: '/blog', itemText: 'Blog' },
  { itemUrl: '/contact', itemText: 'Contact' },
];

export default function Footer() {
  let year = new Date().getFullYear();

  return (
    <footer
      className={atoms({
        marginTop: { mobile: 'xl', laptop: '2xl', desktop: '3xl' },
        marginBottom: 'lg',
      })}
    >
      <nav className={footerNav}>
        {NavItems.map((item) => (
          <NavItem key={item.itemUrl} {...item} />
        ))}
      </nav>
      <div
        className={atoms({
          textAlign: 'center',
          fontSize: 'xs',
          marginTop: '3xl',
        })}
      >
        <a
          href="/"
          aria-label="visit homepage"
          className={atoms({ padding: 'md' })}
        >
          <img src={FSIcon} width="32.5" alt="Frontside Logo" />
        </a>
        <p className={atoms({ fontSize: 'xs', marginTop: 'md' })}>
          2301 W Anderson Ln #107
          <br />
          Austin, Texas 78757
          <br />
          +1 (800) 493-4589
        </p>
        <p
          className={atoms({ marginTop: 'lg', textTransform: 'uppercase' })}
        >{`\u00A9 2005-${year} The Frontside Software, Inc. All rights reserved.`}</p>
        <p>
          <Link
            to="/code-of-conduct"
            className={atoms({ color: { default: 'blue', darkMode: 'white' } })}
          >
            Code of Conduct
          </Link>
          {' '} | {' '} 
          <Link
            to="/privacy-policy"
            className={atoms({ color: { default: 'blue', darkMode: 'white' } })}
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
}
