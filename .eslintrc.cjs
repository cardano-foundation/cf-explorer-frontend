/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    "eslint-config-prettier",
    "prettier"
  ],
  plugins: ["prettier"],
  settings: {
    react: {
      version: "detect"
    },
    "import/resolver": {
      node: {
        paths: [path.resolve(__dirname, "")],
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      },
      typescript: {
        project: path.resolve(__dirname, "./tsconfig.json")
      }
    }
  },
  env: {
    node: true
  },
  rules: {
    "no-console": "error",
    "react/react-in-jsx-scope": "off",
    "react/jsx-no-target-blank": "warn",
    "react/prop-types": "off",
    "react/no-unescaped-entities": 0,
    "import/no-named-as-default": 0,
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "import/order": [
      "error",
      {
        groups: [["builtin", "external"], ["internal"], ["parent", "sibling"], "unknown"],
        pathGroups: [{ pattern: "commons/**", group: "unknown" }],
        "newlines-between": "always"
      }
    ],
    "prettier/prettier": [
      "warn",
      {
        arrowParens: "always",
        semi: true,
        trailingComma: "none",
        tabWidth: 2,
        endOfLine: "auto",
        useTabs: false,
        singleQuote: false,
        printWidth: 120,
        jsxSingleQuote: false
      }
    ]
  }
};
