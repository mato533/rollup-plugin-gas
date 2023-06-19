export interface ManifestOptions {
  copy: boolean;
  srcDir?: string;
}

export interface RollupPluginGasOptions {
  comment?: boolean;
  include?: Array<string>;
  moduleHeaderComment?: boolean;
  manifest?: ManifestOptions;
}

type DeepRequired<T> = {
  [K in keyof T]-?: Required<DeepRequired<T[K]>>;
};

export type NotNullRollupPluginGasOptions =
  DeepRequired<RollupPluginGasOptions>;

export type NotNullManifestOptions = DeepRequired<ManifestOptions>;

export type PluginOptions = RollupPluginGasOptions | ManifestOptions;

export type FuncPluginConfig<T> = T extends RollupPluginGasOptions
  ? NotNullRollupPluginGasOptions
  : NotNullManifestOptions;

export default function rollupPluginGas(
  options?: RollupPluginGasOptions
): Plugin;
