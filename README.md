# rollup-plugin-google-apps-script

[![npm version](https://badge.fury.io/js/rollup-plugin-google-apps-script.svg)](https://badge.fury.io/js/rollup-plugin-google-apps-script)
[![CI](https://github.com/mato533/rollup-plugin-gas/actions/workflows/test.yaml/badge.svg)](https://github.com/mato533/rollup-plugin-gas/actions/workflows/test.yaml)
[![codecov](https://codecov.io/gh/mato533/rollup-plugin-gas/branch/main/graph/badge.svg?token=50Z04K2PVN)](https://codecov.io/gh/mato533/rollup-plugin-gas)
[![license](https://img.shields.io/npm/l/rollup.svg)](https://github.com/rollup/rollup/blob/master/LICENSE.md)

## About

Rollup plugin for Google Apps Script.
This plugin supports local development of applications that run on Google Apps Script.
Files bundled using this plugin can be deployed to Google Apps Script using [clasp](https://github.com/google/clasp).

Support build using [Vite](https://github.com/vitejs/vite) and [Rollup](https://rollupjs.org/).

This is inspired by [gas-webpack-plugin](https://github.com/fossamagna/gas-webpack-plugin).

### Detail

Google Apps Script requires the entry point to be a top-level function declaration in order to be called from `google.script.run` or some triggers. This plugin generates top-level function declaration statements when it encounters a `global` object in a function assignment expression.

### Sample of the source code

    ```js
    // main.js

    // The plugin will nothing to generate for this function.
    const sayHello = (target) => {
      console.log(`Hello ${target}!!`)
    }

    // The plugin will generate a top-level function declaration for this function.
    global.greet = () => {
      sayHello("world")
    }
    ```

## Installation

1. NPM

   ```sh
   npm install -D rollup-plugin-google-apps-script
   ```

1. Yarn
   ```sh
   yarn add -D rollup-plugin-google-apps-script
   ```

## Usage

### Options

You can pass a object of configuration options to rollup-plugin-gas. Allowed values are as follows
| Name | Type | Default | Description |
-------|------|---------|-------------|
| comment | `{boolean}` | `false` | If `true` then generate a top level function declaration statement with comment. |
| include | `{Array<string>}` | `[**/*]` | Array of path patterns to detect functions to generate top level function definitions. accept glob pattern. |
|moduleHeaderComment|`{boolean}`|`false` | If `true`, Print a comment of the module filename to the bandle file.|
|manifest.copy|`{boolean}`|`false` |if ture, copy the manifest file (`appsscript.json`) to output directory from `manifest.srcDir`.|
|manifest.srcDir|`{string}`|`process.cwd()`|Set relative path from the project root to the directory where the manifest file (`appsscript.json`) is located, if you create the file at other than project root.|
|||||

## Example

### Node

1. Create build script
    <details>

   ```ts
   // build.ts
   import path from "path";
   import { fileURLToPath } from "url";
   import { rollup } from "rollup";
   import rollupPluginGas from "rollup-plugin-google-apps-script";

   const __dirname = path.dirname(fileURLToPath(import.meta.url));
   const entryPath = path.resolve(__dirname, "./code.js");

   const distPath = path.resolve(__dirname, "./dist");

   const bundle = await rollup({
     input: entryPath,
     plugins: [rollupPluginGas()],
   });

   await bundle.write({
     dir: distPath,
     entryFileNames: "[name].js",
   });
   ```

    </details>

1. Run build script
   ```sh
   ts-node build.ts
   ```

### vite

1. Create configration file for vite
    <details>

   ```ts
   // vite.config.ts
   import { defineConfig } from "vite";
   import typescript from "@rollup/plugin-typescript";
   import rollupPluginGas from "rollup-plugin-google-apps-script";
   import path from "path";

   export default defineConfig({
     plugins: [typescript(), rollupPluginGas()],
     build: {
       rollupOptions: {
         input: "./src/main.ts",
         output: {
           dir: "./dist",
           entryFileNames: "[name].js",
         },
       },
       minify: false, // This option is requred.
     },
     resolve: {
       alias: {
         "@": path.resolve(__dirname, "./src"),
       },
     },
   });
   ```

    </details>

1. Add build script in package.json
    <details>

   ```
   // package.json
   {
     ...
     "scripts": {
       ...
       "build": "vite build",
       ...
     },
     ...
   }
   ```

    </details>

1. Run the build command

   ```sh
   npm run build
   ```

## Note

- Some rollup options are overridden in plugins.

  |    Option     | Value |
  | :-----------: | :---: |
  | output.format |  umd  |

- When use vite, following configration is required.

  |    Option    | Value | Remarks                                                                |
  | :----------: | :---: | ---------------------------------------------------------------------- |
  | build.minify | false | Disable minify because the function name defined in script is changed. |
