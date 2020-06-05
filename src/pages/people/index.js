import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/layout';

const PeoplePage = () => {
  return (
    <Layout title="Team">
      <h1>Team</h1>
    </Layout>
  );
};

export default PeoplePage;

export const peoplePageQuery = graphql`
  query PeopleListQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/people/" } }) {
      group(field: frontmatter___alumnus) {
        fieldValue
        edges {
          node {
            frontmatter {
              name
              title
              intro
              img {
                childImageSharp {
                  fixed(width: 300) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
            }
            fields {
              slug
            }
          }
        }
      }
    }
  }
`;
