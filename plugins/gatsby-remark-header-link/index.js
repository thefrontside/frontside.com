var visit = require("unist-util-visit-parents");
const toString = require("mdast-util-to-string");
var slugs = require("github-slugger")();

module.exports = ({ markdownAST }) => {
  visit(markdownAST, "heading", (node, _) => {
    let { depth } = node;
    if (depth == 1) return;

    let text = toString(node);
    let id = slugs.slug(text);

    node.type = "html";
    node.value = `
      <h${depth} id="${id}">
        <a
          href="#${id}"
          class="markdown-heading-link ${
            depth == 2  ? 'markdown-heading-link__higher-heading'
                        : 'markdown-heading-link__lower-heading'
          }"
        >
        ${text} 
        </a>
      </h${depth}>
    `;
  });

  return markdownAST;
};
