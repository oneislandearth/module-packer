// Import the fs module
const { existsSync } = require('fs');

// Define the webpack configurator
module.exports = (env) => {

  // Define the custom configurations
  let configuration = {};

  // Define the project root directory
  const projectDirectory = process.cwd();

  // // Define the project root directory
  // const [, projectDirectory] = /(.*)(?:node_modules\/@oneisland\/module-packer)/.exec(__dirname);

  // Check for a webpack.config.js file in the package root and load if found
  if (existsSync(`${projectDirectory}/webpack.config.js`)) configuration = require(`${projectDirectory}/webpack.config.js`);

  // If the configuration is a function, execute it
  if (typeof configuration == 'function') configuration = configuration(env);

  // Append the configuration mode if not set
  if (!configuration.mode) configuration.mode = 'production';

  // Append the target mode if not set
  if (!configuration.target) configuration.target = 'node';

  // Append the entry mode if not set
  if (!configuration.entry) configuration.entry = `${projectDirectory}/src/main.js`;

  // Append the output if not set
  if (!configuration.output) configuration.output = {
    path: `${projectDirectory}/lib/`,
    filename: 'bundle.js',
    libraryTarget: 'umd',
    scriptType: 'module'
  }

  // Append the output.path if not set
  if (!configuration.output.path) configuration.output.path = `${projectDirectory}/lib/`;

  // Append the output.filename if not set
  if (!configuration.output.filename) configuration.output.filename = 'bundle.js';

  // Append the output.libraryTarget if not set
  if (!configuration.output.libraryTarget) configuration.output.libraryTarget = 'umd';

  // Append the output.scriptType if not set
  if (!configuration.output.scriptType) configuration.output.scriptType = 'module';

  // Return the output
  return configuration;
};