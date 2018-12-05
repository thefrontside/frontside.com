const _ = require("lodash");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const { fmImagesToRelative } = require("gatsby-remark-relative-images");

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  let result = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
            }
          }
        }
      }
      allSimplecastEpisode {
        edges {
          node {
            id
            number
            season
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    result.errors.forEach(e => console.error(e.toString()));
    throw result.errors;
  }

  const posts = result.data.allMarkdownRemark.edges;

  posts.forEach(
    ({
      node: {
        id,
        fields: { slug },
        frontmatter: { tags, templateKey }
      }
    }) =>
      createPage({
        path: slug,
        tags: tags,
        component: path.resolve(`src/templates/${String(templateKey)}.js`),
        // additional data can be passed via context
        context: {
          id
        }
      })
  );

  // Tag pages:
  let tags = posts.reduce((acc, { node: { frontmatter: { tags } } }) => {
    if (tags) {
      return [...acc, ...tags];
    } else {
      return acc;
    }
  }, []);

  // Eliminate duplicate tags
  tags = _.uniq(tags);

  // Make tag pages
  tags.forEach(tag =>
    createPage({
      path: `/tags/${_.kebabCase(tag)}/`,
      component: path.resolve(`src/templates/tags.js`),
      context: {
        tag
      }
    })
  );


  result.data.allSimplecastEpisode.edges.forEach(({ node: {
    id,
    season,
    number,
    slug
  }}) => createPage({
    path: `/podcast/${slug}/`,
    component: path.resolve('src/templates/episode.js'),
    context: {
      id,
      season,
      number
    }
  }))

  return result;
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node); // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};
