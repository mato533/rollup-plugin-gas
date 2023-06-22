export interface RollupPluginGasOption {
  comment?: boolean;
  include?: Array<string>;
  moduleHeaderComment?: boolean;
}

export default function rollupPluginGas(
  options?: RollupPluginGasOption
): Plugin;
