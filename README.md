# Frontside Website

This is the new Frontside website. It uses Gatsby and NetlifyCMS. Gatsby is a static generator
and NetlifyCMS is a plugin for Gatsby that allows editing content via an admin interface.

To access the admin interface in production or on a demo site go to `/admin` url.

To start server for local development run `yarn start`.

## Development
Set up a `.env` with the `SIMPLECAST_API` key defined.

This project uses lerna to install plugins. These plugins have their own dependencies - lerna ensures that their dependencies are installed.

```
yarn bootstrap
yarn start
```
