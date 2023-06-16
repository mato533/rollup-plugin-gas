import { readFileSync } from "fs";
import { join } from "path";
import type { Plugin } from "rollup";
import type { NotNullRollupPluginGasOptions } from "types";

export const manifest = "appsscript.json";

export const loadManifest = (sourceFile: string) => {
  return readFileSync(sourceFile, {
    encoding: "utf8",
  });
};

const rollupPluginGasCopyManifest = (
  configuratedOptions: NotNullRollupPluginGasOptions
): Plugin => {
  return {
    name: "rollup-plugin-gas-copy-manifest",
    generateBundle() {
      if (!configuratedOptions.manifest.copy) {
        return;
      }
      const sourceFile = join(configuratedOptions.manifest.srcDir, manifest);
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
