import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    rules: {
      "no-underscore-dangle": "off",
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-namespace": 0,
      "no-param-reassign": 1,
      "no-console": "warn",
      "no-undef": "error",
      "prefer-const": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/display-name": 1,
      "@typescript-eslint/ban-ts-comment": 1,
      "@next/next/no-img-element": 0,
      "@typescript-eslint/no-explicit-any": 1,
    },
  },
  {
    files: ["**/*.cy.{js,ts,tsx,jsx}"],
    rules: {
      "no-undef": 0,
      "no-param-reassign": 0,
    },
  },
  {
    files: ["cypress/support/*.ts"],
    rules: {
      "no-undef": 0,
      // "@typescript-eslint/no-namespace": 0,
      "no-unused-vars": 0,
    },
  },
];

export default eslintConfig;
