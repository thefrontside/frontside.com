import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PostsList from '../components/posts-list';


import {
  PageWrap,
  SectionHeader,
} from '../styles/page.css';
import {
  heading2,
  textGradientSkybluePink,
} from '../styles/typography.css';

const TagRoute = ({ data, pageContext }) => {
  const posts = data.allBlogPost.edges;
  const formattedPosts = posts.map(({ node }) => ({
    id: node.id,
    slug: node.slug,
    title: node.title,
    date: node.markdown.frontmatter.date,
    description: node.markdown.frontmatter.description,
    excerpt: node.markdown.excerpt,
    image:
      node.markdown.frontmatter.img == null
        ? null
        : node.markdown.frontmatter.img.childImageSharp.fixed.src,
    authors: node.authorNodes.map((author) => ({
      slug: author.slug,
      name: author.name,
    })),
  }));
  const tag = pageContext.tag;

  return (
    <Layout title={tag}>
      <header className={SectionHeader}>
        <h2 className={heading2}>
          Posts tagged with <span className={textGradientSkybluePink}>{tag}</span>
        </h2>
        {/* <Link to="/tags/" className={PaginationButton}>Browse all tags</Link> */}
      </header>
      <section className={PageWrap}>
        <PostsList
          posts={formattedPosts}
        />
      </section>
    </Layout>
    // <></>
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
      sort: { fields: [markdown___frontmatter___date], order: DESC }
      filter: { markdown: { frontmatter: { tags: { in: [$tag] } } } }
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
          markdown {
            excerpt(pruneLength: 200)
            frontmatter {
              description
              date(formatString: "MMMM DD, YYYY")
              img {
                childImageSharp {
                  fixed(width: 600) {
                    src
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
