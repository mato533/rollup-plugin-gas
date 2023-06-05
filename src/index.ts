import { type Plugin } from "rollup";
import { createFilter } from "rollup-pluginutils";
import { generate } from "gas-entry-generator";

const defaultOptions = {
  comment: false,
  include: ["**/*"],
};

const rollupPluginGas = (options?: PluginOption): Plugin => {
  const configratedOptions = Object.assign({}, defaultOptions, options);
  const entryPointFunctions: Array<string> = [];
  const filter = createFilter(configratedOptions.include);
  return {
    name: "rollup-plugin-gas",
    outputOptions(options) {
      options.format = "umd"; // cjs
      return options;
    },
    transform(code, id) {
      if (!filter(id)) {
        return;
      }
      const gasCode = generate(code, { comment: configratedOptions.comment });
      if (gasCode.entryPointFunctions) {
        const codes = String(gasCode.entryPointFunctions).replace(
          /{\n}/g,
          "{};"
        );
        codes.split("\n").forEach((code) => {
          code && entryPointFunctions.push(`${code}`);
        });
      }
    },
    banner() {
      return ["var global = this;", ...entryPointFunctions].join("\n");
    },
  };
};

export default rollupPluginGas;
