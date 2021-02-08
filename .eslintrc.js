const { resolve } = require('path')

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  env: {
    node: true,
    jest: true,
  },
  plugins: ['@typescript-eslint', '@typescript-eslint/tslint', 'babel', 'prettier', 'jest'],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'prettier/babel',
  ],
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  rules: {
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
    '@typescript-eslint/explicit-member-accessibility': [
      'warn',
      {
        accessibility: 'no-public',
        overrides: {
          parameterProperties: 'off',
        },
      },
    ],
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
      },
    ],
    '@typescript-eslint/prefer-for-of': 'warn',
    '@typescript-eslint/prefer-includes': 'warn',
    '@typescript-eslint/prefer-namespace-keyword': 'off',
    '@typescript-eslint/prefer-string-starts-ends-with': 'warn',
    '@typescript-eslint/promise-function-async': ['error'],
    '@typescript-eslint/tslint/config': [
      'warn',
      {
        lintFile: resolve(__dirname, 'tslint.json'),
      },
    ],
    'func-names': 'off',
    'lines-between-class-members': [
      'error',
      'always',
      {
        exceptAfterSingleLine: true,
      },
    ],
    'max-classes-per-file': 'off',
    'no-dupe-class-members': 'off',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-param-reassign': ['error', { props: false }],
    'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
    'no-unsed-vars': 'off',
    'no-useless-constructor': 'off',
    'padding-line-between-statements': [
      'warn',
      {
        blankLine: 'always',
        prev: ['multiline-const', 'multiline-let', 'multiline-var'],
        next: '*',
      },
      {
        blankLine: 'always',
        prev: 'multiline-block-like',
        next: '*',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'multiline-block-like',
      },
    ],
    'import/prefer-default-export': 'off',
    'sort-imports': [
      'warn',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    'import/order': [
      'warn',
      {
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'prettier/prettier': 'warn',
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.test.ts', '**/*.spec.ts', 'rollup.config.js'] },
    ],
  },
}
