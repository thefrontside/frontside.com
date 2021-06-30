import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import Img from 'gatsby-image';
import Content from '../components/content';
import './people.css';

const PersonPage = ({
  data: {
    people: {
      person: {
        frontmatter: { name, title: personTitle, img, twitter, github, bio },
      },
      posts,
      episodes,
    },
  },
}) => {
  return (
    <Layout title="Team">
      <Content>
        {img && <Img fixed={img.childImageSharp.fixed} />}
        <h1>{name}</h1>
        <div className="person-title">{personTitle}</div>
        <p>{bio}</p>
        <ul className="list-style-none">
          {twitter && (
            <li>
              Twitter: <a href={`https://twitter.com/${twitter}`}>{twitter}</a>
            </li>
          )}
          {github && (
            <li>
              GitHub: <a href={`https://github.com/${github}`}>{github}</a>
            </li>
          )}
        </ul>
        {posts && posts.length ? (
          <>
            <h2>Blog Posts</h2>
            <ul className="list-style-none">
              {posts.map(post => (
                <li key={post.fields.slug}>
                  <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}
        {episodes && episodes.length ? (
          <>
            <h2>Podcast Episodes</h2>
            <ul className="list-style-none">
              {episodes.map(episode => (
                <li key={episode.number}>
                  <Link to={`/podcast/${episode.slug}`}>{episode.title}</Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </Content>
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
              fixed(width: 300) {
                ...GatsbyImageSharpFixed
              }
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
      posts {
        frontmatter {
          title
        }
        fields {
          slug
        }
      }
    }
  }
`;
