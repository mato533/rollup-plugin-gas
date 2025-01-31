import rollupPluginGasCopyManifest from "@/plugin-manifest";
import rollupPluginGasEntryPoint from "@/plugin-entry-point";
import getPluginSetting from "@/plugin-config";

import { name } from "../package.json";

import type { Plugin } from "rollup";
import type { RollupPluginGasOptions } from "../types";

const rollupPluginGas = (options?: RollupPluginGasOptions): Plugin => {
  const configuratedOptions = getPluginSetting(options);

  const { outputOptions, transform, banner } =
    rollupPluginGasEntryPoint(configuratedOptions);

  const { generateBundle } = rollupPluginGasCopyManifest(configuratedOptions);
  return {
    name,
    onLog() {
      if (!configuratedOptions.verbose) {
        return false;
      }
    },
    outputOptions,
    transform,
    banner,
    generateBundle,
  };
};

export default rollupPluginGas;
