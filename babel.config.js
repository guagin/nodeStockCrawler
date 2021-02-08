const { resolve } = require('path')

const rootDir = resolve(__dirname, '.')

const moduleResolver = [
  'module-resolver',
  {
    root: [resolve(rootDir, './src'), rootDir],
    extensions: ['.js', '.ts', '.json', '.graphql'],
    alias: {
      '@graphql': resolve(rootDir, 'graphql'),
    },
  },
]

module.exports = {
  presets: [['@babel/env', { modules: false }], '@babel/typescript'],
  plugins: [
    moduleResolver,
    'transform-typescript-metadata',
    ['@babel/proposal-decorators', { legacy: true }],
    ['@babel/proposal-class-properties', { loose: true }],
    '@babel/proposal-object-rest-spread',
  ],
}
