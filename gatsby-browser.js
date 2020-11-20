const React = require("react")

exports.onInitialClientRender = () => {
    const jQScript = document.createElement('script');
    jQScript.src = "https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=5f7f19d60c33ef0c409a8bf8";
    jQScript.integrity = "sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=";
    jQScript.type = "text/javascript";
    jQScript.crossOrigin = "anonymous";
    document.body.appendChild(jQScript);

    const wfScript = document.createElement('script');
    wfScript.src = "/js/webflow.js";
    wfScript.type = "text/javascript";
    document.body.appendChild(wfScript);
}
