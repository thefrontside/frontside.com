const _slugify = require('slugify');

const slugify = str =>
  _slugify(str, {
    lower: true,
  });

// blog posts and people are pulled in through gatsby-source-filesystem and
// transformed via gatsby-transformer remark, we respond to this and form up the
// data a bit to make it easier to query
exports.onCreateNode = ({
  node,
  actions: { createNode, createNodeField },
  createNodeId,
  createContentDigest,
  getNode,
}) => {
  if (node.internal.type === 'MarkdownRemark') {
    const parent = getNode(node.parent);
    // the gatsby-source-filesystem config sets the sourceInstanceName to `people`
    if (parent.sourceInstanceName === 'people') {
      let nodeId = createNodeId(`person-${node.id}`);
      // create a new People node that links up the person, their posts and their episodes
      return createNode({
        name: node.frontmatter.name,
        slug: slugify(node.frontmatter.name),
        // Required fields.
        id: nodeId,
        parent: node.id,
        person___NODE: node.id,
        children: [],
        internal: {
          type: `People`,
          contentDigest: createContentDigest(node),
          description: `A Frontside Team Member."`, // optional
        },
      });

      // the gatsby-source-filesystem config sets the sourceInstanceName to `blog`
    } else if (parent.sourceInstanceName === 'blog') {
      // add a `fields.authorNodes` that takes the string of authors and
      // links them to our `Person` nodes created above
      // we also add a mapping to the gatsby-config.js to let gatsby know the appropriate type
      // since we don't have real control of this node (in the future maybe we make a BlogPost node?)
      return createNodeField({
        node,
        name: 'authorNodes',
        value: node.frontmatter.author.split(',').map(author => author.trim()),
      });
    }
  }
};

// https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#createSchemaCustomization
// define the `People` node that we will populate
exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type People implements Node {
      posts: [MarkdownRemark]
      episodes: [SimplecastEpisode]
    }
    `;

  createTypes(typeDefs);
};

// https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#createResolvers
// set up a resolver which links the posts / episodes property to the related nodes
// based on the `Person` node values
exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    People: {
      posts: {
        type: ['MarkdownRemark'],
        resolve: (source, args, context, info) => {
          return context.nodeModel.runQuery({
            query: {
              filter: {
                frontmatter: { author: { eq: source.name } },
              },
            },
            type: 'MarkdownRemark',
          });
        },
      },
      episodes: {
        type: ['SimplecastEpisode'],
        resolve: (source, args, context, info) => {
          return context.nodeModel.runQuery({
            query: {
              filter: {
                authors: { in: source.slug },
              },
            },
            type: 'SimplecastEpisode',
          });
        },
      },
    },
  };

  createResolvers(resolvers);
};
