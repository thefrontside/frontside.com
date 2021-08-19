import React, { useState } from 'react';
import { Link } from 'gatsby';
import { atoms } from '../../styles/atoms.css.ts';
import { PageWrap } from '../../styles/page.css';
import {
  NavHorizontalList,
  NavVerticalList,
  NavItemStyle,
  NavLinkStyle,
  NavLink,
  ContactButton,
  LogoSVGFill,
  MenuSVGFill,
  NavWrap,
} from './navbar.css';

const NavItems = [
  { url: '/consulting', text: 'DX Consulting' },
  { url: '/backstage', text: 'Backstage' },
  { url: '/blog', text: 'Resources' },
];

export const Navbar = () => {
  const [hamburgerActive, setHamburgerMenu] = useState(false);
  const toggleHamburgerMenu = () => setHamburgerMenu(!hamburgerActive);

  return (
    <nav className={NavWrap}>
        <Link to="/" className={atoms({ marginRight: 'auto' })}>
          <Logo />
        </Link>
        {NavItems.map((link, i) => (
          <Link to={link.url} key={i} className={NavLink}>
            {link.text}
          </Link>
        ))}
      <a
        href="/contact"
        className={ContactButton}
      >
        Contact
      </a>
    </nav>
    // <div role="banner" className={atoms({ position: 'relative' })}>
    //   <div
    //     className={atoms({
    //       display: 'flex',
    //     })}
    //   >
    //     <a href="/" className={atoms({ padding: 'lg' })}>
    //       <Logo />
    //     </a>
    //     <nav
    //       role="navigation"
    //       className={atoms({
    //         marginLeft: 'auto',
    //         marginRight: 'auto',
    //         display: { mobile: 'none', laptop: 'flex' },
    //       })}
    //     >
    //       <ul className={NavHorizontalList}>
    //         {NavItems.map((item) => (
    //           <NavItem key={item.url} {...item} />
    //         ))}
    //       </ul>
    //     </nav>
    //     <a
    //       href="/contact"
    //       className={atoms({
    //         marginLeft: 'auto',
    //         marginY: 'auto',
    //       })}
    //     >
    //       <button className={ContactButton}>Contact</button>
    //     </a>

    //     <button
    //       type="button"
    //       className={atoms({
    //         borderWidth: 'none',
    //         marginLeft: 'lg',
    //         padding: 'lg',
    //         display: { mobile: 'block', laptop: 'none' },
    //         transform: hamburgerActive ? 'r45' : 'r315',
    //         transition: 'lg',
    //       })}
    //       onClick={toggleHamburgerMenu}
    //     >
    //       <PolygonMenu />
    //     </button>
    //   </div>

    //   <div
    //     className={atoms({
    //       display: hamburgerActive
    //         ? { mobile: 'block', laptop: 'none' }
    //         : 'none',
    //     })}
    //   >
    //     <nav role="navigation">
    //       <ul className={NavVerticalList}>
    //         {NavItems.map((item) => (
    //           <NavItem key={item.url} {...item} />
    //         ))}
    //       </ul>
    //     </nav>
    //   </div>
    // </div>
  );
};

const Logo = () => (
  <svg
    width="137"
    height="34"
    xmlns="http://www.w3.org/2000/svg"
    alt="Frontside"
  >
    <g fill="none" fillRule="evenodd">
      <path
        fill="#14315D"
        d="M15.2.04L.48 8.55v16.9l14.7 8.52 14.7-8.52V8.55z"
      />
      <path
        fill="#F74D7B"
        d="M7.84 21.23v-8.45l-3.64-2.1v12.64l11 6.37v-4.2z"
      />
      <path
        fill="#26ABE8"
        d="M22.54 21.23v-8.45l3.65-2.1v12.64l-11 6.37v-4.2z"
      />
      <path
        fill="#FFF"
        d="M22.54 12.78l3.65-2.1-11-6.36-11 6.36 3.65 2.1 2.71-1.57 7.35 4.26 3.64-2.1-7.36-4.26 1.01-.59z"
      />
      <g>
        <path
          className={LogoSVGFill}
          d="M38.58 11.51v11.7h2.88V18.8h4.37v-2.34h-4.37v-2.4h4.98V11.5zM51.7 13.98v3.03h1.47c1.17 0 1.77-.56 1.77-1.57 0-1-.55-1.46-1.7-1.46H51.7zm1.7-2.47c2.94 0 4.46 1.51 4.46 3.8 0 1.52-.6 2.56-1.78 3.24l2.42 4.67h-3.12l-1.97-4c-.3.04-.58.06-.91.06h-.8v3.94h-2.87v-11.7h4.56zM65.93 20.83c1.82 0 2.77-1.37 2.77-3.48 0-1.99-.95-3.42-2.77-3.42-1.8 0-2.74 1.45-2.74 3.42 0 2.1.94 3.48 2.74 3.48m0-9.51c3.56 0 5.79 2.34 5.79 6.03 0 3.8-2.23 6.08-5.79 6.08-3.54 0-5.77-2.28-5.77-6.08 0-3.7 2.23-6.03 5.77-6.03M74.34 11.51h2.5l4.54 6.88V11.5h2.85v11.7h-2.49l-4.57-6.72v6.73h-2.83zM89.79 14.05H86.4V11.5h9.64v2.54h-3.38v9.17h-2.88zM99.05 19.62c1.07.85 2.32 1.43 3.34 1.43.9 0 1.42-.42 1.42-1.12 0-.68-.4-.99-2.28-1.53-2.37-.68-3.4-1.62-3.4-3.5 0-2.46 1.9-3.58 4.3-3.58 1.54 0 3.04.56 4.2 1.62l-1.3 1.76a4.86 4.86 0 0 0-2.84-1.08c-.84 0-1.4.33-1.4.98 0 .76.67.97 2.6 1.6 2.17.7 3.11 1.55 3.11 3.42 0 2.4-1.69 3.8-4.37 3.8a6.34 6.34 0 0 1-4.78-2.04l1.4-1.76zM109.4 11.51h2.88v11.7h-2.88zM118.21 14.05v6.65h1.37c1.95 0 2.84-1.11 2.84-3.34 0-2.16-.9-3.31-2.84-3.31h-1.37zm1.37-2.54c3.9 0 5.85 2.3 5.85 5.66 0 4.2-2.03 6.05-6.3 6.05h-3.8v-11.7h4.25zM128.08 11.51h8.11v2.54h-5.23v2.1h4.74v2.37h-4.74v2.18h5.3v2.52h-8.18z"
        />
      </g>
    </g>
  </svg>
);

const PolygonMenu = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="33"
    height="17.5"
    viewBox="0 0 32.63 17"
    className={MenuSVGFill}
  >
    <path d="M7.4,0,0,4.27v8.46L7.4,17l7.34-4.27V4.27ZM7.34,2.82l5,2.89v5.64L7.4,14.18,2.45,11.35V5.71L4.2,4.64" />
    <path d="M25.29,0,17.88,4.27v8.46L25.29,17l7.34-4.27V4.27Zm-.07,2.82,5,2.89v5.64l-4.89,2.83-5-2.83V5.71l1.76-1.07" />
  </svg>
);
