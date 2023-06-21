import path from "path";
import pc from "picocolors";

export const log = (verbose: boolean, message: string) => {
  if (verbose) {
    console.log(pc.gray("[gas] ") + message);
  }
};

export const getRelativePath = (filePath: string) => {
  return "./" + path.relative(process.cwd(), filePath);
};
