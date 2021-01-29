#!/usr/bin/env node

// Import the spawn process
import { spawnSync } from 'child_process';

// Import the filesystem module
import { resourcePath } from './filesystem';

// Handle when there aren't any arguments
if (process.argv.length < 3) {
  
    // Log the usage options for the CLI
    console.log('\x1b[0m\x1b[35m\x1b[1m@oneisland/module-packer\x1b[0m\n');
    console.log('\x1b[35m    build \x1b[2m[webpack-cli-flags]\x1b[0m');
    console.log('\x1b[2m    (package up a libary or module using webpack)\x1b[0m');

    // Exit the application
    process.exit(0);
}

// Extract the command and arguments
const [,, command, ...flags] = process.argv;

// Build the module using webpack and the configuration
const build = (flags) => spawnSync('webpack', ['build', '-c', resourcePath('webpack/config.js'), ...flags], {
  stdio: 'inherit'
});

// Define the commands set
const commands = { build };

// Run the appropriate command
commands[command](flags);