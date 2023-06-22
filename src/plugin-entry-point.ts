import pc from "picocolors";
import { basename } from "path";
import type { Plugin } from "rollup";
import { createFilter } from "rollup-pluginutils";
import { generate } from "gas-entry-generator";
import type { NotNullRollupPluginGasOptions } from "types";
import { getRelativePath, log } from "@/plugin-utils";

const generateChunckHeader = (code: string, id: string) => {
  const filename = basename(id);
  const title = `  !*** ${filename} ***!`;
  const ast = Array(filename.length).fill("*");
  const header = "/*!****" + ast.join("") + "****!*\\";
  const footer = "\\*!****" + ast.join("") + "****!*/";
  return [header, title, footer, code].join("\n");
};

const rollupPluginGasEntryPoint = (
  configuratedOptions: NotNullRollupPluginGasOptions
): Plugin => {
  const entryPointFunctions: Array<string> = [];
  const filter = createFilter(configuratedOptions.include);
  const logging = (message: string) => {
    log(configuratedOptions.verbose, message);
  };
  return {
    name: "rollup-plugin-gas-entry-point",
    outputOptions(options) {
      options.format = "umd"; // cjs
      return options;
    },
    transform(code, id) {
      if (id.slice(-5).toLowerCase() === ".json") return;
      if (!filter(id)) {
        logging(
          pc.gray("Excluded target: ") + pc.yellow(pc.bold(getRelativePath(id)))
        );
        if (configuratedOptions.moduleHeaderComment) {
          return generateChunckHeader(code, id);
        } else {
          return;
        }
      }
      logging(
        pc.gray("Generated target: ") + pc.green(pc.bold(getRelativePath(id)))
      );
      const gasCode = generate(code, { comment: configuratedOptions.comment });
      if (gasCode.entryPointFunctions) {
        const codes = String(gasCode.entryPointFunctions).replace(
          /{\n}/g,
          "{};"
        );
        codes.split("\n").forEach((code) => {
          code && entryPointFunctions.push(`${code}`);
        });
      }
      if (configuratedOptions.moduleHeaderComment) {
        return generateChunckHeader(code, id);
      } else {
        return;
      }
    },
    banner() {
      return ["var global = this;", ...entryPointFunctions].join("\n");
    },
  };
};

export default rollupPluginGasEntryPoint;
