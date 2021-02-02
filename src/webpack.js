// Import the required modules
import { executablePath, resourcePath } from './filesystem';
import { spawn } from './spawn';

// Extract the flags
const [ ,,, ...flags ] = process.argv;

// Define the path to the webpack cli
const cli = executablePath('webpack');

// Define the path to the webpack configuration
const config = resourcePath('webpack/config.js')

// Build the module using webpack and the configuration (plus any flags)
export const build = () => spawn(cli, 'build', '-c', config, ...flags);

// Build and watch the module using webpack and the configuration (plus any flags)
export const watch = () => spawn(cli, 'build', '-c', config, '--watch', ...flags);

// Build and serve the module using webpack and the configuration (plus any flags)
export const serve = () => spawn(cli, 'serve', '-c', config, ...flags);