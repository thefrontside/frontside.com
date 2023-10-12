const { GraphQLString } = require("gatsby/graphql");
const Remark = require("remark");
const toHAST = require("mdast-util-to-hast");
const hastToHTML = require("hast-util-to-html");

const pkg = require("./package.json");
const { EPISODE_TYPE } = require("./constants");

const astCacheKey = (node, property) =>
  `-${pkg.name}-ast-${node.internal.contentDigest}-${property}`;
const htmlCacheKey = (node, property) =>
  `-${pkg.name}-html-${node.internal.contentDigest}-${property}`;
const htmlAstCacheKey = (node, property) =>
  `-${pkg.name}-html-ast-${node.internal.contentDigest}-${property}`;

exports.setFieldsOnGraphQLNodeType = ({ type, cache }) => {
  if (type.name !== EPISODE_TYPE) {
    return {};
  }

  return new Promise(function (resolve) {
    let remark = new Remark().data("settings", {
      commonmark: true,
      footnotes: true,
      pedantic: true,
    });

    async function getAST(node, property) {
      const cachedAST = await cache.get(astCacheKey(node, property));
      if (cachedAST) {
        return cachedAST;
      } else {
        const markdownAST = remark.parse(node[property]);

        cache.set(astCacheKey(node, property), markdownAST);
        return markdownAST;
      }
    }

    async function getHTMLAst(node, property) {
      const cachedAst = await cache.get(htmlAstCacheKey(node, property));
      if (cachedAst) {
        return cachedAst;
      } else {
        const ast = await getAST(node, property);
        const htmlAst = toHAST(ast, { allowDangerousHtml: true });

        // Save new HTML AST to cache and return
        cache.set(htmlAstCacheKey(node, property), htmlAst);
        return htmlAst;
      }
    }

    async function getHTML(node, property = "longDescription") {
      const cachedHTML = await cache.get(htmlCacheKey(node, property));
      if (cachedHTML) {
        return cachedHTML;
      } else {
        const ast = await getHTMLAst(node, property);
        // Save new HTML to cache and return
        const html = hastToHTML(ast, {
          allowDangerousHtml: true,
        });

        // Save new HTML to cache and return
        cache.set(htmlCacheKey(node, property), html);
        return html;
      }
    }

    resolve({
      longDescriptionHtml: {
        type: GraphQLString,
        async resolve(node) {
          return getHTML(node);
        },
      },
      descriptionHtml: {
        type: GraphQLString,
        async resolve(node) {
          return getHTML(node, "description");
        },
      },
    });
  });
};
