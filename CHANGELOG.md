# Changelog

All notable changes to this project will be documented in this file.

## [2.0.0] - 2024-10-26

### 🚀 Features

- [**breaking**] Add support for options of `gas-entry-generator` ([#293](https://github.com/mato533/rollup-plugin-gas/issues/293))

### 📚 Documentation

- Update readme to adjust new option structure ([#296](https://github.com/mato533/rollup-plugin-gas/issues/296))

### ⚙️ Miscellaneous Tasks

- Update configration for eslint v9 ([#291](https://github.com/mato533/rollup-plugin-gas/issues/291))
- Update eslint rule ([#292](https://github.com/mato533/rollup-plugin-gas/issues/292))
- Migrate from `conventional-changelog` to `git-cliff` ([#294](https://github.com/mato533/rollup-plugin-gas/issues/294))
- Update yaml configrations for ci/cd ([#295](https://github.com/mato533/rollup-plugin-gas/issues/295))

## [1.1.14] - 2024-09-14

### 🐛 Bug Fixes

- _(deps)_ Update all non-major dependencies
- _(deps)_ Update all non-major dependencies

### ⚙️ Miscellaneous Tasks

- V1.1.14

## [1.1.13] - 2024-03-26

### ⚙️ Miscellaneous Tasks

- Support for vitest v1
- V1.1.13

## [1.1.12] - 2023-10-16

### 📚 Documentation

- Fix wrong badge content
- Remove wrong badge

### ⚙️ Miscellaneous Tasks

- Add packageManager to package.json
- Remove packageManager
- Switch to renovate from dependabot
- Remove original renovate.json
- Update renovate.json
- Fix renovate.json
- Fix renovate.json schedule
- Add tslib
- Migrate packagemanager to pnpm
- Update configration about pnpm
- Update rollup
- Exclude peerDependencies updates

## [1.1.11] - 2023-08-07

### 🐛 Bug Fixes

- Remove postinstall script

### 🎨 Styling

- Sort imports

### ⚙️ Miscellaneous Tasks

- V1.1.11
- Release:v1.1.11

## [1.1.10] - 2023-07-26

### 🐛 Bug Fixes

- Fix wrong version for rollup of peerDependencies

### 🧪 Testing

- Add test case about missing manifest file

### ⚙️ Miscellaneous Tasks

- Update ci settings
- Update workflow dependencies
- Update workflow setting for dependabot
- Release v1.1.10

## [1.1.9] - 2023-07-17

### 🧪 Testing

- Refact the test file

### ⚙️ Miscellaneous Tasks

- Remove unused import
- Update workflow and remove unused files
- Update workflow name
- Add workflow for dependabot
- Update the error message
- Release v1.1.9
- Release v1.1.9

## [1.1.8] - 2023-07-13

### 🚀 Features

- Support Rollup logging Functions

### 🐛 Bug Fixes

- Update plugin name as the name of NPM Package

### 🎨 Styling

- Format yamls for Github Actions
- Format yamls for Github Actions
- Format yamls for Github Actions

### ⚙️ Miscellaneous Tasks

- Adjust to change default branch name
- Add rollup-plugin-delete
- Add watch mode of rollup to scripts
- Add @rollup/plugin-json
- Update keywords for NPM package
- Add pre-commit lint and format
- Add test at windows and remove the lint test
- Rlease v1.1.8

## [1.1.7] - 2023-07-03

### 🚜 Refactor

- Update the test logic to use snapshot

### 📚 Documentation

- Update the chenge log
- Update README.md

### ⚙️ Miscellaneous Tasks

- Update the dependency of jobs
- Update Start conditon for the CI
- Restrict target repositories
- Update start condition for CI
- Update step names
- Release for v1.1.7

## [1.1.6] - 2023-06-25

### ⚙️ Miscellaneous Tasks

- Updatea the package for coverage(c8 -> v8)
- Update condition for starting Release tasks
- Chore: Release for v1.1.6

## [1.1.5] - 2023-06-22

### 🚀 Features

- Support for the NPM provenance

### ⚙️ Miscellaneous Tasks

- Update the condition for starting CD
- Remove unnecessary configrations for git-cz
- Release for v1.1.5

## [1.1.4] - 2023-06-22

### 🚀 Features

- Support for the verbose option

### 📚 Documentation

- Add description for verbose option

### 🧪 Testing

- Add test for the verbose option

### ⚙️ Miscellaneous Tasks

- Update CI settings
- Add process to delete dist folder as prebuild
- Change silent option as true of vitest configuration
- Release for v1.1.4

## [1.1.3] - 2023-06-21

### 🐛 Bug Fixes

- Remove unnecessary lines for README.md

### ⚙️ Miscellaneous Tasks

- Create dependabot.yml
- Update workflows of the Github Actions
- Update dependencies recommended by dependabot
- Release for v1.1.3

## [1.1.2] - 2023-06-19

### 🐛 Bug Fixes

- Fix for type of readme

### ⚙️ Miscellaneous Tasks

- Change the condition for starting CI/CD
- Release for v1.1.2

## [1.1.1] - 2023-06-19

### 📚 Documentation

- Update github action badge

### ⚙️ Miscellaneous Tasks

- Update the configration for CI
- Release for v1.1.1

## [1.1.0] - 2023-06-19

### 🚀 Features

- Support for switching to print the file name to bandle
- Support to copy the manifest file to dist directory

### 🚜 Refactor

- Change common processing of test to function
- Fix typo for the title of unittest
- Fix typo for the title of unittest

### 📚 Documentation

- Update about section for README.md
- Fix an error in the description of the option
- Add description about copying manifest file to README

### 🧪 Testing

- Response to change not to output file name
- Add test for option of "moduleHeaderComment"
- Add the test for logic to copy the manifest file

### ⚙️ Miscellaneous Tasks

- Change the target branch of the test-only WF to develop
- Add a Github action to auto-approve pull requests
- Add and Update CI/CD configrations ([#3](https://github.com/mato533/rollup-plugin-gas/issues/3))
- Install the converntional-changelog-cli
- Add script to generate the CHANGELOG.md
- Add the CHANGELOE.md
- Remove unused devDependencies(fs)
- Update and add scripts for chanelog and coverage:ui
- Change the d.ts file to the one in dist directory
- Add the Github Action and remove CircleCI configs
- Release for v1.1.0

## [1.0.4] - 2023-06-08

### 📚 Documentation

- Add NPM badge to README.md
- Fix typo at the package name

### ⚙️ Miscellaneous Tasks

- Add authir to the package.json

## [1.0.1] - 2023-06-08

### 📚 Documentation

- Add badge for circleci

### ⚙️ Miscellaneous Tasks

- Install CercleCI
- Install CodeCov
- Update Readme and circleci configration
- Add CI/CD settings
- Add test for TS and fix test at scripts
- Change package name
- Remove unused workflow from CI

## [1.0.0] - 2023-06-07

### 🚀 Features

- Add the main logic of this project
- Change to be able to execute treeshake
- Add option for include
- Add a feature to write the source name in the bundle

### 🐛 Bug Fixes

- Update the logic for formatting of entry point functions
- Remove optional items that are not implemented
- Remove logic to insert dev comments into bundle files
- Delete unnecessary output in rollup.config.ts
- Add node's built-in module to external for rollup.config
- Fixies of import along with modification of package.json

### 🚜 Refactor

- Add test that only one bundle file is created
- Commonize test logic for generating Fixture paths
- Change dir name for test to "tests" from "test"
- Add configration for ignore files
- Change directory name for types and rename variable
- Change name of interface for plugin option

### 📚 Documentation

- Merge the README.md from 'origin/main'
- Remove Treeshake related description from README.md
- Add about and Usege of Node
- Update README.md

### 🧪 Testing

- Add basic tests for bundling
- Add test for comment option
- Add test for include option
- Added a test for the display filename of imported

### ⚙️ Miscellaneous Tasks

- Create initial package.json
- Install required packages
- Create tsconfig.json
- Setup vitest
- Install eslint and prettier
- Configration for eslint and prettier
- Added setting to exclude linting for bundle result
- Exclude test/fixtures/\* from linting and formatting
- Add coverage-c8 and script at package.json
- Add rollup-pluginutils to dependencies
- Add .vscode to .gitignore
- Change package.json
- Migrate Package Manager from NPM to Yarn
- Install @rollup/plugin-typescript
- Remove unused option for tsconfig.json
- Add peerDependencies at package.json
- Add build-related settings
- Add configration for git-cz
- Add build configration using Rollup
- Write ambient declaration in a separate file
- Add types directory to include in tsconfig.json
- Change path for types directory in package.json
- Install rollup-plugin-node-builtins
- Remove ignore path to samples
- Remove plugin setting for rollup-plugin-node-builtins
- Remove rollup-plugin-node-builtins
- Remove type from package.json
- Downgrade typescript 5.0.5
- Add configration for linter and formatter
- Initialize version number
