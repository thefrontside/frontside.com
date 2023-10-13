const { default: Plausible } = require("plausible-tracker");

require("./src/styles/prism-theme-frontside-dark.css");

exports.onRouteUpdate = ({ prevLocation }) => {
  const { trackPageview } = Plausible({
    domain: "frontside.com",
  });
  trackPageview({
    referrer: (!!document && !!document.referrer)
      ? document.referrer
      : !!prevLocation && prevLocation.href,
  });
};
