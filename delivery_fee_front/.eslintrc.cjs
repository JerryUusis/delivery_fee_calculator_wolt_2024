module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: [
    "react-refresh",
    "react",
    "react-hooks",
    "jsx-a11y",
    "@typescript-eslint",
    "prettier",
  ],
  rules: {
    "prettier/prettier": true,
    "@typescript-eslint/no-unused-vars": "warn",
    "react/prop-types": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    quotes: ["error", "double"],
    eqeqeq: "error",
    semi: ["error", "always"],
    "object-curly-spacing": ["error", "always"],
  },
};
