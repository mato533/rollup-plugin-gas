import { join } from "path";

import type {
  FuncPluginConfig,
  NotNullRollupPluginGasOptions,
  PluginOptions,
  RollupPluginGasOptions,
} from "types";

const getPluginSettings = <T extends PluginOptions>(
  defaultOptions: T,
  inputOptions?: PluginOptions
): FuncPluginConfig<T> => {
  return Object.assign(
    {},
    defaultOptions,
    inputOptions
  ) as unknown as FuncPluginConfig<T>;
};

const getPluginSetting = (options?: RollupPluginGasOptions) => {
  const defaultOptions: NotNullRollupPluginGasOptions = {
    include: ["**/*"],
    moduleHeaderComment: false,
    manifest: {
      copy: false,
      srcDir: process.cwd(),
    },
    gasEntryOptions: {
      comment: false,
      // autoGlobalExports: false,
      // exportsIdentifierName: "exports",
      // globalIdentifierName: "global",
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
  configuredOptions.gasEntryOptions = getPluginSettings(
    defaultOptions.gasEntryOptions,
    options.gasEntryOptions
  );

  return configuredOptions;
};

export default getPluginSetting;
