import path from "path";
import pc from "picocolors";
import { rollup } from "rollup";
import type { OutputAsset } from "rollup";
import rollupPluginGas from "../src";
import type { RollupPluginGasOptions } from "types";
import { manifest } from "@/plugin-manifest";

interface TestParams {
  scenario: string;
  dirFixtures: string;
}

const dirFixtures = path.resolve(__dirname, "./__fixtures__");
const dirIncludeFixtures = path.resolve(dirFixtures, "include");

const defineFixtureFileName = (param: TestParams) => {
  const { scenario, dirFixtures: dir } = param;
  const inputFile = path.join(dir, `${scenario}.js`);
  return inputFile;
};

const build = async (inputFile: string, options?: RollupPluginGasOptions) => {
  const bundle = await rollup({
    input: inputFile,
    plugins: [rollupPluginGas(options)],
  });

  return await bundle.generate({});
};

const buildAndAssertOutput = async (
  param: TestParams,
  options?: RollupPluginGasOptions
) => {
  const inputFile = defineFixtureFileName(param);

  const output = await build(inputFile, options);

  expect(output.output.length).toBe(1);
  const [{ code: generated }] = output.output;
  expect(generated).toMatchSnapshot();
};

const buildAndAssertManifest = async (option: RollupPluginGasOptions) => {
  const inputFile = defineFixtureFileName({
    scenario: "basic",
    dirFixtures: dirFixtures,
  });

  const output = await build(inputFile, option);
  expect(output.output.length).toBe(2);
  const generatedManifest = output.output[1] as OutputAsset;
  expect(generatedManifest.type).toBe("asset");
  expect(generatedManifest.fileName).toBe(manifest);
  expect(generatedManifest.source).toMatchSnapshot();
};

describe("rollup-plugin-gas", () => {
  it.each(["basic", "allow-function"])(
    "Should add entry point function to the bandle file #%s",
    async (scenario) => {
      await buildAndAssertOutput({
        scenario: scenario,
        dirFixtures: dirFixtures,
      });
    }
  );

  it("Should include comments", async () => {
    await buildAndAssertOutput(
      { scenario: "comment", dirFixtures: dirFixtures },
      { comment: true }
    );
  });

  it("Should add entrypoint function of the specified file", async () => {
    await buildAndAssertOutput(
      { scenario: "include", dirFixtures: dirIncludeFixtures },
      { include: ["**/include.js"] }
    );
  });

  it("Should print each source filename to bandle file", async () => {
    await buildAndAssertOutput(
      {
        scenario: "comment-module",
        dirFixtures: dirFixtures,
      },
      { moduleHeaderComment: true }
    );
  });

  it("Should print each source filename to bandle file", async () => {
    await buildAndAssertOutput(
      {
        scenario: "include-comment-module",
        dirFixtures: dirIncludeFixtures,
      },
      { include: ["**/include-comment-module.js"], moduleHeaderComment: true }
    );
  });

  it("Should copy the manifest file", async () => {
    vi.spyOn(process, "cwd").mockReturnValue(dirFixtures);

    await buildAndAssertManifest({
      manifest: { copy: true },
    });
  });

  it("Should copy the manifest file using srcDir option", async () => {
    vi.spyOn(process, "cwd").mockReturnValue(__dirname);

    await buildAndAssertManifest({
      manifest: { copy: true, srcDir: "./__fixtures__" },
    });
  });
});
