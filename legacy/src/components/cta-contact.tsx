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
  formId = "n5Hz8E9N",
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
          id={formId}
          hidden={{ topic }}
          className={className}
          onSubmit={onSubmit}
          onReady={() => trackCTA('active')}
          onQuestionChanged={onQuestionChange}
          onClose={() => trackCTA('closed')}
          // enableSandbox={true}
          autoClose={2000}
          // these options are in the vanilla embed which they express that
          // the react component uses, but...
          // @ts-expect-error included in their base options
          keepSession={true}
        >
          <span className={arrowTextWhite}>{label}</span>
        </PopupButton>
      ) : (
        <p className={ctaSubmittedBox}>
          <strong className={thanksClassName}>Thanks for reaching out!</strong>
          <br />
          <span className={textSm}>
            Thank you for submitting a request. We will be in touch shortly.
          </span>
        </p>
      )}
    </>
  );
}
