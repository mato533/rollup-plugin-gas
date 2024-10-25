import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,

  {
    ignores: [
      "tests/__fixtures__/**",
      "tests/__snapshots__/**",
      "changelog.config.cjs",
      "dist",
    ],
  }
);

// module.exports = {
//   root: true,
//   env: {
//     browser: true,
//     es2021: true,
//     node: true,
//   },
//   extends: [
//     "eslint:recommended",
//     "plugin:@typescript-eslint/recommended",
//     "prettier",
//   ],
//   overrides: [],
//   parser: "@typescript-eslint/parser",
//   parserOptions: {
//     ecmaVersion: "latest",
//     sourceType: "module",
//   },
//   plugins: ["@typescript-eslint", "import"],
//   rules: {
//     indent: ["error", 2],
//     "linebreak-style": ["error", "unix"],
//     quotes: ["error", "double", { allowTemplateLiterals: true }],
//     semi: ["error", "always"],
//     "import/order": [
//       "error",
//       {
//         groups: [
//           "builtin",
//           "external",
//           "internal",
//           "parent",
//           "sibling",
//           "index",
//           "object",
//           "type",
//         ],
//       },
//     ],
//     "import/no-duplicates": ["error"],
//   },
// };
