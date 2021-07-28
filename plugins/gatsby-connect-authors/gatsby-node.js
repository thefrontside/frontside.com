const _slugify = require('slugify');
const { createFilePath } = require('gatsby-source-filesystem');

const slugify = (str) =>
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
        slug: `/people/${slugify(node.frontmatter.name)}/`,
        parent: node.id,
        // Required fields.
        id: nodeId,
        person___NODE: node.id,
        children: [],
        internal: {
          type: `People`,
          contentDigest: createContentDigest(node),
          description: `A Frontside Team Member."`,
        },
      });

      // the gatsby-source-filesystem config sets the sourceInstanceName to `blog`
    } else if (parent.sourceInstanceName === 'blog') {
      let nodeId = createNodeId(`blog-${node.id}`);
      // create a new BlogPost node which sets the slug / title for consistency
      // and links to the related MarkdownRemark node

      return createNode({
        title: node.frontmatter.title,
        slug: `/blog${createFilePath({ node, getNode })}`,
        authors: node.frontmatter.author
          .split(',')
          .map((author) => author.trim()),
        markdown___NODE: node.id,
        parent: node.id,
        // Required fields.
        id: nodeId,
        children: [],
        internal: {
          type: `BlogPost`,
          contentDigest: createContentDigest(node),
          description: `A Blog Post."`,
        },
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
      name: String!
      slug: String!
      blogPosts: [BlogPost]
      episodes: [SimplecastEpisode]
    }
    type BlogPost implements Node {
      title: String!
      slug: String!
      authors: [String]!
      authorNodes: [People]!
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
      blogPosts: {
        type: ['BlogPost'],
        resolve: (source, args, context, info) => {
          return context.nodeModel.runQuery({
            query: {
              filter: {
                authors: { eq: source.name },
              },
            },
            type: 'BlogPost',
          });
        },
      },
      episodes: {
        type: ['SimplecastEpisode'],
        resolve: (source, args, context, info) => {
          return context.nodeModel.runQuery({
            query: {
              filter: {
                authors: { eq: source.name },
              },
            },
            type: 'SimplecastEpisode',
          });
        },
      },
    },
    BlogPost: {
      authorNodes: {
        type: ['People'],
        resolve: (source, args, context, info) => {
          return context.nodeModel.runQuery({
            query: {
              filter: {
                name: {
                  in: source.authors,
                },
              },
            },
            type: 'People',
          });
        },
      },
    },
  };

  createResolvers(resolvers);
};
