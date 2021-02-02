// Import the filesystem module
const { workspacePath, workspacePathExists } = require('./filesystem');

// Import the Shebang plugin
const { ShebangPlugin } = require('./shebang');

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
  if (!configuration.devtool) configuration.devtool = 'source-map';

  // Append the entry mode if not set
  if (!configuration.entry) configuration.entry = workspacePath('src/main.js');

  // Append the output if not set
  if (!configuration.output) configuration.output = {};

  // Append the output.path if not set
  if (!configuration.output.path) configuration.output.path = workspacePath('lib/');

  // Append the output.filename if not set
  if (!configuration.output.filename) configuration.output.filename = 'bundle.js';

  // Append the output.libraryTarget if not set
  if (!configuration.output.libraryTarget) configuration.output.libraryTarget = 'umd';

  // Append the output.scriptType if not set
  if (!configuration.output.scriptType) configuration.output.scriptType = 'module';

  // Append the plugins if not set
  if (!configuration.plugins) configuration.plugins = [];

  // Add the shebang plugin
  configuration.plugins.push(new ShebangPlugin());

  // Return the output
  return configuration;
};