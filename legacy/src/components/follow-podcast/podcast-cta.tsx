import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ApplePodcastsBadge from '../../img/apple-podcasts-badge.svg';
import { inputText } from '../../styles/inputs.css';
import { headingLg, textGradientPinkPurple } from '../../styles/typography.css';
import {
  appleLink,
  copiedMark,
  copyButton,
  ctaWrapper,
  rssOptions,
} from './podcast-cta.css';

export default function PodcastCTA() {
  const [copied, setCopied] = useState(false);
  return (
    <section className={ctaWrapper}>
      <h2 className={headingLg}>Listen to our podcast:</h2>
      <div className={rssOptions}>
        <a
          className={appleLink}
          href="https://podcasts.apple.com/us/podcast/the-frontside-podcast/id827250386?itsct=podcast_box&amp;itscg=30200"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={ApplePodcastsBadge} alt="Listen on Apple Podcasts" />
        </a>
        <div>
          <CopyToClipboard
            text="https://rss.simplecast.com/podcasts/96/rss"
            onCopy={() => setCopied(true)}
          >
            <button className={copyButton}>Copy RSS</button>
          </CopyToClipboard>
          <input
            type="hidden"
            value="https://rss.simplecast.com/podcasts/96/rss"
            readOnly
            className={inputText}
          />
          <span className={copiedMark[copied ? 'copied' : 'default']}>
            <strong className={textGradientPinkPurple}>&#x2713;</strong>
          </span>
        </div>
      </div>
    </section>
  );
}
