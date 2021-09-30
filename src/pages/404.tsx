import React from 'react';
import Layout from '../components/layout';
import { sectionHeader } from '../styles/page.css';
import {
  headingXl,
  textGradientPinkPurple,
  textLg,
} from '../styles/typography.css';

const NotFoundPage = () => (
  <Layout title="404">
    <header className={sectionHeader}>
      <h2 className={headingXl}>
        <span className={textGradientPinkPurple}>Not found</span>
      </h2>
      <p className={textLg}>
        You just hit a route that doesn&#39;t exist... the sadness.
      </p>
    </header>
  </Layout>
);

export default NotFoundPage;
