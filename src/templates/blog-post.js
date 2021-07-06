import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import Content from '../components/content';
import Text from '../components/text';
import SubscribeForm from '../components/subscribe-form';

import './blog-post.css';

export const BlogPostTemplate = ({
  content,
  tags,
  title,
  authors,
  date,
  image,
}) => {
  tags = Array.isArray(tags) ? tags : [tags].filter(Boolean);

  return (
    <>
      <section className="widewrapper herowrapper blog-post-hero w-container">
        <div className="herotext">
          <h1 className="heading blog-post-heading">{title}</h1>
          <p className="subheader blog-post-meta">
            By
            {authors.map((author, i) => (
              <>
                {i === 0 ? '' : authors.length > 2 ? ', ' : ' and '}
                {/* Author links will lead to team member page, which is currently pending. */}
                {/* <Link key={author.slug} to={author.slug}>
                <Text>{author.name}</Text>
              </Link> */}
                <Text key={author.slug}>{author.name}</Text>
              </>
            ))}
            <br />
            <span class="blog-post-date">{date}</span>
          </p>
          <ul class="blog-post-tags">
            {tags.map((tag, i) => (
              <li key={`tag-${tag}`} class="blog-post-tag">
                <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="blog-post-hero-image">
          <img src={image} alt="" />
        </div>
      </section>
      <Content>
        <section
          className="blog-post-content"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </Content>
      <footer className="widewrapper w-container">
        <SubscribeForm highlight={true} />
      </footer>
    </>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
};

const BlogPost = ({ data: { blogPost } }) => {
  return (
    <Layout
      title={blogPost.title}
      description={blogPost.post.frontmatter.description}
      image={
        blogPost.post.frontmatter.img == null
          ? null
          : blogPost.post.frontmatter.img.childImageSharp.resolutions.src
      }
      path={blogPost.slug}
    >
      <BlogPostTemplate
        content={blogPost.post.html}
        description={blogPost.post.frontmatter.description}
        tags={blogPost.post.frontmatter.tags}
        title={blogPost.title}
        authors={blogPost.authorNodes.map(author => ({
          slug: author.slug,
          name: author.name,
        }))}
        date={blogPost.post.frontmatter.date}
        image={
          blogPost.post.frontmatter.img == null
            ? null
            : blogPost.post.frontmatter.img.childImageSharp.resolutions.src
        }
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    blogPost(id: { eq: $id }) {
      id
      title
      slug
      authorNodes {
        name
        slug
      }
      post {
        html
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          description
          tags
          img {
            childImageSharp {
              resolutions(width: 1000) {
                src
              }
            }
          }
        }
      }
    }
  }
`;
