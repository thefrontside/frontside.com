const React = require('react');

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link rel="stylesheet" href="https://use.typekit.net/gyc5wys.css" />,
    <script
      async=""
      defer=""
      data-domain="frontside.com"
      src="https://plausible.io/js/plausible.js"
    ></script>,
  ]);
};
