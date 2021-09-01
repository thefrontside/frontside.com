import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import SubscribeForm from '../components/subscribe-form';

import {
  HeroWrap,
  HeroText,
  HeroImage,
} from '../styles/page.css';
import {
  mardownColumn
} from '../styles/typography.css';
import { atoms } from '../styles/atoms.css';
import { TagButton } from '../styles/buttons.css';

const BlogPostTemplate = ({ content, tags, title, authors, date, image }) => {
  tags = Array.isArray(tags) ? tags : [tags].filter(Boolean);

  return (
    <>
      <header className={HeroWrap}>
        <div className={HeroText}>
          <h1
            className={atoms({
              fontScale: '3xl',
              fontWeight: 'extrabold',
            })}
          >
            {title}
          </h1>
          <p className={atoms({ fontScale: 'lg' })}>
            {authors.filter(Boolean).map((author, i) => (
                <React.Fragment key={author.slug}>
                  {i === 0 ? '' : authors.length > 2 ? ', ' : ' and '}
                  {/* Author links will lead to team member page, which is currently pending. */}
                  {/* <Link key={author.slug} to={author.slug}>
                          <Text>{author.name}</Text>
                        </Link>
                    */}
                  {author.name}
                </React.Fragment>
              ))}{' '}
          </p>
          <p className={atoms({ fontScale: 'sm' })}>
            {date}
          </p>
          <ul className={atoms({ listStyle: 'none', padding: 'none', marginTop: 'lg' })}>
            {tags.map((tag, i) => (
              <li key={`tag-${tag}`} className={atoms({ display: 'inline-block', marginRight: 'xs' })}>
                <Link to={`/tags/${kebabCase(tag)}/`} className={TagButton}>{tag}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={HeroImage}>
          <img src={image} alt="" className={atoms({ borderRadius: 'sm' })} />
        </div>
      </header>

      <main
        className={mardownColumn}
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
  
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
