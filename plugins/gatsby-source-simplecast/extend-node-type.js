const { GraphQLString } = require("graphql");
const Remark = require("remark");
const toHAST = require("mdast-util-to-hast");
const hastToHTML = require("hast-util-to-html");

const pkg = require("./package.json");
const { EPISODE_TYPE } = require("./constants");

const astCacheKey = node => `-${pkg.name}-ast-${node.internal.contentDigest}`;
const htmlCacheKey = node => `-${pkg.name}-html-${node.internal.contentDigest}`;
const htmlAstCacheKey = node =>
  `-${pkg.name}-html-ast-${node.internal.contentDigest}`;

exports.setFieldsOnGraphQLNodeType = ({ type, cache }) => {
  if (type.name !== EPISODE_TYPE) {
    return {};
  }

  return new Promise(function(resolve) {
    let remark = new Remark().data("settings", {
      commonmark: true,
      footnotes: true,
      pedantic: true
    });

    async function getAST(node) {
      const cachedAST = await cache.get(astCacheKey(node));
      if (cachedAST) {
        return cachedAST;
      } else {
        const markdownAST = remark.parse(node.longDescription);

        cache.set(astCacheKey(node), markdownAST);
        return markdownAST;
      }
    }

    async function getHTMLAst(node) {
      const cachedAst = await cache.get(htmlAstCacheKey(node));
      if (cachedAst) {
        return cachedAst;
      } else {
        const ast = await getAST(node);
        const htmlAst = toHAST(ast, { allowDangerousHTML: true });

        // Save new HTML AST to cache and return
        cache.set(htmlAstCacheKey(node), htmlAst);
        return htmlAst;
      }
    }

    async function getHTML(node) {
      const cachedHTML = await cache.get(htmlCacheKey(node));
      if (cachedHTML) {
        return cachedHTML;
      } else {
        const ast = await getHTMLAst(node);
        // Save new HTML to cache and return
        const html = hastToHTML(ast, {
          allowDangerousHTML: true
        });

        // Save new HTML to cache and return
        cache.set(htmlCacheKey(node), html);
        return html;
      }
    }

    resolve({
      longDescriptionHtml: {
        type: GraphQLString,
        resolve(node) {
          return getHTML(node);
        }
      }
    });
  });
};
