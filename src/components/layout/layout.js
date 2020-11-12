import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import './layout.css';
import 'syntax-highlighting/assets/css/prism/prism-base16-ateliersulphurpool.light.css';

import Navbar from '../navbar';
import Footer from '../footer';

export default function TemplateWrapper({
  children,
  description,
  title,
  image,
}) {
  return (
    <StaticQuery
      query={graphql`
        query HeadingQuery {
          site {
            siteMetadata {
              title
              description
              image
              siteUrl
            }
          }
        }
      `}
      render={data => (
        <main className="main">
          <Helmet>
            <html lang="en" />
            <title>
              {title
                ? `${title} | ${data.site.siteMetadata.title}`
                : data.site.siteMetadata.title}
            </title>
            <meta
              name="description"
              content={
                description ? description : data.site.siteMetadata.description
              }
            />
            <meta
              name="image"
              content={
                image
                  ? `${data.site.siteMetadata.siteUrl}${image}`
                  : data.site.siteMetadata.image
              }
            />
            <meta name="twitter:card" content="summary" />
            <meta
              name="twitter:image"
              content={
                image
                  ? `${data.site.siteMetadata.siteUrl}${image}`
                  : data.site.siteMetadata.image
              }
            />
            <meta
              name="twitter:title"
              content={
                title
                  ? `${title} | ${data.site.siteMetadata.title}`
                  : data.site.siteMetadata.title
              }
            />
            <meta
              name="twitter:description"
              content={
                description ? description : data.site.siteMetadata.description
              }
            />
            <meta
              property="og:title"
              content={
                title
                  ? `${title} | ${data.site.siteMetadata.title}`
                  : data.site.siteMetadata.title
              }
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={data.site.siteMetadata.siteUrl} />
            <meta
              property="og:image"
              content={
                image
                  ? `${data.site.siteMetadata.siteUrl}${image}`
                  : data.site.siteMetadata.image
              }
            />
            <script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=5f7f19d60c33ef0c409a8bf8" type="text/javascript" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
            <script src="/js/webflow.js" type="text/javascript"></script>
          </Helmet>
          <Navbar />

          {children}

          <Footer />
        </main>
      )}
    />
  );
}
