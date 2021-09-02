import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import { GatsbyImage } from 'gatsby-plugin-image';
import {
  heroImage,
  heroText,
  heroWrap,
  pageWrap,
  radiusMd,
} from '../styles/page.css';
import {
  heading2,
  heroHeading,
  mardownColumn,
  peopleHeroHeading,
  textLg,
  textSm,
} from '../styles/typography.css';
import { paginationButton, socialLink, tagButton } from '../styles/buttons.css';

const PersonPage = ({
  data: {
    people: {
      person: {
        frontmatter: { name, title: personTitle, img, twitter, github, bio },
      },
      blogPosts,
      episodes,
    },
  },
}) => {
  return (
    <Layout title={name}>
      <header className={heroWrap}>
        <div className={heroText}>
          <h1 className={peopleHeroHeading}>{name}</h1>
          <h2 className={heading2}>{personTitle}</h2>
          <p className={textLg}>{bio}</p>
          <p>
            {twitter && (
              <a href={`https://twitter.com/${twitter}`} className={socialLink} target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            )}
            {github && (
              <a href={`https://github.com/${github}`} className={socialLink} target="_blank" rel="noopener noreferrer">
                Github
              </a>
            )}
          </p>
        </div>
        <div className={heroImage}>
          {img && (
            <GatsbyImage
              image={img.childImageSharp.gatsbyImageData}
              className={radiusMd}
              alt=""
            />
          )}
        </div>
      </header>

      <div className={mardownColumn}>

        {blogPosts && blogPosts.length ? (
          <>
            <h2 className={heading2}>Blog Posts</h2>
            <ul className="list-style-none">
              {blogPosts.map((post, i) => (
                <li key={i}>
                  <Link to={post.slug}>{post.title}</Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}
        {episodes && episodes.length ? (
          <>
            <h2 className={heading2}>Podcast Episodes</h2>
            <ul className="list-style-none">
              {episodes.map((episode, i) => (
                <li key={i}>
                  <Link to={`/podcast/${episode.slug}`}>{episode.title}</Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </Layout>
  );
};

PersonPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PersonPage;

export const peopleQuery = graphql`
  query PersonQuery($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    people(id: { eq: $id }) {
      person {
        frontmatter {
          name
          title
          img {
            childImageSharp {
              gatsbyImageData(layout: FIXED)
            }
          }
          twitter
          github
          bio
        }
      }
      episodes {
        title
        slug
      }
      blogPosts {
        title
        slug
      }
    }
  }
`;
