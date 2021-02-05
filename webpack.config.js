// Import the Sourcemap plugin
const { SourceMapDevToolPlugin } = require('webpack');

// Import the Shebang plugin
const { ShebangPlugin } = require('./resources/webpack/shebang');

// Define the webpack build rules
module.exports = {

  // Define the build environment
  mode: 'production',
  target: 'node',
  devtool: 'eval',

  // Define the modules to build and appropriate paths
  entry: {

    // Define the filesystem script to be used by the webpack resource
    '/resources/webpack/filesystem': `${__dirname}/src/filesystem.js`,

    // Define the cli module for the package
    '/lib/cli': `${__dirname}/src/cli.js`

    // Define the core bundle for the package
    // '/lib/bundle': `${__dirname}/src/main.js`
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
    devtoolModuleFilenameTemplate: '/[absolute-resource-path]'
  },

  // Add the plugins
  plugins: [
    
    // Add the Shebang plugin
    new ShebangPlugin(),

    // Add the Sourcemap plugin
    new SourceMapDevToolPlugin({ 
      filename: '[name].js.map',
      exclude: /filesystem.js/ 
    })
  
  ]
};