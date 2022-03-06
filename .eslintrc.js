module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    sourceType: 'module', // 模块为 ECMAScript 模块
    ecmaVersion: 2020,
  },
  rules: {
    semi: ['error', 'always'],
  },
};
