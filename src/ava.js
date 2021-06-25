// // Import the required modules
// import { executablePath, resourcePath } from './filesystem';
// import { spawn } from './spawn';

// // Make
// fs.mkdtempSync

// // Extract the flags
// const [ ,,, ...flags ] = process.argv;

// // Define the path to the webpack cli
// const cli = executablePath('webpack');

// // Define the path to the webpack configuration
// const config = resourcePath('webpack/config.js');

// // Build the module using webpack and the configuration (plus any flags)
// export const build = () => spawn(cli, 'build', '-c', config, ...flags);

// // Build and watch the module using webpack and the configuration (plus any flags)
// export const watch = () => spawn(cli, 'build', '-c', config, '--watch', ...flags);

// // Build and serve the module using webpack and the configuration (plus any flags)
// export const serve = () => spawn(cli, 'serve', '-c', config, ...flags);

// // Import the filesystem module
// import { 
//   readJSON, writeJSON, readFile, writeFile, 
//   workspacePath, packagePath, resourcePath,
//   workspaceDirectory
// } from './filesystem';

// // Configure the package.json scripts
// export const appendScripts = () => {

//   // Read the package.json in the workspace
//   const packageData = readJSON(workspacePath('package.json'));

//   // Check if there is a main script and add one if not
//   if (!packageData.main) packageData.main = 'lib/bundle.js';

//   // Check if there are scripts in the package.json, and add if not
//   if (!packageData.scripts) packageData.scripts = {};

//   // Check if there is a prepublish script and add one if not
//   if (!packageData.scripts.prepublish) packageData.scripts.prepublish = 'npm run build';

//   // Check if there is a build script and add one if not
//   if (!packageData.scripts.build) packageData.scripts.build = 'module-packer build';

//   // Check if there is a serve script and add one if not
//   if (!packageData.scripts.serve) packageData.scripts.serve = 'module-packer serve';

//   // Check if there is a watch script and add one if not
//   if (!packageData.scripts.watch) packageData.scripts.watch = 'module-packer watch';

//   // Update the package.json file
//   writeJSON(workspacePath('package.json'), packageData);
// };

// // Configure the package.json scripts
// export const initPackage = (name) => {

//   // Generate a temporary folder
//   const temp

//   // Read the ava.config.json in the resources
//   let configData = readFile(resourcePath('ava/ava.config.json'));

//   // Replace the hash with the file path
//   configData = configData.replace(/(\$HASH)/gm, filepath);

//   // Save the ava.config.json to the temporary directory
//   writeFile(temporaryPath('ava.config.json'), configData);
// };


// // Clear the devDependencies of the package.json when installing (postinstall)
// export const clearDependencies = () => {

//   // Read the package.json in the workspace
//   const packageData = readJSON(workspacePath('package.json'));

//   // Clear the devDependencies
//   packageData.devDependencies = {};

//   // Update the package.json file
//   writeJSON(workspacePath('package.json'), packageData);
// };