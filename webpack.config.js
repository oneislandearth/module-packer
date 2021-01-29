module.exports = {
  mode: `production`,
  target: `node`,
  entry: {
    bundle: `${__dirname}/src/main.js`,
    cli: `${__dirname}/src/cli.js`
  },
  output: {
    path: `${__dirname}/lib/`,
    filename: `[name].js`,
    libraryTarget: 'umd',
    scriptType: 'module'
  },
  plugins: [new (require('./resources/webpack/shebang'))]
};