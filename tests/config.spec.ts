import path from "path";

import { rollup } from "rollup";

import rollupPluginGas from "@/index";
import getPluginSetting from "@/plugin-config";
import * as gasEntryGenerator from "@/plugin-utils";

describe("Configration Test", () => {
  const expected = {
    include: ["**/*"],
    moduleHeaderComment: false,
    manifest: {
      copy: false,
      srcDir: process.cwd(),
    },
    gasEntryOptions: { comment: false },
    verbose: false,
  };

  it("default", () => {
    const result = getPluginSetting();
    assert.deepEqual(expected, result);
  });

  it("gasOptions", () => {
    const expectedGasEntryOption = {
      comment: true,
      exportsIdentifierName: "exports",
      autoGlobalExports: true,
      globalIdentifierName: "global",
    };
    const result = getPluginSetting({
      gasEntryOptions: expectedGasEntryOption,
    });
    const _expected = expected;
    _expected.gasEntryOptions = expectedGasEntryOption;

    assert.deepEqual(_expected, result);
  });

  it("test", async () => {
    const spy = vi.spyOn(gasEntryGenerator, "generateEntry");

    const dirnameFixtures = "./__fixtures__";
    const dirFixtures = path.resolve(__dirname, dirnameFixtures);

    const gasEntryOptions = {
      comment: true,
      autoGlobalExports: true,
      exportsIdentifierName: "exportsZ",
      globalIdentifierName: "globalZ",
    };
    const options = {
      gasEntryOptions,
    };
    const bundle = await rollup({
      input: path.join(dirFixtures, `basic.js`),
      plugins: [rollupPluginGas(options)],
      logLevel: "info",
    });

    await bundle.generate({});
    assert.deepEqual(spy.mock.calls[0][1], gasEntryOptions);
  });
});
