import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ApplePodcastsBadge from '../../img/apple-podcasts-badge.svg';
import Input from '../input';
import Button from '../button';

export default function PodcastCTA() {
  const [copied, setCopied] = useState(false);
  return (
    <section className="widewrapper w-container podcast-block">
      <h2 className="podcast-title">
        Subscribe to <br /> our podcast:
      </h2>
      <a
        className="applepodcasts-link"
        href="https://podcasts.apple.com/us/podcast/the-frontside-podcast/id827250386?itsct=podcast_box&amp;itscg=30200"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={ApplePodcastsBadge} alt="Listen on Apple Podcasts" />
      </a>
      <div className="rss-box">
        <CopyToClipboard
          text="https://rss.simplecast.com/podcasts/96/rss"
          onCopy={() => setCopied(true)}
        >
          <Button>Copy RSS</Button>
        </CopyToClipboard>
        <Input value="https://rss.simplecast.com/podcasts/96/rss" readOnly />
        <span
          className={`rss-box--copied ${
            copied ? 'rss-box--copied__done' : 'rss-box--copied__pending'
          }`}
        >
          &#x2713;
        </span>
      </div>
    </section>
  );
}
