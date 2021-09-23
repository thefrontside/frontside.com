import React from 'react';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import Navbar from '../navbar';
import Footer from '../footer';
import Plausible from 'plausible-tracker';

import '../../styles/global.css';
import 'syntax-highlighting/assets/css/prism/prism-base16-ateliersulphurpool.light.css';

export default function TemplateWrapper({
  children,
  description,
  title,
  image,
  path,
}) {
  const { trackPageview } = Plausible({
    domain: 'frontside.com',
  });
  trackPageview();
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
      render={(data) => (
        <>
          <Helmet>
            <html lang="en" />
            <title>
              {title
                ? `${title}`
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
                  ? `${title}`
                  : data.site.siteMetadata.title
              }
            />
            <meta property="og:type" content="website" />

            <meta
              property="og:image"
              content={
                image
                  ? `${data.site.siteMetadata.siteUrl}${image}`
                  : data.site.siteMetadata.image
              }
            />
          </Helmet>
          {path && typeof path === 'string' ? (
            <Helmet>
              <meta
                property="og:url"
                content={`${data.site.siteMetadata.siteUrl}${path}`}
              />
            </Helmet>
          ) : (
            <></>
          )}
          <Navbar />

          {children}

          <Footer />
        </>
      )}
    />
  );
}
