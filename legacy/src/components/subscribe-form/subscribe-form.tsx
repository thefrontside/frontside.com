import React, { useState } from 'react';
import Plausible from 'plausible-tracker';
import axios from 'axios';
import { useLocation } from '@reach/router';

import {
  headingLg,
  textGradientPinkPurple,
  textArrowWhite,
  textBlueDashWhite,
  textLg,
  textLink,
} from '../../styles/typography.css';
import {
  inputButtonBar,
  inputElement,
  newsletterForm,
  textButton,
} from './subscribe-forms.css';
import { Link } from 'gatsby';
import { ctaSubmittedBox } from '../../styles/page.css';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { trackEvent } = Plausible({
      domain: 'frontside.com',
      trackLocalhost: true,
    });

    const trackCTA = (status) => {
      trackEvent('subscribed', {
        props: {
          path: location.pathname,
          status,
        },
      });
    };

    setStatus('sending');
    try {
      await axios({
        method: 'post',
        url: '/.netlify/functions/subscribe-newsletter',
        data: {
          email,
        },
      });
      trackCTA('success');
      setStatus('sent');
    } catch (e) {
      trackCTA('error');
      setStatus('error');
    }
  };

  return (
    <form className={newsletterForm} onSubmit={handleSubmit}>
      <h2 className={headingLg}>
        Subscribe to our{' '}
        <strong className={textGradientPinkPurple}>DX&nbsp;newsletter</strong>
      </h2>
      <p className="subscribe-form--intro">
        Receive a monthly curation of resources about testing, design systems,
        CI/CD, and anything that makes developing at scale easier.
      </p>
      {status === 'sent' ? (
        <>
          <p className={ctaSubmittedBox}>
            <strong className={textLg}>Thanks for joining us!</strong>
            <br /> We also hang out in a{' '}
            <a
              href="https://discord.gg/r6AvtnU"
              target="_blank"
              rel="noopener noreferrer"
              className={textLink}
            >
              Discord server
            </a>{' '}
            if you wanna say hi.
          </p>
        </>
      ) : (
        <>
          <div className={inputButtonBar}>
            <input
              placeholder="Your email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              defaultValue={email}
              className={inputElement}
              required={true}
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className={textButton}
            >
              {status === 'sending' ? (
                'Sending...'
              ) : (
                <span className={textArrowWhite}>Sign up</span>
              )}
            </button>
          </div>
          {status === 'error' ? (
            <p className="subscribe-form--error">
              There was an error submitting the form. Please try again, or{' '}
              <Link to="/contact" className={textBlueDashWhite}>
                contact us
              </Link>
              .
            </p>
          ) : (
            <></>
          )}
        </>
      )}
    </form>
  );
}