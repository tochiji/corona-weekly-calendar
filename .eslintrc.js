module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    indent: [2, 2],
    'linebreak-style': ['error', 'unix'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
