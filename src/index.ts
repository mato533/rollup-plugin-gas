import type { Plugin } from "rollup";
import type { RollupPluginGasOption } from "types";
import { createFilter } from "rollup-pluginutils";
import { generate } from "gas-entry-generator";
import path from "path";

const defaultOptions = {
  comment: false,
  include: ["**/*"],
};

const generateChunckHeader = (code: string, id: string) => {
  const filename = path.basename(id);
  const title = `  !*** ${filename} ***!`;
  const ast = Array(filename.length).fill("*");
  const header = "/*!****" + ast.join("") + "****!*\\";
  const footer = "\\*!****" + ast.join("") + "****!*/";
  return [header, title, footer, code].join("\n");
};

const rollupPluginGas = (options?: RollupPluginGasOption): Plugin => {
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
        return generateChunckHeader(code, id);
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
      return generateChunckHeader(code, id);
    },
    banner() {
      return ["var global = this;", ...entryPointFunctions].join("\n");
    },
  };
};

export default rollupPluginGas;
