import path from "path";

export const getRelativePath = (filePath: string): string => {
  return [".", path.relative(process.cwd(), filePath)].join(path.sep);
};
