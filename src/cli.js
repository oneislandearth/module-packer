#!/usr/bin/env -S node --enable-source-maps

// Require('source-map-support').install();

// Import the webpack module
import { build, serve, watch } from './webpack';

// Import the ava module
import { test } from './ava';

// Import the postinstall module
import { postinstall } from './postinstall';

// Import the init module
import { init } from './init';

// Handle when there aren't any arguments
if (process.argv.length < 3) {
  
  // Log the usage options for the CLI
  console.log();
  console.log('\x1b[0m\x1b[35m\x1b[1m@oneisland/module-packer\x1b[0m\n');
  console.log('\x1b[35m    init \x1b[2m[name]\x1b[0m');
  console.log('\x1b[2m    (setup a new library or module)\x1b[0m\n');
  console.log('\x1b[35m    build \x1b[2m[webpack-cli-flags]\x1b[0m');
  console.log('\x1b[2m    (package up a library or module using webpack)\x1b[0m\n');
  console.log('\x1b[35m    watch \x1b[2m[webpack-cli-flags]\x1b[0m');
  console.log('\x1b[2m    (package up and watch for library or module changes using webpack -w)\x1b[0m\n');
  console.log('\x1b[35m    serve \x1b[2m[webpack-cli-flags]\x1b[0m');
  console.log('\x1b[2m    (package up and serve a library or module using webpack serve)\x1b[0m\n');
  console.log('\x1b[35m    test \x1b[2m[ava-flags]\x1b[0m');
  console.log('\x1b[2m    (execute any tests defined in the libary or module using ava)\x1b[0m\n');
  console.log();

  // Exit the application
  process.exit(0);
}

// Extract the command and arguments
const [,, command, ...flags] = process.argv;

// Define the commands set
const commands = { build, serve, watch, test, postinstall, init };

// Run the appropriate command
commands[command](flags);