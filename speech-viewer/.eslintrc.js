module.exports = {
  env: {
    browser: true,
    es6: true,
    "jest/globals": true
  },
  extends: ["plugin:react/recommended", "airbnb", "plugin:jest/all", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: "module",
  },
  plugins: ["react", "jest"],
  rules: {
    "quotes": [
      "error",
      "single"
    ],
    "react/jsx-filename-extension": 0,
    "react/prop-types": 0,
    "react/jsx-one-expression-per-line": 0,
    "react/button-has-type": 0,
    "jsx-a11y/control-has-associated-label": 0,
    "jest/lowercase-name": 0,
    "jest/prefer-expect-assertions": 0,
    "jest/prefer-strict-equal": 0,
    "import/extensions": 0,
    "import/prefer-default-export": 0,
    "react/jsx-wrap-multilines": ["error", {"declaration": false, "assignment": false}],
    "no-restricted-syntax": 0,
  },
}
