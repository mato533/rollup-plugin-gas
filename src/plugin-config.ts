import { join } from "node:path";

import type {
  FuncPluginConfig,
  PluginOptions,
  RollupPluginGasOptions,
} from "types";

const getPluginSettings = <T extends PluginOptions>(
  defaultOptions: T,
  inputOptions?: PluginOptions
): FuncPluginConfig<T> => {
  return Object.assign({}, defaultOptions, inputOptions) as FuncPluginConfig<T>;
};

const getPluginSetting = (options?: RollupPluginGasOptions) => {
  const defaultOptions = {
    comment: false,
    include: ["**/*"],
    moduleHeaderComment: false,
    manifest: {
      copy: false,
      srcDir: process.cwd(),
    },
    verbose: false,
  };

  if (!options) {
    return defaultOptions;
  }

  if (options.manifest && options.manifest.srcDir) {
    options.manifest.srcDir = join(process.cwd(), options.manifest.srcDir);
  }

  const configuredOptions = getPluginSettings(defaultOptions, options);
  configuredOptions.manifest = getPluginSettings(
    defaultOptions.manifest,
    options.manifest
  );

  return configuredOptions;
};

export default getPluginSetting;
