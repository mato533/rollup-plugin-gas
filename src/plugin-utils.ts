import path from "path";

import { generate } from "gas-entry-generator";

import type { GasEntryOptions } from "types";

export const getRelativePath = (filePath: string): string => {
  return [".", path.relative(process.cwd(), filePath)].join(path.sep);
};

export const generateEntry = (code: string, prams: GasEntryOptions) =>
  generate(code, prams);
