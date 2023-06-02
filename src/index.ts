import { type Plugin } from "rollup";
import { generate } from "gas-entry-generator";

const defaultOptions = {
  comment: false,
  autoGlobalExports: false,
  exportsIdentifierName: "exports",
  globalIdentifierName: "global",
};

const rollupPluginGas = (options?: PluginOption): Plugin => {
  const configratedOptions = Object.assign({}, defaultOptions, options);
  const entryPointFunctions: Array<string> = [];
  return {
    name: "rollup-plugin-gas",
    options(options) {
      options.treeshake = false;
      return options;
    },
    outputOptions(options) {
      options.format = "umd"; // cjs
      return options;
    },
    transform(code) {
      const gasCode = generate(code, configratedOptions);
      if (gasCode.entryPointFunctions) {
        const codes = String(gasCode.entryPointFunctions).replace(
          /{\n}/g,
          "{};"
        );
        codes.split("\n").forEach((code) => {
          if (code) {
            entryPointFunctions.push(`${code}`);
          }
        });
      }
    },
    banner() {
      return ["var global = this;", ...entryPointFunctions].join("\n");
    },
  };
};

export default rollupPluginGas;
