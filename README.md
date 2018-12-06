# Frontside Website

This is the new Frontside website. It uses Gatsby and NetlifyCMS. Gatsby is a static generator 
and NetlifyCMS is a plugin for Gatsby that allows editing content via an admin interface.

To access the admin interface in production or on a demo site go to `/admin` url.

To start server for local development run `yarn start`.

## Development

This project uses lerna to install plugins. These plugins have their own dependencies - learna ensures that their dependencies are installed.

```
yarn bootstrap
yarn start
```

## Purgecss
This plugin uses [gatsby-plugin-purgecss](https://www.gatsbyjs.org/packages/gatsby-plugin-purgecss/) and [bulma](https://bulma.io/). The bulma builds are usually ~170K but reduced 90% by purgecss.
