import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import PostsList from "../components/posts-list";
import Text from "../components/text";

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges;
    const tag = this.props.pageContext.tag;

    return (
      <Layout title={tag}>
        <PostsList
          heading={
            <>
              <Link to="/tags/">Browse all tags</Link>
              <Text tag="h2">{`Tag: ${tag}`}</Text>
            </>
          }
          posts={posts.map(({ node }) => ({
            id: node.id,
            slug: node.fields.slug,
            title: node.frontmatter.title,
            date: node.frontmatter.date,
            excerpt: node.excerpt,
            authors: node.fields.authors.map(author => ({
              slug: author.fields.slug,
              name: author.frontmatter.name
            }))
          }))}
        />
      </Layout>
    );
  }
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
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
