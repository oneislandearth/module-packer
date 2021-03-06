// Import the SourceMap plugin
const { SourceMapDevToolPlugin } = require('webpack');

// Import the Shebang plugin
const { ShebangPlugin } = require('./shebang');

// Import the filesystem module
const { workspacePath, workspacePathExists } = require('./filesystem');

// Import the utility module	
const { moduleFilename } = require('./utils');

// Define the webpack configurator
module.exports = (env) => {

  // Define the custom configurations
  let configuration = {};

  // Check for a webpack.config.js file in the package root and load if found
  if (workspacePathExists('webpack.config.js')) configuration = require(workspacePath('webpack.config.js'));

  // If the configuration is a function, execute it
  if (typeof configuration == 'function') configuration = configuration(env);

  // Append the configuration mode if not set
  if (!configuration.mode) configuration.mode = 'production';

  // Append the target mode if not set
  if (!configuration.target) configuration.target = 'node';

  // Append the devtool if not set
  if (!configuration.devtool) configuration.devtool = 'eval';

  // Check if the entry file is unset
  if (!configuration.entry) {

    // Define the entry file
    const file = (workspacePathExists('src/main.js')) ? workspacePath('src/main.js') : workspacePath('src/index.js');
    
    // Append the entry mode if not set
    configuration.entry = { 'bundle': file };
  }

  // Append the output if not set
  if (!configuration.output) configuration.output = {};

  // Append the output.path if not set
  if (!configuration.output.path) configuration.output.path = workspacePath('lib/');

  // Append the output.filename if not set
  if (!configuration.output.filename) configuration.output.filename = '[name].js';

  // Append the output.libraryTarget if not set
  if (!configuration.output.libraryTarget) configuration.output.libraryTarget = 'umd';

  // Append the output.scriptType if not set
  if (!configuration.output.scriptType) configuration.output.scriptType = 'module';

  // Check if output.devtoolModuleFilenameTemplate is set and the target is node
  if (!configuration.output.devtoolModuleFilenameTemplate && configuration.target == 'node') {

    // Append the output.devtoolModuleFilenameTemplate 
    // configuration.output.devtoolModuleFilenameTemplate = (info) => moduleFilename(info, workspacePath);
    configuration.output.devtoolModuleFilenameTemplate = '/[absolute-resource-path]';
  }

  // Append the resolve if not set
  if (!configuration.resolve) configuration.resolve = {};

  // Append the resolve.alias if not set
  if (!configuration.resolve.alias) configuration.resolve.alias = {};

  // Append the aliases
  configuration.resolve.alias['~lib'] = workspacePath('lib');
  configuration.resolve.alias['~src'] = workspacePath('src');
  configuration.resolve.alias['~service'] = workspacePath('service/src');
  configuration.resolve.alias['~client'] = workspacePath('client/src');

  // Append the module if not set
  if (!configuration.module) configuration.module = {};

  // Append the module.rules if not set
  if (!configuration.module.rules) configuration.module.rules = [];

  // Add the source map loader
  configuration.module.rules.push({
    test: /src[\//].*.js$/,
    enforce: 'pre',
    use: ['source-map-loader']
  });

  // Add the worker module loader
  configuration.module.rules.push({
    test: /(.*)(?:worker\.js)$/,
    loader: '@oneisland/worker-module/loader'
  });

  // Append the plugins if not set
  if (!configuration.plugins) configuration.plugins = [];

  // Add the shebang plugin
  configuration.plugins.push(new ShebangPlugin());
  
  // Add the source-map plugin
  configuration.plugins.push(new SourceMapDevToolPlugin({ 
    filename: '[name].js.map' 
  }));

  // Append the devServer if not set
  if (!configuration.devServer) configuration.devServer = {};

  // Append the devServer.contentBase if not set
  if (!configuration.devServer.contentBase) configuration.devServer.contentBase = [
    workspacePath('lib'), 
    workspacePath('dist'), 
    workspacePath('public'),
    workspacePath('client/public'), 
    workspacePath('service/public')
  ];

  // Append the stats if not set
  if (!configuration.stats) configuration.stats = {
    modules: false,
    source: true
  };

  // Return the output
  return configuration;
};