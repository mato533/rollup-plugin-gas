import { existsSync, readFileSync } from "fs";
import { join } from "path";
import type { Plugin } from "rollup";
import pc from "picocolors";
import type { NotNullRollupPluginGasOptions } from "types";
import { getRelativePath } from "@/plugin-utils";

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
      this.info(
        pc.gray("Copy the manifest from: ") +
          pc.green(getRelativePath(sourceFile))
      );

      if (!existsSync(sourceFile)) {
        this.error("Manifest file is not exist: " + sourceFile);
      }
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
