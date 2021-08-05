import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import Layout from '../components/layout';
import PostsList from '../components/posts-list';
import Pagination from '../components/pagination';
import PodcastCTA from '../components/PodcastCTA';

import BlogHeroImage from '../img/plork/blog-hero@1.5x.png';

import './blog-list.css';

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

  if (page === 1) {
    let postsAndEpisodes = [
      ...formattedPosts.slice(0, 3),
      { ...podcastEpisodes[0], ...PodcastFeaturedEpisodes[0] },
      { ...podcastEpisodes[1], ...PodcastFeaturedEpisodes[1] },
      ...formattedPosts.slice(3, 6),
      { ...podcastEpisodes[2], ...PodcastFeaturedEpisodes[2] },
      { ...podcastEpisodes[3], ...PodcastFeaturedEpisodes[3] },
      ...formattedPosts.slice(6),
      { ...podcastEpisodes[4], ...PodcastFeaturedEpisodes[4] },
      { ...podcastEpisodes[5], ...PodcastFeaturedEpisodes[5] },
    ];
    formattedPosts = postsAndEpisodes;
  }

  return (
    <Layout title={page === 1 ? 'Blog' : `Blog - page ${page}`}>
      <Helmet>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="The Frontside Podcast RSS"
          href="https://rss.simplecast.com/podcasts/96/rss"
        />
      </Helmet>
      <section className="widewrapper herowrapper w-container">
        <div className="herotext">
          <h1 className="heading">
            Sharing <span className="gradient-text">Frontside's</span> latest
            discoveries
          </h1>
          <p className="subheader">
            Find useful ideas and practical tips on apps engineering through our
            articles and podcast.
          </p>
          {page > 1 ? (
            <div className="hero-navigation">
              <h2 className="hero-navigation-title">
                Page <em className="hero-navigation-page">{page}</em>
              </h2>
              <Pagination prefix="/blog" page={page} pages={pages} />
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="consultingheroimage">
          <img src={BlogHeroImage} alt="" />
        </div>
      </section>
      <PodcastCTA />
      <PostsList
        pagination={<Pagination prefix="/blog" page={page} pages={pages} />}
        posts={formattedPosts}
      />
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
