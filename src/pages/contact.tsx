import React from 'react';
import { Widget } from '@typeform/embed-react';
import Plausible from 'plausible-tracker';

import Layout from '../components/layout';

import { contactTitle, contactTypeform, pageWrap } from '../styles/page.css';
import { headingXl } from '../styles/typography.css';

export default function ConsultingPage() {
  let questionsTrack = 'gc0';
  const { trackEvent } = Plausible({
    domain: 'frontside.com'
  });
  const onSubmit = () => {
    trackEvent('contact-form', {
      props: {
        status: 'submitted',
        qt: questionsTrack,
      },
    });
  };

  const onOpenedForm = () => {
    trackEvent('contact-form', {
      props: {
        status: 'active',
        qt: questionsTrack,
      },
    });
  };

  const onQuestionChange = ({ ref }) => {
    questionsTrack = `${questionsTrack}->${ref.slice(0, 4)}`;
    trackEvent('contact-form', {
      props: {
        status: 'active',
        qt: questionsTrack,
      },
    });
  };

  const onClose = () => {
    trackEvent('contact-form', {
      props: {
        status: 'closed',
        qt: questionsTrack,
      },
    });
  };
  return (
    <Layout title="Contact Frontside">
      <section className={pageWrap}>
        <header className={contactTitle}>
          <h2 className={headingXl}>Contact us</h2>
        </header>

        <Widget
          id="n5Hz8E9N"
          className={contactTypeform}
          onSubmit={onSubmit}
          onReady={onOpenedForm}
          onQuestionChanged={onQuestionChange}
          onClose={onClose}
        />
      </section>
    </Layout>
  );
}
