import React from 'react';
import Plausible from 'plausible-tracker';
import { PopupButton } from '@typeform/embed-react';
import { actionButton } from '../styles/buttons.css';
import {
  arrowTextWhite,
  textGradientPurpleSkyblue,
  textSm,
} from '../styles/typography.css';
import { ctaSubmittedBox } from '../styles/page.css';

export default function ContactCTA({
  submitted,
  setSubmitted,
  eventId,
  ctaId,
  label,
  topic,
  className = actionButton,
  thanksClassName = textGradientPurpleSkyblue,
}) {
  let questionsTrack = '0';
  const { trackEvent } = Plausible({
    domain: 'frontside.com',
    trackLocalhost: true,
  });

  const trackCTA = (status) => {
    trackEvent(eventId, {
      props: {
        status,
        cta: ctaId,
        qt: questionsTrack,
      },
    });
  };
  const onSubmit = () => {
    document.body.style.overflow = '';
    trackCTA('submitted');
    setSubmitted(true);
  };

  const onQuestionChange = ({ ref }) => {
    questionsTrack = `${questionsTrack}->${ref.slice(0, 4)}`;
    trackCTA('active');
  };

  return (
    <>
      {!submitted ? (
        <PopupButton
          id="n5Hz8E9N"
          hidden={{ topic }}
          className={className}
          onSubmit={onSubmit}
          onReady={() => trackCTA('active')}
          onQuestionChanged={onQuestionChange}
          onClose={() => trackCTA('closed')}
        >
          <strong className={arrowTextWhite}>{label}</strong>
        </PopupButton>
      ) : (
        <p className={ctaSubmittedBox}>
          <strong className={thanksClassName}>Thanks for reaching out!</strong>
          <br />
          <span className={textSm}>
            We'll get back to you within a business day.
          </span>
        </p>
      )}
    </>
  );
}
