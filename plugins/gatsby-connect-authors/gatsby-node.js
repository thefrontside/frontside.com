const _slugify = require('slugify');
const { createFilePath } = require('gatsby-source-filesystem');

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
        slug: `/people/${slugify(node.frontmatter.name)}/`,
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
      let nodeId = createNodeId(`blog-${node.id}`);
      // add a `fields.authorNodes` that takes the string of authors and
      // links them to our `Person` nodes created above
      // we also add a mapping to the gatsby-config.js to let gatsby know the appropriate type
      // since we don't have real control of this node (in the future maybe we make a BlogPost node?)
      // node.frontmatter.author.split(',').map(author => author.trim())

      return createNode({
        title: node.frontmatter.title,
        slug: `/blog${createFilePath({ node, getNode })}`,
        post___NODE: node.id,
        authors: node.frontmatter.author
          .split(',')
          .map(author => author.trim()),
        // Required fields.
        id: nodeId,
        parent: node.id,
        children: [],
        internal: {
          type: `BlogPost`,
          contentDigest: createContentDigest(node),
          description: `A Blog Post."`, // optional
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
      posts: [BlogPost]
      episodes: [SimplecastEpisode]
    }
    type BlogPost implements Node {
      title: String
      slug: String
      authors: [String]
      authorNodes: [People]
      post: MarkdownRemark
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
