import pluginCypress from "eslint-plugin-cypress";

export default [
  { ignores: ["node_modules/", "cypress/screenshots/", "cypress/reports/", "cypress/e2e/1-getting-started/", "cypress/e2e/2-advanced-examples/"] },
  {
    files: ["cypress/**/*.js"],
    languageOptions: { ecmaVersion: "latest", sourceType: "module" },
  },
  {
    files: ["cypress.config.js", "cypress/plugins/**/*.js"],
    languageOptions: { ecmaVersion: "latest", sourceType: "commonjs", globals: { require: "readonly", module: "writable", console: "readonly", __dirname: "readonly" } },
  },
  {
    ...pluginCypress.configs.recommended,
    files: ["cypress/e2e/**/*.js", "cypress/support/**/*.js"],
  },
];
