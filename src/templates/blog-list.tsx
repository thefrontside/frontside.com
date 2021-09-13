import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PostsList from '../components/posts-list';
import Pagination from '../components/pagination';
import PodcastCTA from '../components/PodcastCTA';
import SubscribeForm from '../components/subscribe-form';

import {
  pageWrap,
  sectionHeader,
  entriesList,
  entriesListEntry,
} from '../styles/page.css';
import {
  headingXl,
  textGradientPinkPurple,
  textGradientPurpleSkyblue,
  textLg,
} from '../styles/typography.css';

import PodcastPreview from '../components/podcast-preview/podcast-preview';

// we manually add the image in the repo so we gather that data here
const PodcastFeaturedEpisodes = [
  {
    fromPodcast: true,
    slug: '/podcast/open-telemetry-with-austin-parker/',
    image: '/img/podcast-heroes/open-telemetry-with-austin-parker.png',
  },
  {
    fromPodcast: true,
    slug: '/podcast/paying-open-source-contributors-with-puneet-lath/',
    image:
      '/img/podcast-heroes/paying-open-source-contributors-with-puneet-lath.png',
  },
  {
    fromPodcast: true,
    slug: '/podcast/product-roadmaps-and-tooling-planning-with-steve-pereira/',
    image:
      '/img/podcast-heroes/product-roadmaps-and-tooling-planning-with-steve-pereira.png',
  },
  {
    fromPodcast: true,
    slug: '/podcast/data-trust-and-transparency-a-covid-19-vaccine-story',
    image:
      '/img/podcast-heroes/data-trust-and-transparency-a-covid-19-vaccine-story.png',
  },
  {
    fromPodcast: true,
    slug: '/podcast/type-systems-with-reason-ml-london-organizer-marcel-cutts-and-shane-wilson/',
    image: '/img/2020-reason-podcast.png',
  },
  {
    fromPodcast: true,
    slug: '/podcast/intro-to-rush-js-with-co-author-pete-gonzales/',
    image: '/img/2020-pod-rush.png',
  },
];

export default function BlogPage({
  data: {
    allBlogPost: { edges: posts },
    allSimplecastEpisode: { nodes: podcastEpisodes },
  },
  pageContext: { page, pages },
}) {
  let formattedPosts = posts.map(({ node }) => ({
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

  let formattedPodcasts = podcastEpisodes.map((episode, i) => ({
    ...episode,
    ...PodcastFeaturedEpisodes[i],
  }));

  let isCoverPage = page === 1;

  return (
    <Layout
      title={
        isCoverPage
          ? 'Frontside Blog'
          : `Frontside Blog - page ${page}`
      }
    >
      {!isCoverPage ? (
        <>
          <header className={sectionHeader}>
            <h2 className={headingXl}>
              <span className={textGradientPinkPurple}>Blog</span>: Page{' '}
              <em>{page}</em>
            </h2>
            <Pagination prefix="/blog" page={page} pages={pages} />
          </header>
          <div className="hero-navigation">
            <h2 className="hero-navigation-title"></h2>
          </div>
          <section className={pageWrap}>
            <PostsList
              pagination={
                <Pagination prefix="/blog" page={page} pages={pages} />
              }
              posts={formattedPosts}
            />
          </section>
        </>
      ) : (
        <>
          {/* <header className={heroWrap}>
            <div className={heroText}>
              <h1
                className={heading3Xl}
              >
                <span className={textPink}>Resources</span> for
                engineering teams
              </h1>
              <p className={textLg}>
                We maintain a blog, curate a newsletter about DX, and host a
                Backstage community.
              </p>
            </div>
            <div className={heroImage}>
              <img src={BlogheroImage} alt="" />
            </div>
          </header> */}
          <section className={pageWrap}>
            <header className={sectionHeader}>
              <h2 className={headingXl}>
                Recent <span className={textGradientPinkPurple}>blog</span>{' '}
                posts
              </h2>
              <p className={textLg}>
                We write about testing, design systems, Cloud native, and other
                DX topics.
              </p>
            </header>
            <PostsList
              pagination={
                <Pagination prefix="/blog" page={page} pages={pages} />
              }
              posts={formattedPosts}
            />
          </section>
          <section className={pageWrap}>
            <header className={sectionHeader}>
              <h2 className={headingXl}>
                Latest{' '}
                <span className={textGradientPurpleSkyblue}>podcast</span>{' '}
                episodes
              </h2>
              <p className={textLg}>
                We invite thought leaders to share their ideas about
                engineering.
              </p>
            </header>
            <ul className={entriesList}>
              {formattedPodcasts.map((episode, i) => (
                <li className={entriesListEntry} key={i}>
                  <PodcastPreview episode={episode} key={i} />
                </li>
              ))}
            </ul>
            <PodcastCTA />
          </section>
        </>
      )}
    </Layout>
  );
}

BlogPage.propTypes = {
  pageContext: PropTypes.shape({
    page: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export const pageQuery = graphql`
  query BlogQuery($skip: Int!, $limit: Int!) {
    allBlogPost(
      limit: $limit
      skip: $skip
      sort: { order: DESC, fields: [markdown___frontmatter___date] }
    ) {
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
    allSimplecastEpisode(limit: 6, sort: { fields: publishedAt, order: DESC }) {
      nodes {
        id
        title
        slug
        description: descriptionHtml
        authors: authorNodes {
          name
          slug
        }
      }
    }
  }
`;
