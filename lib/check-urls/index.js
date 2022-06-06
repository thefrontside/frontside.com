const crypto = require('crypto');
const fs = require('fs/promises');
const path = require('path');
const assert = require('assert');

const checksum = (str) =>
  crypto.createHash('md5').update(str, 'utf8').digest('hex');

const isCI = !!process.env.CI;

console.log('checking hashes');
const checkURLs = async () => {
  console.log('hashing sitemap.txt');
  const file = await fs.readFile(path.join(__dirname, '../../sitemap.txt'));
  const hash = checksum(file.toString());
  const originalHash = process.argv[2];

  if (originalHash) {
    try {
      await assert.strictEqual(
        process.argv[2],
        hash,
        `hash did not match, the urls have changed`
      );
      console.log("hash verfied, pages haven't changed");
    } catch (error) {
      if (isCI)
        console.log(
          '::error file=sitemap.txt::The URLs have changed. Try running `yarn build` locally and commiting the sitemap.txt change.'
        );
      throw new Error(
        `Previous hash of sitemap.txt does not match the updated hash.`
      );
    }
  } else {
    if (isCI) console.log(`::set-output name=url-hash::${hash}`);
    console.log('hash value saved');
  }
};

checkURLs().catch((e) => {
  console.error(e);
  return process.exit(1);
});
