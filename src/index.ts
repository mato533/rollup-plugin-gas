import type { Plugin } from "rollup";
import type { RollupPluginGasOptions } from "../types";
import rollupPluginGasCopyManifest from "@/plugin-manifest";
import rollupPluginGasEntryPoint from "@/plugin-entry-point";
import getPluginSetting from "@/plugin-config";
import { name } from "../package.json";

const rollupPluginGas = (options?: RollupPluginGasOptions): Plugin => {
  const configuratedOptions = getPluginSetting(options);

  const { outputOptions, transform, banner } =
    rollupPluginGasEntryPoint(configuratedOptions);

  const { generateBundle } = rollupPluginGasCopyManifest(configuratedOptions);
  return {
    name,
    outputOptions,
    transform,
    banner,
    generateBundle,
  };
};

export default rollupPluginGas;
