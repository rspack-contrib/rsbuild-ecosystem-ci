# rsbuild-ecosystem-ci

This repository is used to run integration tests for Rsbuild ecosystem projects

## via github workflow

### scheduled

Workflows are sheduled to run automatically every day

### manually

- open [workflow](../../actions/workflows/ecosystem-ci-selected.yml)
- click 'Run workflow' button on top right of the list
- select suite to run in dropdown
- start workflow

## via shell script

- clone this repo
- run `pnpm i`
- run `pnpm test` to run all suites
- or `pnpm test <suitename>` to select a suite
- or `tsx ecosystem-ci.ts`

You can pass `--tag v2.8.0-beta.1`, `--branch somebranch` or `--commit abcd1234` option to select a specific rsbuild version to build.
If you pass `--release 2.7.13`, rsbuild build will be skipped and rsbuild is fetched from the registry instead

The repositories are checked out into `workspace` subdirectory as shallow clones

### cheat sheet

- `pnpm test -- --release nightly <suitename>`: use nightly release to test rsbuild locally, using release can save time from building rsbuild locally
- `pnpm test -- --branch main --suite-branch update-rsbuild <suitename>`: use update-rsbuild branch of suite to test main branch rsbuild

# how to add a new integration test

- check out the existing [tests](./tests) and add one yourself. Thanks to some utilities it is really easy
- once you are confidente the suite works, add it to the lists of suites in the [workflows](../../actions/)

> the current utilities focus on pnpm based projects. Consider switching to pnpm or contribute utilities for other pms

# reporting results

### on your own server

- Go to `Server settings > Integrations > Webhooks` and click `New Webhook`
- Give it a name, icon and a channel to post to
- copy the webhook url
- get in touch with admins of this repo so they can add the webhook

## Credits

Thanks to:

- [vitejs/vite-ecosystem-ci](https://github.com/vitejs/vite-ecosystem-ci)
- [vuejs/ecosystem-ci](https://github.com/vuejs/ecosystem-ci)

which inspired the development of this project.
