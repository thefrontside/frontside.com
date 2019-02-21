#!/usr/bin/env node
const verify = require("./src/verify");

const { source, target, verbose } = require("yargs")
  .usage(
    "$0 <source> <target>",
    "verify sitemaps by reading sitemap from the source and checking each page on the target.",
    yargs => {
      yargs.positional("source", {
        describe: "url of the current site",
        type: "string",
        require: true
      });
      yargs.positional("target", {
        describe: "url of the target site",
        type: "string",
        require: true
      });
    }
  )
  .help("help").argv;

verify(source, target)
  .then(log => {
    if (verbose) {
      log.forEach(entry => console.info(entry));
    } else {
      console.info(`Successfully verified ${log.length} pages.`);
    }
  })
  .catch(log => {
    let successes = log.filter(entry => !(entry instanceof Error));
    let errors = log.filter(entry => entry instanceof Error);
    console.info(`${errors.length} errors`);

    if (verbose) {
      successes.forEach(entry => console.info(entry));
    }

    errors.forEach(error => console.error(error.message));
    
    process.exit(1);
  });
