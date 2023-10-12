const request = require("request-promise-native");
const parser = require("fast-xml-parser");

module.exports = async function verify(current, target) {
  let log = [];

  let url = `${current}/sitemap.xml`;
  let response;
  try {
    response = await request.get(url);
    log.push(`Fetched sitemap from ${url}`);
  } catch (e) {
    log.push(`Could not get sitemap from ${current}`);
    log.push(e);
    throw log;
  }

  let sitemap;
  try {
    sitemap = parser.parse(response);
    log.push("Parsed sitemap xml document");
  } catch (e) {
    log.push("Could not parse the xml document.");
    log.push(response.body);
    log.push(e);
    throw log;
  }

  let { urlset: { url: pages } } = sitemap;
  log.push(`Found ${pages.length} pages in the sitemap`);

  let results = await Promise.all(pages.map(async function checkPage(page) {
    let { loc } = page;
    let targetURL = loc.replace(current, target);

    try {
      let target = await request.get(targetURL);
      return `👌 ${targetURL}`;
    } catch (e) {
      return new Error(`🚨 ${targetURL}`);
    }
  }));

  log = [...log, ...results];

  if (log.find((item) => item instanceof Error)) {
    throw log;
  }

  return log;
};
