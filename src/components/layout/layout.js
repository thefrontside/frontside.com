import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import './layout.css';
import "syntax-highlighting/assets/css/prism/prism-base16-ateliersulphurpool.light.css";

import Navbar from '../navbar';
import Footer from '../footer';

export default function TemplateWrapper({ children, description, title, image }) {
  return (
    <StaticQuery
      query={graphql`
        query HeadingQuery {
          site {
            siteMetadata {
              title,
              description,
              image,
              siteUrl
            }
          }
        }
      `}
      render={data => (
        <main className="main">
          <Helmet>
            <html lang="en" />
            <title>{title ? `${title} | ${data.site.siteMetadata.title}` : data.site.siteMetadata.title}</title>
            <meta name="description" content={description ? description : data.site.siteMetadata.description} />
            <meta name="image" content={image ? `${data.site.siteMetadata.siteUrl}${image}` : data.site.siteMetadata.image} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:image" content={image ? `${data.site.siteMetadata.siteUrl}${image}` : data.site.siteMetadata.image} />
            <meta name="twitter:title" content={title ? `${title} | ${data.site.siteMetadata.title}` : data.site.siteMetadata.title} />
            <meta name="twitter:description" content={description ? description : data.site.siteMetadata.description} />
          </Helmet>
          <Navbar />

          {children}

          <Footer />
        </main>
      )}
    />
  );
}
