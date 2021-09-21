import React from 'react';
import { Widget } from '@typeform/embed-react';
import Layout from '../components/layout';

import {
  contactTitle,
  contactTypeform,
  pageWrap,
  sectionHeader,
} from '../styles/page.css';
import { headingXl, textLg, mardownColumn } from '../styles/typography.css';

export default function ConsultingPage() {
  return (
    <Layout title="Contact">
      <section className={pageWrap}>
        <header className={contactTitle}>
          <h2 className={headingXl}>Contact us</h2>
        </header>

        <Widget id="n5Hz8E9N" className={contactTypeform} opacity={0} />
      </section>
    </Layout>
  );
}
