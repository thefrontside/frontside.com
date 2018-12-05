## gatsby-source-simplecast

This plugin for Gastby makes it easy to pull episodes from Simplecast into your site.

### Installation

1. `npm install gatsby-source-simplecast`
2. Add the following configuration to your `gatsby-config.js`

```js
  plugins: [
    {
      resolve: "gatsby-source-simplecast",
      options: {
        apikey: process.env.SIMPLECAST_API, // pass this via environment variables and 
        podcastId: // your podcast's id goes in here
      },
    },
  ]
```
