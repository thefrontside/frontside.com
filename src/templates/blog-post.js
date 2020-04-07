import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import Content from "../components/content";
import Text from "../components/text";

import "./blog-post.css";

export const BlogPostTemplate = ({ content, tags, title, authors, date }) => {
  tags = Array.isArray(tags) ? tags : [tags].filter(Boolean);

  return (
    <Content>
      <Link to='/blog' className='blog-post-blog-link'>Blog</Link>
      <Text className="blog-post-title" tag="h1">{title}</Text>
      <div className="blog-post-byline">
        {"Published by "}
        {authors.map((author, i) => (
          <>
            {(i === 0) ? '' : ', '}
            <Link key={author.slug} to={author.slug}>
              <Text>{author.name}</Text>
            </Link>
          </>
        ))}
        {` on ${date}. Tagged with `}{" "}
        {tags.map((tag, i) => (
          <span key={tag}>
            <Link key={`tag-${tag}`} to={`/tags/${kebabCase(tag)}/`}>
              {tag}
            </Link>
            {tags.length > i + 1 ? ", " : null}
          </span>
        ))}
        {"."}
      </div>

      <section
        className="blog-post-content"
        dangerouslySetInnerHTML={{
          __html: content
        }}
      />
    </Content>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string
};

const BlogPost = ({ data: { markdownRemark: post } }) => {
  return (
    <Layout title={post.frontmatter.title} description={post.frontmatter.description}>
      <BlogPostTemplate
        content={post.html}
        description={post.frontmatter.description}
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        authors={post.fields.authors.map(author => ({
          slug: author.fields.slug,
          name: author.frontmatter.name
        }))}
        date={post.frontmatter.date}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
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
    }
  }
`;
