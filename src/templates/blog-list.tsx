import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import Layout from '../components/layout';
import PostsList from '../components/posts-list';
import Pagination from '../components/pagination';
import PodcastCTA from '../components/PodcastCTA';

import BlogHeroImage from '../img/plork/blog-hero@1.5x.png';

import {
  PageWrap,
  HeroWrap,
  HeroText,
  HeroImage,
  SectionHeader,
} from '../styles/page.css';
import {
  TextGradientPinkPurple,
  TextGradientPurpleSkyblue,
} from '../styles/typography.css';
import { EntriesList } from '../styles/page.css';
import { atoms } from '../styles/atoms.css';
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
          ? 'Resources for engineering teams'
          : `Frontside Blog - page ${page}`
      }
    >
      {!isCoverPage ? (
        <>
          <header className={SectionHeader}>
            <h2
              className={atoms({
                fontScale: 'xl',
                fontWeight: 'extrabold',
                textTransform: 'uppercase',
                marginTop: 'xl'
              })}
            >
              <span className={TextGradientPinkPurple}>Blog</span>: Page <em>{page}</em>
            </h2>
            <Pagination prefix="/blog" page={page} pages={pages} />
          </header>
          <div className="hero-navigation">
            <h2 className="hero-navigation-title">
              
            </h2>
            
          </div>
          <section className={PageWrap}>
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
          <header className={HeroWrap}>
            <div className={HeroText}>
              <h1
                className={atoms({
                  fontScale: '3xl',
                  fontWeight: 'extrabold',
                  textTransform: 'uppercase',
                })}
              >
                <span className={atoms({ color: 'pink' })}>Resources</span> for
                engineering teams
              </h1>
              <p className={atoms({ fontScale: 'lg' })}>
                We maintain a blog, curate a newsletter about DX, and host a
                Backstage community.
              </p>
            </div>
            <div className={HeroImage}>
              <img src={BlogHeroImage} alt="" />
            </div>
          </header>
          <section className={PageWrap}>
            <h2>Subscribe to our DX Newsletter</h2>
          </section>
          <section className={PageWrap}>
            <header className={SectionHeader}>
              <h2
                className={atoms({
                  fontScale: 'xl',
                  fontWeight: 'extrabold',
                  textTransform: 'uppercase',
                })}
              >
                Recent <span className={TextGradientPinkPurple}>blog</span>{' '}
                posts
              </h2>
              <p className={atoms({ fontScale: 'lg' })}>
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
          <section className={PageWrap}>
            <header className={SectionHeader}>
              <h2
                className={atoms({
                  fontScale: 'xl',
                  fontWeight: 'extrabold',
                  textTransform: 'uppercase',
                })}
              >
                Latest{' '}
                <span className={TextGradientPurpleSkyblue}>podcast</span>{' '}
                episodes
              </h2>
              <p className={atoms({ fontScale: 'lg' })}>
                We invite thought leaders to share their ideas about
                engineering.
              </p>
            </header>
            <ul className={EntriesList}>
              {formattedPodcasts.map((episode, i) => (
                <PodcastPreview episode={episode} key={i} />
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
