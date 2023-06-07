# rollup-plugin-gas

## About

Rollup plugin for Google Apps Script.

This is inspired by [gas-webpack-plugin](https://github.com/fossamagna/gas-webpack-plugin).

Support build using [Vite](https://github.com/vitejs/vite).

## Installation

1. NPM

   ```sh
   npm install -D rollup-plugin-gas
   ```

1. Yarn
   ```sh
   yarn add -D rollup-plugin-gas
   ```

## Usage

### Options

You can pass a object of configuration options to rollup-plugin-gas. Allowed values are as follows
| Name | Type | Default | Description |
-------|------|---------|-------------|
| comment | `{Boolean}` | `true` | If true then generate a top level function declaration statement with comment. |
| include | `{Array<String>}` | `[**/*]` | Array of path patterns to detect functions to generate top level function definitions. accept glob pattern. |

## Example

### Node

1. Create build script
    <details>

   ```ts
   // build.ts
   import path from "path";
   import { fileURLToPath } from "url";
   import { rollup } from "rollup";
   import rollupPluginGas from "rollup-plugin-gas";

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
   import rollupPluginGas from "rollup-plugin-gas";
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
