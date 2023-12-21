import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import { NewsletterSubscribeCTA } from '../components/newsletter-subscribe-cta';

import {
  heroWrap,
  heroText,
  tagListLine,
  tagListLineItem,
  radiusMd,
  sideImage,
} from '../styles/page.css';
import {
  heading3Xl,
  mardownColumn, textBlueDashWhite, textLg, textSm
} from '../styles/typography.css';
import { tagButton } from '../styles/buttons.css';
import { postFooter } from "./blog-post.css";

const BlogPostTemplate = ({ content, tags, title, authors, date, image }) => {
  tags = Array.isArray(tags) ? tags : [tags].filter(Boolean);

  return (
    <>
      <header className={heroWrap}>
        <div className={heroText}>
          <h1
            className={heading3Xl}
          >
            {title}
          </h1>
          <p className={textLg}>
            {authors.filter(Boolean).map((author, i) => (
                <React.Fragment key={author.slug}>
                  {i === 0 ? '' : authors.length > 2 ? ', ' : ' and '}
                  <Link key={author.slug} to={author.slug} className={textBlueDashWhite}>
                    {author.name}
                  </Link>
                </React.Fragment>
              ))}{' '}
          </p>
          <p className={textSm}>
            {date}
          </p>
          <ul className={tagListLine}>
            {tags.map((tag, i) => (
              <li key={`tag-${tag}`} className={tagListLineItem}>
                <Link to={`/tags/${kebabCase(tag)}/`} className={tagButton}>{tag}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={sideImage}>
          <img src={image} alt="" className={radiusMd} />
        </div>
      </header>

      <main
        className={mardownColumn}
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />

      <footer className={`widewrapper w-container ${postFooter}`}>
        <NewsletterSubscribeCTA trackingLocationId="blogpost" />
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

const BlogPost = ({
  data: {
    blogPost: { title, slug, markdown, authorNodes },
  },
}) => {
  return (
    <Layout
      title={title}
      description={markdown.frontmatter.description}
      image={
        markdown.frontmatter.img == null
          ? null
          : markdown.frontmatter.img.childImageSharp.fixed.src
      }
      path={slug}
    >
      <BlogPostTemplate
        content={markdown.html}
        description={markdown.frontmatter.description}
        tags={markdown.frontmatter.tags}
        title={title}
        authors={authorNodes.map((author) => ({
          slug: author.slug,
          name: author.name,
        }))}
        date={markdown.frontmatter.date}
        image={
          markdown.frontmatter.img == null
            ? null
            : markdown.frontmatter.img.childImageSharp.fixed.src
        }
      />
    </Layout>
    // <></>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdown: PropTypes.object,
  }),
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    blogPost(id: { eq: $id }) {
      title
      slug
      authorNodes {
        name
        slug
      }
      markdown {
        html
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          description
          tags
          img {
            childImageSharp {
              fixed(width: 1000) {
                src
              }
            }
          }
        }
      }
    }
  }
`;
