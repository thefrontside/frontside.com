import React from 'react';
import FSIcon from '../../img/plork/fs-webclip.png';
import { atoms } from '../atoms.css.ts';
import { NavLinkStyle, AddressStyle, NoMargin } from './footer.css';

const NavItem = ({ itemUrl, itemText }) => (
  <a href={itemUrl} className={NavLinkStyle}>
    {itemText}
  </a>
);

const NavItems = [
  { itemUrl: '/', itemText: 'Homepage' },
  { itemUrl: '/about', itemText: 'People' },
  { itemUrl: '/consulting', itemText: 'Consulting' },
  { itemUrl: '/tools', itemText: 'Tools' },
  { itemUrl: '/blog', itemText: 'Blog & Podcast' },
  { itemUrl: '/podcast', itemText: 'Podcast' },
  { itemUrl: '/contact', itemText: 'Contact' },
];

export default function Footer() {
  let year = new Date().getFullYear();

  return (
    <footer className={atoms({ paddingY: 'large' })}>
      <nav className={atoms({ textAlign: 'center' })}>
        {NavItems.map((item) => (
          <NavItem key={item.itemUrl} {...item} />
        ))}
      </nav>
      <div
        className={atoms({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        })}
      >
        <a
          href="/"
          aria-label="visit homepage"
          className={atoms({ padding: 'large' })}
        >
          <img src={FSIcon} width="32.5" alt="Frontside Logo" />
        </a>
        <div className={AddressStyle}>
          <p className={NoMargin}>2301 W Anderson Ln #107</p>
          <p className={NoMargin}>Austin, Texas 78757</p>
          <p className={NoMargin}>+1 (800) 493-4589</p>
        </div>
        <p
          className={AddressStyle}
        >{`\u00A9 2005-${year} The Frontside Software, Inc. All rights reserved.`}</p>
      </div>
    </footer>
  );
}
