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

  it("Should cgit opy the manifest file using srcDir option", async () => {
    vi.spyOn(process, "cwd").mockReturnValue(__dirname);

    await buildAndAssertManifest({
      manifest: { copy: true, srcDir: "./__fixtures__" },
    });
  });

  it("Should print logs when verbose option is used", async () => {
    vi.spyOn(process, "cwd").mockReturnValue(dirFixtures);
    const spyLog = vi.spyOn(console, "log");

    await buildAndAssertManifest({
      manifest: { copy: true },
      verbose: true,
    });
    expect(spyLog).toHaveBeenCalledTimes(3);
    expect(spyLog).nthCalledWith(
      1,
      pc.gray("[gas] ") +
        pc.gray("Generated target: ") +
        pc.green(pc.bold("./basic.js"))
    );
    expect(spyLog).nthCalledWith(
      2,
      pc.gray("[gas] ") +
        pc.gray("Generated target: ") +
        pc.green(pc.bold("./echo.js"))
    );
    expect(spyLog).nthCalledWith(
      3,
      pc.gray("[gas] ") +
        pc.gray("Copy the manifest from: ") +
        pc.green(pc.bold("./appsscript.json"))
    );
  });

  it("Should print logs when verbose option is used (exclude)", async () => {
    const spyLog = vi.spyOn(console, "log");
    await buildAndAssertOutput(
      { scenario: "include", dirFixtures: dirIncludeFixtures },
      { include: ["**/include.js"], verbose: true }
    );
    expect(spyLog).toHaveBeenCalledTimes(2);
    expect(spyLog).nthCalledWith(
      1,
      pc.gray("[gas] ") +
        pc.gray("Generated target: ") +
        pc.green(pc.bold("./include/include.js"))
    );
    expect(spyLog).nthCalledWith(
      2,
      pc.gray("[gas] ") +
        pc.gray("Excluded target: ") +
        pc.yellow(pc.bold("./include/foo.js"))
    );
  });

  it("Should not print logs when verbose option is not setted", async () => {
    const spyLog = vi.spyOn(console, "log");
    await buildAndAssertOutput(
      { scenario: "include", dirFixtures: dirIncludeFixtures },
      { include: ["**/include.js"] }
    );
    expect(spyLog).toHaveBeenCalledTimes(0);
  });
});
