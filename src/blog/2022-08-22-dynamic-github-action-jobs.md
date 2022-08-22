---
templateKey: blog-post
title: >-
  Dynamic Github Action Jobs
date: 2022-08-22T05:00:00.000Z
author: Jacob Bolda
description: >-
  Ever wanted to run parallel jobs in Github Actions with a high level of flexibility? We have, and now you can too!
tags:
  - github-actions
  - continuous-delivery
---

# Dynamic Github Action Jobs

Github Actions is a CI/CD platform integrated directly with your github.com repository. It is a popular choice to build and test your code within a pull request or on a commit to a branch. It also has many other options for triggering a workflow.

The workflows are written in YAML. The event(s) that triggers the workflow are specified with the `on` parameter. Each workflow file has one or many `jobs` with a named parameter, in this example `run-linters`. Each job has a list of `steps` which is the actions or commands that are run. This job has three steps which install the dependencies and run the lint script.

```yml
name: Lint

on: push

jobs:
  run-linters:
    name: Lint
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - uses: volta-cli/action@v1

      - name: Install Node.js dependencies
        run: npm ci

      - name: Run linters
        run: npm run lint
```

Within a GitHub action workflow, steps can pass data to the following steps. A step can set output, and the following steps can use that it as a variable. In the example below, the named step, `Get Version`, sets an output value. The `::` syntax is picked up by the Github Action runner when output to stdout, ie. the terminal. More information about this syntax can be found at the [workflow commands](https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions) Github docs. The `id` is also set in this step as `vars`. This is important as this is the variable the following steps use to retrieve the value. The step named `Build` immediately following sets an env using `steps.vars` to refer to the `Get Version` step.

```yml
name: Release to NPM
on: [push]

jobs:
  release:
    runs-on: ubuntu-latest

    steps:
      - name: checkout
        uses: actions/checkout@v3
      - name: setup deno
        # uses: denoland/setup-deno@v1
        uses: denoland/setup-deno@004814556e37c54a2f6e31384c9e18e983317366
        with:
          deno-version: v1.x
      - name: Get Version
        id: vars
        run: echo ::set-output name=version::$(echo ${{github.ref_name}} | sed 's/^v//')
      - name: Build
        run: deno task build:npm $NPM_VERSION
        env:
          NPM_VERSION: ${{steps.vars.outputs.version}}
      - name: Publish
        run: npm publish --access=public
        working-directory: ./build/npm
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```

This concept also applies to jobs. A step can set an output, and the job can take that step output and set it as a job output. This allows you to do actions dependent on previous job output. "How might this be useful though?", you ask.

One way to level up your jobs is a parameter called `strategy`. It allows you to pass an argument, `matrix`, to run multiple jobs in parallel. This takes an array or multiple arrays of arguments which will then be combined into a number of jobs. In the example below, we specify a `matrix` with two sets of values. The `platform` is referenced in the `runs-on` and `node-version` is used by the `volta-cli/action`. This specific array will produce a job set of consisting of six jobs run in parallel, e.g. `ubuntu-latest` + `nodejs@16`.

```yml
name: Test
on: [pull_request]

jobs:
  test:
    runs-on: ${{ matrix.platform }}
    name: ${{ matrix.platform }} test node@${{ matrix.node-version }}
    strategy:
      fail-fast: false
      matrix:
        platform: [ubuntu-latest, windows-latest]
        node-version: ['14', '16', '18']
    steps:
      - uses: actions-rs/toolchain@v1
        with:
          toolchain: 1.63
      - uses: actions/checkout@v2
      - run: yarn install
      - run: yarn build
      # specifically running this after build
      # using the n-api, the default node on github actions
      # should build a .node that works in any of the node
      # versions that we have specified in the matrix
      - uses: volta-cli/action@v1
        with:
          node-version: ${{ matrix.node-version }}
          yarn-version: 1.22.19
      - run: yarn test
```

As an example in a monorepo, you may have ten different packages. You can give it an array which includes a list of each of the packages and an array of nodejs versions. The jobs that would be then created based on these two matrix inputs and would produce 20 jobs, 10 services by the two nodejs versions. It enables parallel processing and may increase the speed of your CI runs. This can also increase the transparency as you see the separate jobs in the status section of a pull request.

![A screenshot of the status list from a pull request on Github showing these separate jobs.](/img/2022-08-22-dynamic-github-action-jobs-status-check.png)

The downside of the static array of values is having multiple sources of truth. This is when a few built-in functions within GitHub Actions can become immensely useful. Using input passed between jobs and a function to convert that input into a matrix value. The matrix accepts an argument called `include` which allows you to specify additional jobs over and above the jobs derived from the matrix arrays. We can use this to our advantage; compute the array of jobs ourselves and pass it to this `include` argument. The [Github Actions documentation](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstrategymatrixinclude) use the following example with static values. One of the jobs would include the follow matrix values: `{fruit: apple, animal: cat, color: pink, shape: circle}`. The documentation also has examples for use cases working in tandem with other static matrix values.

```yml
strategy:
  matrix:
    fruit: [apple, pear]
    animal: [cat, dog]
    include:
      - color: green
      - color: pink
        animal: cat
      - fruit: apple
        shape: circle
      - fruit: banana
      - fruit: banana
        animal: cat
```

Through the [`toJSON` function](https://docs.github.com/en/actions/learn-github-actions/expressions#tojson), the `include` argument can receive a stringified object. We can pass values that will build up into the array of jobs. This allows us to programmatically, in a previous job, determine the matrix of jobs to run. This becomes particularly powerful in monorepos where you can use static analysis to determine which code paths have changed, and only test those. With the monorepo helper `Nx`, for example, we can run a function which describes the code that has been affected by a change in pull request, `nx affected`. Using this output, we can parse it into an object and pass it into our matrix.

The object can be created however it is most convenient, as long as it can be output to the terminal. For an example using nodejs, we would log out the output of a `JSON.stringify()`. The script shown below, when run, would create three jobs with a `matrix.package` value being passed into each. In the `generate-matrix` job, we create the matrix and output it from the step and then the job. The `test` job `needs` the `generate-matrix` which supplies the value in the `strategy.matrix` via `needs.generate-matrix.output.matrix`.

```js
const matrixList = ['package-a', 'package-b', 'package-c'].map((pkg) => ({
  package: pkg,
}));

const includeStatement = { include: matrixList };
console.log(`::set-output name=matrix::${includeStatement}`);
```

```yml
jobs:
  generate-matrix:
    name: Generate Job Matrix
    runs-on: ubuntu-latest
    outputs:
      matrix: ${{ steps.set-matrix.outputs.matrix }}
    steps:
      - uses: actions/checkout@v3
      - run: yarn
      - run: node ./matrix-script.js
        id: set-matrix

  test:
    name: Check ${{ matrix.nickname }}
    runs-on: ubuntu-latest
    if: needs.generate-matrix.outputs.matrix != ''
    needs: [generate-matrix]
    strategy:
      fail-fast: false
      max-parallel: 6
      matrix: ${{fromJSON(needs.generate-matrix.outputs.matrix)}}

    steps:
      - uses: actions/checkout@v3
      - run: yarn
      - run: yarn workspace ${{ matrix.package }} test
```

As we mentioned previously, `Nx` has a command called `nx affected`. We can wire this into our script similar to the following. This would return a list of `affected` packages. Note this is a generator function expected to run within an [`effection` context](https://frontside.com/effection), so you may not be able to copy and paste this directly. This would give you a dynamic array that can be used in the script rather than directly hardcoding the array as `['package-a', 'package-b', 'package-c']`.

```js
export function* affectedList() {
  const nxBase = process.env.NX_BASE ?? 'main';
  const nxHead = process.env.NX_HEAD ?? 'HEAD';

  // if you want to check it locally with uncommitted changes
  // const command = `nx affected:libs --plain --uncommitted`;
  const command = `nx affected:libs --plain --base=${nxBase} --head=${nxHead}`;
  const { stdout, stderr, code } = yield exec(command, {
    cwd: '..',
    env: process.env,
    shell: true,
  }).join();

  console.error(stderr);
  if (code !== 0) throw new Error(`exited with code ${code}`);
  const affected = stdout
    .split(' ')
    .map((x) => x.trim())
    .filter((x) => x.length > 0)
    .join(',');

  return affected;
}
```

With the additional context required to fuel `nx affected`, the following workflow would create the extra context via `nwql/nx-set-shas`, derive the `nx affected`, pipe the generated matrix into `test` job, create a job for each affected package and run the test for the package. The nx command `yarn nx run ${{ matrix.package}}:test` will have the `${{ matrix.package }}` populate with the value passed into each job. The command run for the job with `{ package: 'package-a' }` would be `yarn nx run package-a:test`.

```yml
jobs:
  generate-matrix:
    name: Generate Job Matrix
    runs-on: ubuntu-latest
    outputs:
      matrix: ${{ steps.set-matrix.outputs.matrix }}
      nxBase: ${{ steps.nx-sha.outputs.base }}
      nxHead: ${{ steps.nx-sha.outputs.head }}
    steps:
      - uses: actions/checkout@v3
        with:
          # We need to fetch all branches and commits so that Nx affected has a base to compare against.
          fetch-depth: 0
      - name: Derive appropriate SHAs for base and head for `nx affected` commands
        id: nx-sha
        uses: nrwl/nx-set-shas@v2
      - run: yarn
      - run: node ./matrix-script.js
        id: set-matrix

  test:
    name: Check ${{ matrix.nickname }}
    runs-on: ubuntu-latest
    if: needs.generate-matrix.outputs.matrix != ''
    needs: [generate-matrix]
    strategy:
      fail-fast: false
      max-parallel: 6
      matrix: ${{fromJSON(needs.generate-matrix.outputs.matrix)}}

    steps:
      - uses: actions/checkout@v2
      - uses: volta-cli/action@v1
      - run: yarn
      - run: yarn nx run ${{ matrix.package }}:test
```

Creating this CI script and creating our own array of jobs enables tight control of what and when CI runs. This can save on time and build minutes, as well as increase transparency through the parallel CI runs.

**_Want to learn more? We have a great community in [Discord](https://discord.gg/9xfdDYthpF); come and say hello! We like to help and discuss all kinds of tech and code topics._**
