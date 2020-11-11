import React from 'react';
import FSIcon from '../../img/plork/fs-webclip.png';
import './footer.css';

export default function Footer() {
  let year = new Date().getFullYear();

  return (
    <footer className="footerwrapper w-container">
      <nav className="navigation">
        <a href="/" className="footerlink">Home</a>
        <a href="/about" className="footerlink">About</a>
        <a href="/consulting" className="footerlink">Consulting</a>
        <a href="/tools" className="footerlink">Tools</a>
        <a href="/blog" aria-current="page" className="footerlink w--current">Insights</a>
        <a href="#" className="footerlink">Contact</a>
      </nav>
      <a href="https://frontside.com/" target="_blank" className="footer-symbol"><img src={FSIcon} loading="lazy" width="32.5" alt="" className="image-6" /></a>
      <p className="footer-notes"><br />2301 W Anderson Ln #107<br />Austin, Texas 78757<br />+1 (800) 493-4589</p>
      <p className="copyright">{`\u00A9 2005-${year} The Frontside Software, Inc. All rights reserved.`}</p>
    </footer>
  );
}
