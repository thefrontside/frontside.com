[![Netlify Status](https://api.netlify.com/api/v1/badges/841c1d47-823a-4768-b991-fe19aaa11393/deploy-status)](https://app.netlify.com/sites/frontside/deploys)

# Frontside Website

This is the new Frontside website. It uses Gatsby for the blog, and pages generated from Webflow.


## Blog Development 

You can work on the blog with `yarn start`. Note, however, that you won't be able to see the static pages there. The data is sourced from Simplecast and markdown files. It creates `MarkdownRemark` and `SimplecastEpisode` nodes. The `gatsby-connect-authors` plugin also uses `MarkdownRemark` nodes to create `People` nodes. The `People` nodes tie a person to their blog posts and podcast episodes.

## Webflow pages changes

If you want to make a change on a webflow pages (`static/index.html`, `static/about.html`, `static/consulting.html`, `static/tools.html`, `static/contact.html`, `static/contact-thanks.html`), open an issue or get in touch with @jorgelainfiesta (in Frontside's discord, twitter).

## Importing webflow generated files into the repo

At the moment we have a provisional manual process to adjust the webflow generated pages to what we need to work alongside gatsby. 

1. Download ZIP of files from webflow
2. Find and replace for all links in navs of the generated files from `*.html` to `/*` (done manually at the moment).
3. Find and replace all `target="_blank"` and replace with `target="_blank" rel="nofollow"`
4. Find and replace with nothing (toxic tracking that webflow is pushing although I disabled it):

```
  <script async="" src="https://www.googletagmanager.com/gtag/js?id=UA-44597640-1"></script>
  <script type="text/javascript">window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'UA-44597640-1', {'anonymize_ip': false});</script>
```
5. Replace typekit's script loading for stylesheet.
```
<script src="https://use.typekit.net/gyc5wys.js" type="text/javascript"></script>
  <script type="text/javascript">try{Typekit.load();}catch(e){}</script>
```
for
```
<link rel="stylesheet" href="https://use.typekit.net/gyc5wys.css" />
```
6. Copy + paste all the contents of the modified zip into `./static` (manually too)
4. Use `yarn build` to get the complete website in `./public/`

_This process is not great, a better way is on the workings: #99_