import { readFileSync } from "fs";
import { join } from "path";
import type { Plugin } from "rollup";
import pc from "picocolors";
import type { NotNullRollupPluginGasOptions } from "types";
import { getRelativePath, log } from "@/plugin-utils";

export const manifest = "appsscript.json";

export const loadManifest = (sourceFile: string) => {
  return readFileSync(sourceFile, {
    encoding: "utf8",
  });
};

const rollupPluginGasCopyManifest = (
  configuratedOptions: NotNullRollupPluginGasOptions
): Plugin => {
  const logging = (message: string) => {
    log(configuratedOptions.verbose, message);
  };
  return {
    name: "rollup-plugin-gas-copy-manifest",
    generateBundle() {
      if (!configuratedOptions.manifest.copy) {
        return;
      }
      const sourceFile = join(configuratedOptions.manifest.srcDir, manifest);
      logging(
        pc.gray("Copy the manifest from: ") +
          pc.green(pc.bold(getRelativePath(sourceFile)))
      );
      this.emitFile({
        type: "asset",
        name: "manifest",
        fileName: manifest,
        source: loadManifest(sourceFile),
      });
    },
  };
};

export default rollupPluginGasCopyManifest;
