import React from 'react';
import { Link } from 'gatsby';
import {
  navLink,
  contactButton,
  navWrap,
  logoMargin,
  linksGroup,
  homeLink,
} from './navbar.css';
import ProjectSelect from './project-select';
import { Logo } from './logo';

export const Navbar = () => {
  return (
    <nav className={navWrap}>
      <Link to="/" className={logoMargin}>
        <Logo />
      </Link>
      <div className={linksGroup}>
        <Link to="/" className={homeLink}>
          Home
        </Link>
        <Link to="/consulting" className={navLink}>
          DX Consulting
        </Link>
        <Link to="/backstage" className={navLink}>
          Backstage
        </Link>
        <ProjectSelect />
        <Link to="/blog" className={navLink}>
          Blog
        </Link>
      </div>
      <Link to="/contact" className={contactButton}>
        Contact
      </Link>
    </nav>
  );
};
