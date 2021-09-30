const { default: Plausible } = require("plausible-tracker")

exports.onRouteUpdate = ({ prevLocation }) => {
  const { trackPageview } = Plausible({
    domain: 'frontside.com',
  });
  trackPageview({
    referrer: (!!document && !!document.referrer) ? document.referrer : !!prevLocation && prevLocation.href
  });
}
