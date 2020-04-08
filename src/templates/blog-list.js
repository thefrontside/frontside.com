import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import PostsList from "../components/posts-list";
import Pagination from "../components/pagination";
import Text from "../components/text";
import Hero from "../components/hero";

export default function BlogPage({
  data: {
    allMarkdownRemark: { edges: posts }
  },
  pageContext: { page, pages }
}) {
  return (
    <Layout title={page === 1 ? "Blog" : `Blog - page ${page}`}>
      <Hero
        heading={
          <Text>
            Our Insights
          </Text>
        }
        subheading={
          <Text>
            Paradigms, frameworks, and tools <br /> around robust engineering.
          </Text>
        }
      />
      <PostsList
        heading={
          <>
            <Text tag="h2">
              {page === 1 ? "Blog" : `Blog on page ${page}`}
            </Text>
          </>
        }
        pagination={<Pagination prefix="/blog" page={page} pages={pages} />}
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

BlogPage.propTypes = {
  pageContext: PropTypes.shape({
    page: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export const pageQuery = graphql`
  query BlogQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
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
