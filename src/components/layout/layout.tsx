import React from 'react';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import Navbar from '../navbar';
import Footer from '../footer';

import '../../styles/global.css';
import { Head } from './head';

type PageProps = {
  children: any;
  description?: string;
  title: string;
  image?: string;
  path?: string;
};

export default function TemplateWrapper({
  children,
  description,
  title,
  image,
  path,
}: PageProps) {
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
            <Head
              title={title ? `${title}` : data.site.siteMetadata.title}
              description={
                description ? description : data.site.siteMetadata.description
              }
              image={
                image
                  ? `${data.site.siteMetadata.siteUrl}${image}`
                  : data.site.siteMetadata.image
              }
              path={path ? `${data.site.siteMetadata.siteUrl}${path}` : undefined}
            />
          </Helmet>
          <Navbar />

          {children}

          <Footer />
        </>
      )}
    />
  );
}
