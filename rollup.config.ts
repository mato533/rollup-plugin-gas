import typescript from "@rollup/plugin-typescript";
import { readFileSync } from "fs";
import { Plugin, WarningHandlerWithDefault } from "rollup";

const onwarn: WarningHandlerWithDefault = (warning) => {
  // eslint-disable-next-line no-console
  console.error(
    "Building Rollup produced warnings that need to be resolved. " +
      "Please keep in mind that the browser build may never have external dependencies!"
  );
  // eslint-disable-next-line unicorn/error-message
  throw Object.assign(new Error(), warning);
};

const emitModulePackageFile = (): Plugin => {
  return {
    name: "emit-module-package-file",
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "package.json",
        source: `{"type":"module"}`,
      });
    },
  };
};
const defineConfig = (pkg: Record<string, any>) => {
  console.log(Object.keys(pkg.dependencies || {}));
  return {
    input: "src/index.ts",
    external: Object.keys(pkg.dependencies || {}).concat(
      Object.keys(pkg.peerDependencies || {})
    ),
    onwarn,
    strictDeprecations: true,
    output: [
      {
        format: "cjs",
        file: pkg.main,
        exports: "named",
        footer: "module.exports = Object.assign(exports.default, exports);",
        sourcemap: true,
      },
      {
        format: "es",
        file: pkg.module,
        plugins: [emitModulePackageFile()],
        sourcemap: true,
      },
    ],
    plugins: [typescript({ sourceMap: true })],
  };
};

export default defineConfig(
  JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"))
);