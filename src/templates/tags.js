import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import PostsList from '../components/posts-list';

const TagRoute = ({ data, pageContext }) => {
  const posts = data.allBlogPost.edges;
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
          slug: node.slug,
          title: node.post.frontmatter.title,
          date: node.post.frontmatter.date,
          description: node.post.frontmatter.description,
          excerpt: node.post.excerpt,
          authors: node.authorNodes.map(author => ({
            slug: author.slug,
            name: author.name,
          })),
        }))}
      />
    </Layout>
  );
};

export default TagRoute;

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allBlogPost(
      limit: 1000
      sort: { fields: [post___frontmatter___date], order: DESC }
      filter: { post: { frontmatter: { tags: { in: [$tag] } } } }
    ) {
      totalCount
      edges {
        node {
          id
          slug
          title
          authorNodes {
            name
            slug
          }
          post {
            excerpt(pruneLength: 200)
            frontmatter {
              description
              date(formatString: "MMMM DD, YYYY")
            }
          }
        }
      }
    }
  }
`;
