const crypto = require('crypto');
const fs = require('fs/promises');
const path = require('path');
const assert = require('assert');

const checksum = str =>
  crypto
    .createHash('md5')
    .update(str, 'utf8')
    .digest('hex');

console.log('checking hashes');
const checkURLs = async () => {
  console.log('hashing sitemap.txt');
  const file = await fs.readFile(path.join(__dirname, '../../sitemap.txt'));
  const hash = checksum(file.toString());
  const originalHash = process.argv[2];

  if (originalHash) {
    await assert.strictEqual(
      process.argv[2],
      hash,
      `hash did not match, the urls have changed\ngot: \n ${file.toString()}`
    );
    console.log("hash verfied, pages haven't changed");
  } else {
    console.log(`::set-output name=url-hash::${hash}`);
    console.log('hash value saved');
  }
};

checkURLs().catch(e => {
  console.error(e);
  return process.exit(1);
});
