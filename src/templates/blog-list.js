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

const PodcastFeaturedEpisodes = [
  {
    fromPodcast: true,
    id: 'open-telemetry-with-austin-parker',
    slug: '/podcast/open-telemetry-with-austin-parker/',
    image: '/img/podcast-heroes/open-telemetry-with-austin-parker.png',
    title: 'OpenTelemetry with Austin Parker',
    description:
      'In this episode, Austin Parker, Principal Developer Advocate at Lightstep talks about the OpenTelemetry Framework, which is an observability framework for cloud-native software and a collection of tools, APIs, and SDKs.',
    authors: [
      {
        key: 'charles-lowell',
        name: 'Charles Lowell',
      },
    ],
  },
  {
    fromPodcast: true,
    id: 'paying-open-source-contributors-with-puneet-lath',
    slug: '/podcast/paying-open-source-contributors-with-puneet-lath/',
    image:
      '/img/podcast-heroes/paying-open-source-contributors-with-puneet-lath.png',
    title: 'Paying Open Source Contributors with Puneet Lath',
    description:
      'In this episode, Puneet Lath, Director of Research and Development at Expensify, talks about the unique way Expensify is using open source with their products by not just open-sourcing software tools but also open-sourcing the front end of the product itself',
    authors: [
      {
        key: 'charles-lowell',
        name: 'Charles Lowell',
      },
    ],
  },
  {
    fromPodcast: true,
    id: 'product-roadmaps-and-tooling-planning-with-steve-pereira',
    slug: '/podcast/product-roadmaps-and-tooling-planning-with-steve-pereira/',
    image:
      '/img/podcast-heroes/product-roadmaps-and-tooling-planning-with-steve-pereira.png',
    title: 'Product Roadmaps and Tooling Planning with Steve Pereira',
    description:
      'In this episode, Steve Pereira—the founder of Visible—talks about how their unique approach to mapping helps customers get products out of the door fast and efficiently.',
    authors: [
      {
        key: 'charles-lowell',
        name: 'Charles Lowell',
      },
    ],
  },
  {
    fromPodcast: true,
    id: 'data-trust-and-transparency-a-covid-19-vaccine-story',
    slug: '/podcast/data-trust-and-transparency-a-covid-19-vaccine-story',
    image:
      '/img/podcast-heroes/data-trust-and-transparency-a-covid-19-vaccine-story.png',
    title: 'Data, Trust, and Transparency: A COVID-19 Vaccine Story',
    description:
      'Data is at the center of everything we do. Yet, how can we trust it in a world where more "organic" food is consumed than produced? As COVID-19 vaccines are getting ready to be offered at a never-seen scale, blockchain can help develop the trust and transparency that we need.',
    authors: [
      {
        key: 'charles-lowell',
        name: 'Charles Lowell',
      },
    ],
  },
  {
    fromPodcast: true,
    id: 'intro-to-rush-js',
    slug: '/podcast/intro-to-rush-js-with-co-author-pete-gonzales/',
    image: '/img/2020-pod-rush.png',
    title: 'Intro to Rush.js with co-author Pete Gonzales',
    description:
      'Monorepos are the new muse of library maintainers, but what happens when your project grows past 100 packages in the same repo? What about thousands? Rush.js was created for those cases, and Pete—who started the project while working at Microsoft—is here to tell us about it.',
    authors: [
      {
        key: 'charles-lowell',
        name: 'Charles Lowell',
      },
    ],
  },
  {
    fromPodcast: true,
    id: 'repkgs-reasonml',
    slug: '/podcast/repkgs-reasonml',
    image: '/img/2020-reason-podcast.png',
    title:
      'Type systems with ReasonML London organizer Marcel Cutts and Shane Wilson',
    description:
      "\"Java has done an excellent job at ruining types for everyone for quite a while—explains Marcel after describing the tech pub scene in London—but it's important to know there's more than one kind of type system.\" Along with Shane, they outline what's exciting about ReasonML and their experience with new languages and tools around types.",
    authors: [
      {
        key: 'charles-lowell',
        name: 'Charles Lowell',
      },
    ],
  },
];

export default function BlogPage({
  data: {
    allBlogPost: { edges: posts },
  },
  pageContext: { page, pages },
}) {
  let formattedPosts = posts.map(({ node }) => ({
    id: node.id,
    slug: node.slug,
    title: node.title,
    date: node.post.frontmatter.date,
    description: node.post.frontmatter.description,
    excerpt: node.post.excerpt,
    image:
      node.post.frontmatter.img == null
        ? null
        : node.post.frontmatter.img.childImageSharp.resolutions.src,
    authors: node.authorNodes.map(author => ({
      slug: author.slug,
      name: author.name,
    })),
  }));

  if (page === 1) {
    let postsAndEpisodes = [
      formattedPosts[0],
      PodcastFeaturedEpisodes[0],
      PodcastFeaturedEpisodes[1],
      ...formattedPosts.slice(1, 3),
      PodcastFeaturedEpisodes[2],
      PodcastFeaturedEpisodes[3],
      ...formattedPosts.slice(3, 5),
      PodcastFeaturedEpisodes[4],
      ...formattedPosts.slice(5),
      PodcastFeaturedEpisodes[5],
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
            <div class="hero-navigation">
              <h2 class="hero-navigation-title">
                Page <em class="hero-navigation-page">{page}</em>
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
      sort: { order: DESC, fields: [post___frontmatter___date] }
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
          post {
            excerpt(pruneLength: 200)
            frontmatter {
              description
              date(formatString: "MMMM DD, YYYY")
              img {
                childImageSharp {
                  resolutions(width: 600) {
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
