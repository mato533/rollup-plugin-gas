import path from "path";
import fs from "fs";
import { rollup } from "rollup";
import rollupPluginGas from "@/index";
import { describe, it } from "vitest";

const dirFixtures = path.resolve(__dirname, "./fixtures");

describe("rollup-plugin-gas", () => {
  it.each(["basic", "allow-function"])(
    "should entry point function is added. #%s",
    async (scenario) => {
      const inputFile = path.join(dirFixtures, `${scenario}.js`);
      const outputFile = path.join(dirFixtures, `${scenario}.bundle.js`);
      const bundle = await rollup({
        input: inputFile,
        plugins: [rollupPluginGas()],
      });

      const output = await bundle.generate({});
      const [{ code }] = output.output;
      const expected = fs.readFileSync(outputFile, {
        encoding: "utf8",
      });
      expect(code).toBe(expected);
    }
  );
});
