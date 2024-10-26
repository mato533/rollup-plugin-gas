export interface ManifestOptions {
  copy: boolean;
  srcDir?: string;
}

export interface GasEntryOptions {
  comment?: boolean;
  autoGlobalExports?: boolean;
  exportsIdentifierName?: string;
  globalIdentifierName?: string;
}
export interface DefaultGasEntryOptions {
  comment: boolean;
  autoGlobalExports?: boolean;
  exportsIdentifierName?: string;
  globalIdentifierName?: string;
}

export interface RollupPluginGasOptions {
  include?: Array<string>;
  moduleHeaderComment?: boolean;
  manifest?: ManifestOptions;
  gasEntryOptions?: GasEntryOptions;
  verbose?: boolean;
}

export type NotNullRollupPluginGasOptions = {
  include: Array<string>;
  moduleHeaderComment: boolean;
  manifest: Required<ManifestOptions>;
  gasEntryOptions: DefaultGasEntryOptions;
  verbose: boolean;
};

export type NotNullManifestOptions = Required<ManifestOptions>;

export type PluginOptions =
  | RollupPluginGasOptions
  | ManifestOptions
  | GasEntryOptions;

export type FuncPluginConfig<T> = T extends RollupPluginGasOptions
  ? NotNullRollupPluginGasOptions
  : T extends GasEntryOptions
    ? DefaultGasEntryOptions
    : NotNullManifestOptions;

export default function rollupPluginGas(
  options?: RollupPluginGasOptions
): Plugin;
