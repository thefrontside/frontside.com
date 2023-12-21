import React, { useState } from "react";
import ContactCTA from "./cta-contact";
import { signupButton, newsletterSubscribeCTA } from "./newsletter-subscribe-cta/newsletter-subscribe-cta.css";
import {
  textGradientSkyblueGreen,
  heading3Xl,
  textGreen,
  textLg,
  featureHeading,
  headingXl,
  text2Xl,
  arrowTextWhite,
  textGradientGreenSkyblue,
  textGradientPinkPurple,
  textXl,
  arrowTextGreen,
  headingLg,
} from '../styles/typography.css';
import {
  actionButton,
  actionButtonGreen,
  openmicButton,
} from '../styles/buttons.css';

export interface NewsletterCTAOptions {
  trackingLocationId?: string;
}

export function NewsletterSubscribeCTA(options: NewsletterCTAOptions) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <hgroup className={newsletterSubscribeCTA}>
      <h2 className={headingLg}>
        Subscribe to our{' '}
        <strong className={textGradientPinkPurple}>DX&nbsp;newsletter</strong>
      </h2>

      <p>
        Receive a monthly curation of resources about testing, design systems,
        CI/CD, and anything that makes developing at scale easier.
      </p>
      <div>
        <ContactCTA
          formId="EMqW5BiF"
          submitted={submitted}
          setSubmitted={setSubmitted}
          label="Sign Up"
          topic="newsletter"
          eventId="cta-newsletter"
          ctaId={options.trackingLocationId}
          className={signupButton}
          thanksClassName={textGradientGreenSkyblue}
        />
      </div>
    </hgroup>
  );
}
