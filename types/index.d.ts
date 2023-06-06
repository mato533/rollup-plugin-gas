export interface RollupPluginGasOption {
  comment?: boolean;
  include?: Array<string>;
}

export default function rollupPluginGas(
  options?: RollupPluginGasOption
): Plugin;
