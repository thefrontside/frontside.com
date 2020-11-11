import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'gatsby';

import './navbar.css';

export default class Navbar extends Component {
  $nav = React.createRef();

  state = {
    isMenuActive: false,
  };

  componentDidMount() {
    // ensure body is not locked on remount
    document.body.classList.remove('is-locked');
  }

  toggleMenu(isMenuActive = !this.state.isMenuActive) {
    this.setState({ isMenuActive }, () => {
      // ensure the nav is in view and lock the body scroll position
      if (isMenuActive) {
        this.$nav.current.scrollIntoView();
        document.body.classList.add('is-locked');
      } else {
        document.body.classList.remove('is-locked');
      }
    });
  }

  handleToggle = e => {
    e.preventDefault();
    this.toggleMenu();
  };

  render() {
    let { isMenuActive } = this.state;

    return (
      <div data-collapse="medium" data-animation="over-right" data-duration="200" data-doc-height="1" data-easing="ease-in-out-circ" data-no-scroll="1" role="banner" className="navbar w-nav">
        <div className="widewrapper w-container">
          <a href="/" className="w-nav-brand"><img src="images/fs-logo.svg" loading="lazy" width="143.5" alt="Frontside" /></a>
          <nav role="navigation" className="fullnav w-nav-menu">
            <ul role="list" className="navwrap w-list-unstyled">
              <li className="clase-nav">
                <div className="menu-button-2 w-nav-button"><img src="images/hamburger-menu2x.png" loading="lazy" width="33" alt="" className="image-5" /></div>
              </li>
              <li className="navitem homelink">
                <a href="/" className="main-nav-link w-nav-link">Homepage</a>
              </li>
              <li className="navitem">
                <a href="/about" className="main-nav-link w-nav-link">People</a>
              </li>
              <li className="navitem">
                <a href="/consulting" className="main-nav-link w-nav-link">Consulting</a>
              </li>
              <li className="navitem">
                <a href="/tools" className="main-nav-link w-nav-link">Tools</a>
              </li>
              <li className="navitem">
                <a href="/blog" aria-current="page" className="main-nav-link w-nav-link w--current">Insights</a>
              </li>
              <li className="navitem contactin">
                <a href="#" className="fs-button cta nav in w-button">Contact</a>
              </li>
            </ul>
          </nav>
          <a href="#" className="fs-button cta nav w-button">Contact</a>
          <div className="menu-button-2 w-nav-button"><img src="images/hamburger-menu2x.png" loading="lazy" width="33" alt="" className="image-4" /></div>
        </div>
      </div>
    );
  }
}
