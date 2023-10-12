[![Netlify Status](https://api.netlify.com/api/v1/badges/841c1d47-823a-4768-b991-fe19aaa11393/deploy-status)](https://app.netlify.com/sites/frontside/deploys)

# Frontside Website

This is the Frontside website, built with Gatsby and vanilla-extract for styles.

The data is sourced from Simplecast and markdown files. It sources data into
`MarkdownRemark` and `SimplecastEpisode` nodes. The `gatsby-connect-authors`
plugin also uses `MarkdownRemark` nodes to create `People` and `BlogPost` nodes.
The `People` nodes tie a person to their blog posts and podcast episodes. The
`BlogPost` nodes normalize some of the data and link to the underlying post and
authors' nodes.

## Development

You must use `netlify dev` to run this website on development. `yarn start`
wouldn't work at this moment because the API key to `simplecast` is stored in
netlify's cloud.

If you make a change that adds a page, you will note a change in
`./sitemap.txt`. Please include this change in your PR. We assert against this
file to confirm that any page / slug changes were explicitly intentional.
