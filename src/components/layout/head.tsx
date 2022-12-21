import React from 'react';

interface HeadProps {
  title: string;
  description: string;
  image: string;
  path?: string;
}

export const Head = ({ title, description, image, path }: HeadProps) => {
  return (
    <>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      {path ? <meta property="og:url" content={path} /> : null}
    </>
  );
};
