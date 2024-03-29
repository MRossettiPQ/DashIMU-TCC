// @ts-check
const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
  // This option interrupts the configuration hierarchy at this file
  // Remove this if you have an higher level ESLint config file (it usually happens into a monorepos)
  root: true,
  ignorePatterns: ["dist"],
  parserOptions: {
    parser: "@babel/eslint-parser",
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
  env: {
    browser: true,
    "vue/setup-compiler-macros": true,
  },

  // Rules order is important, please avoid shuffling them
  extends: [
    // Base ESLint recommended rules
    "eslint:recommended",

    // Uncomment any of the lines below to choose desired strictness,
    // but leave only one uncommented!
    // See https://eslint.vuejs.org/rules/#available-rules (look for Vue-js 2 ones)
    "plugin:vue/essential", // Priority A: Essential (Error Prevention)
    "plugin:vue/strongly-recommended", // Priority B: Strongly Recommended (Improving Readability)
    // 'plugin:vue/recommended', // Priority C: Recommended (Minimizing Arbitrary Choices and Cognitive Overhead)

    // https://github.com/prettier/eslint-config-prettier#installation
    // usage with Prettier, provided by 'eslint-config-prettier'.
    "prettier",
  ],

  plugins: [
    // https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-file
    // required to lint *.vue files
    "vue",

    // https://github.com/typescript-eslint/typescript-eslint/issues/389#issuecomment-509292674
    // Prettier has not been included as plugin to avoid performance impact
    // add it as an extension for your IDE
  ],

  globals: {
    ga: "readonly", // Google Analytics
    cordova: "readonly",
    __statics: "readonly",
    process: "readonly",
    Capacitor: "readonly",
    chrome: "readonly",
    require: true,
  },

  // add your custom rules here
  rules: {
    "vue/multi-word-component-names": ["off"],
    "prefer-promise-reject-errors": "off",

    "brace-style": 2,
    "vue/max-attributes-per-line": 0,
    "vue/valid-v-for": 0,

    // allow async-await
    "generator-star-spacing": "off",
    // allow paren-less arrow functions
    "arrow-parens": 0,
    "one-var": 0,

    "import/first": 0,
    "import/named": 0,
    "import/namespace": 0,
    "import/default": 0,
    "import/export": 0,
    "import/extensions": 0,
    "import/no-unresolved": 0,
    "import/no-extraneous-dependencies": 0,

    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
  },
});
