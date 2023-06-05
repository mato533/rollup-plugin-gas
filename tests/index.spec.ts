import path from "path";
import fs from "fs";
import { rollup } from "rollup";
import rollupPluginGas from "@/index";
import { describe, it } from "vitest";

const dirFixtures = path.resolve(__dirname, "./fixtures");
const dirIncludeFixtures = path.resolve(__dirname, "./fixtures/include");

const defineFixtureFileName = (dir: string, scenario: string) => {
  const inputFile = path.join(dir, `${scenario}.js`);
  const outputFile = path.join(dir, `${scenario}.bundle.js`);
  return { inputFile, outputFile };
};
describe("rollup-plugin-gas", () => {
  it.each(["basic", "allow-function"])(
    "should entry point function is added. #%s",
    async (scenario) => {
      const { inputFile, outputFile } = defineFixtureFileName(
        dirFixtures,
        scenario
      );
      const bundle = await rollup({
        input: inputFile,
        plugins: [rollupPluginGas()],
      });

      const output = await bundle.generate({});
      expect(output.output.length).toBe(1);
      const [{ code }] = output.output;
      const expected = fs.readFileSync(outputFile, {
        encoding: "utf8",
      });
      expect(code).toBe(expected);
    }
  );

  it("shold included comments", async () => {
    const { inputFile, outputFile } = defineFixtureFileName(
      dirFixtures,
      "comment"
    );
    const bundle = await rollup({
      input: inputFile,
      plugins: [rollupPluginGas({ comment: true })],
    });

    const output = await bundle.generate({});
    expect(output.output.length).toBe(1);
    const [{ code }] = output.output;
    const expected = fs.readFileSync(outputFile, {
      encoding: "utf8",
    });
    expect(code).toBe(expected);
  });

  it("shoud output entrypoint function of the specified file", async () => {
    const { inputFile, outputFile } = defineFixtureFileName(
      dirIncludeFixtures,
      "include"
    );

    const bundle = await rollup({
      input: inputFile,
      plugins: [rollupPluginGas({ include: ["**/include.js"] })],
    });

    const output = await bundle.generate({});
    expect(output.output.length).toBe(1);
    const [{ code }] = output.output;
    const expected = fs.readFileSync(outputFile, {
      encoding: "utf8",
    });
    expect(code).toBe(expected);
  });
});
