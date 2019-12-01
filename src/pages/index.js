import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Hero from '../components/hero';
import Content from '../components/content';
import Text from '../components/text';
import Box from '../components/box';
import Button, { ButtonGroup } from '../components/button';
import HomeLogos, { Logo } from '../components/home-logos';
import PostsWidget from '../components/posts-widget';

// TODO: these logos should be managed by the CMS so we can change them easily
import logoHoneywell from '../img/clients/honeywell-logo.svg';
import logoDell from '../img/clients/dell-logo.svg';
import logoConde from '../img/clients/conde-nast-logo.svg';
import logoEbsco from '../img/clients/ebsco-logo.svg';
import logoSxsw from '../img/clients/sxsw-logo.svg';
import logoStandard from '../img/clients/standard-chartered-logo.svg';

export default function IndexPage({
  data: {
    allMarkdownRemark: { edges: posts },
    allSimplecastEpisode: { edges: episodes }
  }
}) {
  return (
    <Layout>
      <Hero
        heading={(
          <Text>
            Deliver next-generation user experiences, without the new-technology risks
          </Text>
        )}
        subheading={(
          <Text widows={3}>
            We help your team get ahead of your competitors <br /> through outstanding engineering.
          </Text>
        )}
      />

      <Content>
        <Text tag="p">
          Adopting new technologies can create a competitive advantage in the marketplace by allowing your team to build leading-edge user experiences, but this can also carry risks to delivery, both in the short and long term.
        </Text>
        <Text tag="p">
          Frontside specializes in eliminating the typical risks in these cases, building next-generation tools to enable cross-team collaboration, fast feedback, and upholding a high standard of quality.
        </Text>
        <Text tag="p">
        What you’re left with is a compelling user experience delivered on time, with the tools and training for your teams to continue delivering long into the future.
        </Text>
        <ButtonGroup>
          <Button to="/about">See how we can help</Button>
        </ButtonGroup>
      </Content>

      <Content>
        <Text tag="h2">
          Trusted by top development teams
        </Text>
        <HomeLogos>
          <Logo src={logoHoneywell} alt="Honeywell logo"/>
          <Logo src={logoDell} alt="Dell logo" square/>
          <Logo src={logoConde} alt="Conde Nast logo"/>
          <Logo src={logoEbsco} alt="EBSCO logo"/>
          <Logo src={logoSxsw} alt="SXSW logo"/>
          <Logo src={logoStandard} alt="Standard Chartered Bank logo" square/>
        </HomeLogos>
      </Content>

      <Content>
        <Text tag="h3" widows={3}>
          Own your stack. Go beyond frameworks like Angular, React or Vue.
        </Text>
        <Text tag="p">
          Attract and retain engineers with an elite developer experience that promotes code quality through thoughtful practices and a smooth development pipeline.
          We make your developer experience a first-class citizen so that your engineers stay unlocked, productive and interested.
        </Text>
        <ButtonGroup>
          <Button to="/about">Get to know us</Button>
        </ButtonGroup>
      </Content>

      <Content>
        <Box direction="row">
          <PostsWidget
            heading="Latest on the blog"
            linkTo="/blog"
            posts={posts.map(({ node }) => ({
              id: node.id,
              slug: node.fields.slug,
              title: node.frontmatter.title,
              date: node.frontmatter.date,
              authors: node.fields.authors.map(author => ({
                slug: author.fields.slug,
                name: author.frontmatter.name
              }))
            }))}
          />
          <PostsWidget
            heading="Latest on the podcast"
            linkTo="/podcast"
            posts={episodes.map(({ node })=> ({
              id: node.id,
              slug: `/podcast/${node.slug}`,
              title: node.title,
              date: node.publishedAt,
              authors: node.authors.map(author => ({
                slug: author.fields.slug,
                name: author.frontmatter.name
              }))
            }))}
          />
        </Box>
      </Content>
    </Layout>
  );
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    }),
    allSimplecastEpisode: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export const indexPageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      limit: 5
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
            authors {
              frontmatter {
                name
              }
              fields {
                slug
              }
            }
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
    allSimplecastEpisode(
      limit: 5
    ) {
      edges {
        node {
          id
          title
          slug
          publishedAt(formatString: "MMMM DD, YYYY")
          authors {
            frontmatter {
              name
            }
            fields {
              slug
            }
          }
        }
      }
    }
  }
`;
