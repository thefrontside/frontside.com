import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from 'classnames';
import addToMailchimp from 'gatsby-plugin-mailchimp';
import Input from '../input';
import Button from '../button';

import './subscribe-form.css';

SubscribeForm.propTypes = {
  highlight: PropTypes.bool,
};

export default function SubscribeForm({ highlight }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await addToMailchimp(email);
      setStatus('sent');
    } catch(e) {
      setStatus('error');
    }
  }

  return (
    <form className='subscribe-form' onSubmit={handleSubmit}>
      <h2 className={css('subscribe-form--title', {'subscribe-form--title__highlight': highlight})}>Join our <br /> newsletter</h2>
      <div className={css('subscribe-form--inputs', {'subscribe-form--inputs__sent': status === 'sent'})}>
        <p className="subscribe-form--intro">Receive a monthly curation of articles and podcast episodes about automated testing, developer experience, and other best practices.</p>
        {status === 'sent' ?
        <>
          <p className="subscribe-form--thanks">
            <strong>Thanks for joining us!</strong><br /> We also hang out in a <a href="https://discord.gg/r6AvtnU" target="_blank" rel="noopener noreferrer">Discord server</a> if you wanna say hi.
          </p>
        </>
        :
        <>
          <Input
            placeholder="Your email"
            type="email"
            onChange={e => setEmail(e.target.value)}
            defaultValue={email}
            highlight={highlight}
            large={true}
            required={true}
          />
          <Button
            type="submit"
            highlight={highlight}
            large={true}
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending...' : 'Sign up!'}
          </Button>
          {status === 'error' ? <p className="subscribe-form--error">There was an error submitting the form. Please try again, or <a href="/contact">contact us</a>.</p> : <></>}
        </>}
      </div>
    </form>
  );
}
