import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';

import {
  heroText,
  heroWrap,
  radiusMd,
  sideImage,
} from '../styles/page.css';
import {
  headingXl,
  heading3Xl,
  mardownColumn,
  peopleHeroHeading,
  textLg,
} from '../styles/typography.css';
import { socialLink } from '../styles/buttons.css';

const PersonPage = ({
  data: {
    people: {
      person: {
        frontmatter: {
          name,
          title: personTitle,
          img,
          imgAlt,
          twitter,
          github,
          bio,
          intro,
          alumnus,
        },
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
          <h1 className={alumnus ? heading3Xl : peopleHeroHeading}>{name}</h1>

          <h2 className={headingXl}>
            {alumnus ? 'Frontside alumnus' : personTitle}
          </h2>

          {alumnus ? (
            <></>
          ) : (
            <>
              <p className={textLg}>{intro}</p>
              <p>
                {twitter && (
                  <a
                    href={`https://twitter.com/${twitter}`}
                    className={socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </a>
                )}
                {github && (
                  <a
                    href={`https://github.com/${github}`}
                    className={socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Github
                  </a>
                )}
              </p>
            </>
          )}
        </div>
        <div className={sideImage}>
          {img && (
            <img
              src={img.childImageSharp.fixed.src}
              alt={imgAlt}
              className={radiusMd}
            />
          )}
        </div>
      </header>

      <div className={mardownColumn}>
        <p className={textLg}>{bio}</p>
        {blogPosts && blogPosts.length ? (
          <>
            <h2 className={headingXl}>Blog Posts</h2>
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
            <h2 className={headingXl}>Podcast Episodes</h2>
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
          twitter
          github
          intro
          bio
          alumnus
          img {
            childImageSharp {
              fixed(width: 600) {
                src
              }
            }
          }
          imgAlt
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
