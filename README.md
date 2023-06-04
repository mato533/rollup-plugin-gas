# rollup-plugin-gas

## About

rollup plugin for Google Apps Script.

This is inspired by [gas-webpack-plugin](https://github.com/fossamagna/gas-webpack-plugin).

Support build using [vite](https://github.com/vitejs/vite).

## Example

## Installation

## Usage

### Node

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

and

```sh
ts-node build.ts
```

### vite

## Note

- Some rollup options are overridden in plugins.

| option        | value |
| ------------- | ----- |
| output.format | umd   |
