import path from "path";
import fs from "fs";
import { rollup } from "rollup";
import { describe, expect, it } from "vitest";
import rollupPluginGas from "../src";
import type { RollupPluginGasOption } from "types";

interface TestParams {
  scenario: string;
  dirFixtures: string;
}

const dirFixtures = path.resolve(__dirname, "./fixtures");
const dirIncludeFixtures = path.resolve(__dirname, "./fixtures/include");

const defineFixtureFileName = (param: TestParams) => {
  const { scenario, dirFixtures: dir } = param;
  const inputFile = path.join(dir, `${scenario}.js`);
  const outputFile = path.join(dir, `${scenario}.bundle.js`);
  return { inputFile, outputFile };
};

const buildAndAssertOutput = async (
  param: TestParams,
  options?: RollupPluginGasOption
) => {
  const { inputFile, outputFile } = defineFixtureFileName(param);

  const bundle = await rollup({
    input: inputFile,
    plugins: [rollupPluginGas(options)],
  });

  const output = await bundle.generate({});
  const [{ code: generated }] = output.output;
  const expected = fs.readFileSync(outputFile, {
    encoding: "utf8",
  });
  expect(generated).toBe(expected);
};

describe("rollup-plugin-gas", () => {
  it.each(["basic", "allow-function"])(
    "should entry point function is added. #%s",
    async (scenario) => {
      await buildAndAssertOutput({
        scenario: scenario,
        dirFixtures: dirFixtures,
      });
    }
  );

  it("shold included comments", async () => {
    await buildAndAssertOutput(
      { scenario: "comment", dirFixtures: dirFixtures },
      { comment: true }
    );
  });

  it("shoud output entrypoint function of the specified file", async () => {
    await buildAndAssertOutput(
      { scenario: "include", dirFixtures: dirIncludeFixtures },
      { include: ["**/include.js"] }
    );
  });
});
