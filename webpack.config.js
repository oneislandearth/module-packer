// Import the Sourcemap plugin
const { SourceMapDevToolPlugin } = require('webpack');

// Import the Shebang plugin
const { ShebangPlugin } = require('./resources/webpack/shebang');

// Import the utilities
const { moduleFilename } = require('./resources/webpack/utils');

// Define the webpack build rules
module.exports = {

  // Define the build environment
  mode: 'production',
  target: 'node',
  devtool: 'eval',

  // Define the modules to build and appropriate paths
  entry: {

    // Define the filesystem script to be used by the webpack resource
    'resources/webpack/filesystem': `${__dirname}/src/filesystem.js`,

    // Define the cli module for the package
    'lib/cli': `${__dirname}/src/cli.js`
  },

  // Define the output rules
  output: {

    // Define the path to be the current root
    path: __dirname,

    // Define the file name including the path from the entry
    filename: '[name].js',

    // Setup the output as an umd module
    libraryTarget: 'umd',
    scriptType: 'module',

    // Setup the sourcemap paths
    // devtoolModuleFilenameTemplate: moduleFilename
    devtoolModuleFilenameTemplate: '/[absolute-resource-path]'
  },

  // Add the pre source map loader
  module: {
    rules: [
      {
        test: /src[\//].*.js$/,
        enforce: 'pre',
        use: ['source-map-loader']
      }
    ]
  },

  // Add the plugins
  plugins: [
    
    // Add the Shebang plugin
    new ShebangPlugin(),

    // Add the Sourcemap plugin
    new SourceMapDevToolPlugin({ 
      filename: '[name].js.map',
      // columns: true,
      // noSources: false,
      // module: true,
      exclude: /filesystem.js/ 
    })
  
  ],

  optimization: {
    // providedExports: false,
    mangleExports: false,
    // concatenateModules: true,
    usedExports: false,
  },

  stats: {
    modules: false,
    source: true,
  }
};