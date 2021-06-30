import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

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
    allPeople {
      group(field: person___frontmatter___alumnus) {
        edges {
          node {
            name
            person {
              frontmatter {
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
            }
          }
        }
      }
    }
  }
`;
