import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import Content, { HTMLContent } from "../components/content";
import Text from '../components/text';

export const BlogPostTemplate = ({ content, tags, title }) => {
  tags = Array.isArray(tags) ? tags : [tags].filter(Boolean);

  return (
    <Content>
      <Text tag="h1">{title}</Text>
      <Text tag="p">
        Tags:{" "}
        {tags.map((tag, i) => (
          <>
            <Link key={`tag-${tag}`} to={`/tags/${kebabCase(tag)}/`}>
              {tag}
            </Link>
            {tags.length > i + 1 ? ", " : null}
          </>
        ))}
      </Text>
      <HTMLContent content={content} />
    </Content>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object
};

const BlogPost = ({ data }) => {
  console.log(arguments);
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
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
    }
  }
`;
