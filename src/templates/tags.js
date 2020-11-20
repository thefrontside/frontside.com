import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import PostsList from '../components/posts-list';

const TagRoute = ({data, pageContext}) => {
  const posts = data.allMarkdownRemark.edges;
  const tag = pageContext.tag;

  return (
    <Layout title={tag}>
      <PostsList
        heading={
          <>
            <h1 className="heading">
              Articles tagged with <span className="gradient-text">{tag}</span>
            </h1>
            <p className="subheader">
              <Link to="/tags/">Browse all tags</Link>
            </p>
          </>
        }
        posts={posts.map(({ node }) => ({
          id: node.id,
          slug: node.fields.slug,
          title: node.frontmatter.title,
          date: node.frontmatter.date,
          description: node.frontmatter.description,
          excerpt: node.excerpt,
          authors: node.fields.authors.map(author => ({
            slug: author.fields.slug,
            name: author.frontmatter.name,
          })),
        }))}
      />
    </Layout>
  );
}

export default TagRoute;

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 200)
          id
          fields {
            slug
            authors {
              fields {
                slug
              }
              frontmatter {
                name
              }
            }
          }
          frontmatter {
            title
            templateKey
            description
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
