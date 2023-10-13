import React from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage } from 'gatsby-plugin-image';

const PreviewCompatibleImage = ({ imageInfo }) => {
  const imageStyle = { borderRadius: '5px' };
  const { alt = '', childImageSharp, image } = imageInfo;

  if (!!image && !!image.childImageSharp) {
    return (
      <GatsbyImage
        // style={imageStyle}
        image={image.childImageSharp.gatsbyImageData}
        alt={alt}
      />
    );
  }

  if (!!childImageSharp) {
    return (
      <GatsbyImage
        // style={imageStyle}
        image={childImageSharp.gatsbyImageData}
        alt={alt}
      />
    );
  }

  if (!!image && typeof image === 'string')
    return (
      <img
        // style={imageStyle}
        src={image}
        alt={alt}
      />
    );

  return null;
};

PreviewCompatibleImage.propTypes = {
  imageInfo: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    style: PropTypes.object,
  }).isRequired,
};

export default PreviewCompatibleImage;
