import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'gatsby';
import css from 'classnames';

import logo from '../../img/logo.svg';
import './navbar.css';

export default class Navbar extends Component {
  $nav = React.createRef();

  state = {
    isMenuActive: false
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
      <nav className="navbar" ref={this.$nav}>
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Frontside" />
        </Link>

        <button
          onClick={this.handleToggle}
          className={css('navbar-menu-toggle', {
            'is-active': isMenuActive
          })}
        >
          <span className="visually-hidden">Menu</span>
        </button>

        <CSSTransition
          timeout={300}
          in={isMenuActive}
          classNames={{
            enter: 'is-active-enter',
            enterActive: 'is-active',
            enterDone: 'is-active',
            exit: 'is-active-exit'
          }}
        >
          <ul className="navbar-menu">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/podcast">Podcast</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </CSSTransition>
      </nav>
    );
  }
}
