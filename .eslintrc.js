module.exports = {
  root: true,
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  "plugins": ["react", "@typescript-eslint", "prettier"],
  "env": {
    "browser": true,
    "jasmine": true,
    "jest": true,
    "es6":true
  },
  "rules": {
    "no-undef": "off",
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto"
      }
    ],
    "no-unused-vars": ["warn", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
    "no-console": "error",
    "react/prop-types": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      { "allowExpressions": true }
    ],
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/ban-types":"off",
    "@typescript-eslint/ban-ts-comment":"off",
    "@typescript-eslint/no-empty-interface":"off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  },
  "settings": {
    "react": {
      "pragma": "React",
      "version": "detect"
    }
  },
  "globals": {
    "process": true,
    "JSX": true,
  },
  "parser": "@typescript-eslint/parser"
};
