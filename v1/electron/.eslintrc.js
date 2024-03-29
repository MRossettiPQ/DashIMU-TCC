module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  root: false,
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
}
