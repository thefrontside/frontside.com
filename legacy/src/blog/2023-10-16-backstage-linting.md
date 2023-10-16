---
templateKey: blog-post
title: >-
  Backstage: How to fix linting errors without slowing down development
date: 2023-10-16T05:00:00.000Z
author: Min Kim
description: >-
  In this guide Min will show you a unique approach to tackling a mountain of linting errors without disrupting delivery
tags: [ "backstage", "dx" ]
img: /img/2023-10-16-backstage-linting.png
---

> **TL;DR** This blog post outlines the steps in creating a patch for the lint command in Backstage, which organizes errors by package, rules, and overall counts. The author explains how to use the generated lint error data to monitor and manage lint issues efficiently, and emphasizes the importance of tracking progress in reducing lint errors.

I recently worked with a team that had the lint command in their Backstage project misconfigured. The result? They ended up amassing an overwhelming number of lint errors - literally hundreds upon hundreds. In fact, the report output by the lint command was so long it would max out the terminal.

Normally, you would run the lint command in CI for every commit of your pull requests. This practice ensures that any new lint errors introduced by the changes would prevent the pull request from being merged. However, we could not set up this configuration right away; doing so would have brought development to a screeching halt.

With so many lint errors, it was difficult to pinpoint a starting point. To gain a clearer overview of the types and quantity of lint errors we were dealing with, I made modifications to the Backstage lint command. The modified command produced reports within a structured file system and generated an errors' summary.

# Writing the Patch

The lint command of the `backstage-cli` package can be found [here](https://github.com/backstage/backstage/blob/5578c3de6354bf9ef65aaac50fe73b890b0ad0e5/packages/cli/src/commands/repo/lint.ts). We're going to write a patch for it to produce the summary file so let's start by installing [`patch-package`](https://www.npmjs.com/package/patch-package):

```
yarn add patch-package -W
```

And modify the root `package.json` of your Backstage project:

```diff
"scripts": {
+  "postinstall": "patch-package"
}
```

Then navigate to the correct lint command file in `./node_modules/@backstage/cli/dist/cjs/lint`. There will be three Javascript files for linting - one for the base lint command, another for the repo lint command, and a third for the versions lint command. The file we're going to modify is the one designated for the repo lint command.

Here is a high level view of the patch we're going to be writing:

```md
create `errors` directory
create `summary` file

for `errors` of each `package`
  - create directory for this specific package
  - output lint report of this package to a text file in its corresponding directory
  - output the total lint error count of this package and list the rules that are being violated

calculate grand total count of lint errors for the entire project
combine the total count of lint errors by rule for the entire project
```

And here's the actual patch. Typically we would use diff syntax to indicate which lines to be added, but in order to make the code easier to read, we will display the code snippet with Javascript syntax highlighting.

> The code snippet below is quite long so you can check out a working demo of a Backstage app with the lint patch [here](https://github.com/minkimcello/backstage-lint-demo). The actual patch can be found [here](https://github.com/minkimcello/backstage-lint-demo/blob/main/patches/%40backstage%2Bcli%2B0.22.12.patch), and you could also follow along its [commit history](https://github.com/minkimcello/backstage-lint-demo/commits/main) for a more step-by-step approach in creating the patch.

```js
var fs = require('fs');
// ...
async function command(opts) {
  // ...
  let failed = false;
  const errors_dir = path.join(process.cwd(), 'errors');
  if (fs.existsSync(errors_dir)) {
    fs.rmSync(errors_dir, { recursive: true, force: true });
  }

  let errors_summary = {
    total_count: 0,
    per_package: [],
  };
  let violations_combined = [];

  for (const { relativeDir, resultText } of resultsList) {
    const package_dir = path.join(errors_dir, relativeDir);
    fs.mkdirSync(package_dir, { recursive: true });

    const stripAnsi = new RegExp(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g);
    const resultTextFormatted = resultText.replace(stripAnsi, "").split("\n");

    fs.writeFileSync(`${package_dir}/results.txt`, `${relativeDir}\n${resultTextFormatted.join('\n')}\n`);

    const violations_count = parseInt(
      resultTextFormatted
        .find(line => line.match(/✘ [0-9]+ problem.*/))
        .replace(/\s*✘\s*/, "")
        .replace(/ problem.*/, "")
    , 10);

    const violations_index = resultTextFormatted.indexOf("Errors:") >= 0
      ? resultTextFormatted.indexOf("Errors:")
      : resultTextFormatted.indexOf("Warnings:");

    let package_violations = [];

    resultTextFormatted.slice(violations_index).forEach(line => {
      if (line.match(/http/)) {
        const error_details = {
          count: parseInt(line.match(/\d+/)[0], 10),
          rule: line.match(/http.*/)[0]
        }
        package_violations.push(error_details);
        violations_combined.push(error_details);
      }
    });

    errors_summary.per_package.push({
      package: relativeDir,
      violations_count,
      package_violations: package_violations.sort((a, b) => a.rule.localeCompare(b.rule)),
    });

    errors_summary.total_count = errors_summary.total_count + violations_count;
    // ...
  };

  if (failed) {
    const combined_violations_sorted = violations_combined
    .reduce((acc, item) => {
      const already_exists = acc.findIndex(acc_item => acc_item.rule === item.rule);
      if (already_exists > -1) {
        acc[already_exists].count = acc[already_exists].count + item.count
        return acc;
      } else {
        return [...acc, item];
      }
    }, []);

    fs.writeFileSync(errors_dir + "/summary.json", JSON.stringify({
      count: errors_summary.total_count,
      errors_combined: combined_violations_sorted.sort((a, b) => a.rule.localeCompare(b.rule)),
      per_package: errors_summary.per_package.sort((a, b) => a.package.localeCompare(b.rule)),
    }, null, 2));
  }
}
```
> Note:
> 
> 1. ESLint rules are categorized by `warning` and `error`, but we have found that the categorization is highly opinionated and do not necessarily align to its actual severity so for that reason we merged warnings with errors.
> 
> 2. ESLint offers a wide variety of options for [formatters](https://eslint.org/docs/latest/use/formatters/). I have reviewed each formatter but ultimately the `stylish` (default) formatter met all our needs. Although the sylish output required a bit of formatting, it is the only formatter that provides a relative path of the package location, count of errors per package, and provides source URLs to the violated rules.

# Viewing and Updating the Summary

With the patch code shown above, our new lint command will output a summary file that will look something like this:

```json
{
  count: 3,
  errors_combined: [
    {
      rule: "https://eslint.org/docs/latest/rules/foo",
      count: 2,
    },
    {
      rule: "https://eslint.org/docs/latest/rules/bar",
      count: 1,
    }
  ],
  per_package: [
    {
      package: "/packages/a",
      violations_count: 1,
      package_violations: [
        {
          rule: "https://eslint.org/docs/latest/rules/foo",
          count: 1,
        },
      ]
    },
    ...
  ]
}
```

From the generated summary file, we can extract the following information:

- Total count of lint errors of the entire project
- Total count of lint errors per rule of the entire project
- Total count of lint errors of each package
- Total count of lint errors per rule of each package

In addition to the summary file, the modified lint command will output each package results to an organized file structure:

```
errors/
  |-- summary.json
  |-- packages/
    |-- foo/
      |-- results.txt
    |-- bar/
      |-- results.txt
```

Ideally from here you would divide and conquer to resolve all of your project's rule violations. However, if your team lacks the capacity to address these errors right away, the best you could do is try to prevent the problem from growing.

The best way to keep track of your lint errors would be to keep the `errors` directory up to date in all of your pull requests. You could tell your developers to run the modified lint command, but having to rely on people remembering to do things is rarely a good idea, so you're left with two options: you could have your CI run the patched lint command and push the updated summaries to your pull requests - which would require your developers to pull their own branch after each commit they push - or you could use [`husky`](https://typicode.github.io/husky) to force your local dev environments to run lint for you.

Follow their [Getting Started](https://typicode.github.io/husky/getting-started.html) guide for installing Husky to your Backstage project and configure a pre-push hook to run lint:

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

yarn lint
if git status | grep "errors/"; then
  echo "You forgot to run 'yarn lint'. The lint command was ran for you just now, commit the generated errors directory and git push again"
  exit 1
fi
```

> Note: 
>
> 1. Instead of having husky run before a git push, you could configure it to run every time a developer creates a new commit. Depending on the size of your Backstage project, the lint command could take quite a while. In this guide we opted for the pre-push hook to provide a more pleasant developer experience.
>
> 2. Having the pre-push hook create the commit and subsequently push the updated set of commits in a single step, without requiring developers to initiate an additional git push, would be a convenient approach. But, unfortunatey, the pre-push hook's mechanism involves calculating the specific commits to push at the moment the hook is activated. As a result, it's incapable of generating a fresh commit and incorporating that newly created commit within the confines of the hook itself.

# Using the Data

Now that we have a better overview of our linting errors (and a way to keep it reliably up to date), we need to decide on a method of using that data.

The simplest approach to check if someone is introducing more lint errors would be to quickly check the git diff of their pull request for the total count in the summary file:

```diff
{
-  count: 3,
+  count: 5,
  errors_combined: [...],
  per_package: [...]
}
```

However, should a developer address a minor rule violation while simultaneously introducing a more severe error, the overall count of lint errors would remain unchanged. To avoid this scenario, you'd need to compare the cumulative count for each specific rule:

```diff
{
  count: 3,
  errors_combined: [
    {
      rule: "https://eslint.org/docs/latest/rules/foo",
-      count: 2,
+      count: 1,
    },
    {
      rule: "https://eslint.org/docs/latest/rules/bar",
-      count: 1,
+      count: 2,
    }
  ],
  per_package: [...],
}
```

And if you want to ensure that a particular rule isn't being resolved in one package while a new one is being introduced in another, you would have to take a look at the differences under the `per_package` property and review the git diff of the lint reports of each package.

Whether you choose to resolve your lint issues rule-by-rule or package-by-package, providing your developers with the capability to access the lint reports for each package in a file format offers significant convenience. This will enable them to search through the entire directy for particular rules and be able to view the details of the lint report without having to run the command.

# Conclusion

If your project has accumulated a long list of lint errors, it's crucial to strategize an approach for addressing them. Your team might be able to allocate resources to fix those linting errors right away or they may need to chip away at it incrementally. Regardless of the approach, it would be beneficial for your team to be able to track the progress of their efforts - it's also very satisfying to see the total count number within the summary file decrease in your pull requests.

Upon successfully reducing your lint errors count to zero, you can promptly remove the patch and reconfigure your CI system to mandate linting as an obligatory check for all pull requests.
