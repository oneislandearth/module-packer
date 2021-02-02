// Import the filesystem module
import { 
  readJSON, writeJSON, readFile, writeFile, 
  workspacePath, packagePath, resourcePath,
  workspaceDirectory, packageDirectory 
} from './filesystem';

// Configure the package.json scripts
export const appendScripts = () => {

  // Read the package.json in the workspace
  const packageData = readJSON(workspacePath('package.json'));

  // Check if there is a main script and add one if not
  if (!packageData.main) packageData.main = 'lib/bundle.js';

  // Check if there are scripts in the package.json, and add if not
  if (!packageData.scripts) packageData.scripts = {};

  // Check if there is a prepublish script and add one if not
  if (!packageData.scripts.prepublish) packageData.scripts.prepublish = 'npm run build';

  // Check if there is a build script and add one if not
  if (!packageData.scripts.build) packageData.scripts.build = 'module-packer build';

  // Check if there is a serve script and add one if not
  if (!packageData.scripts.serve) packageData.scripts.serve = 'module-packer serve';

  // Check if there is a watch script and add one if not
  if (!packageData.scripts.watch) packageData.scripts.watch = 'module-packer watch';

  // Update the package.json file
  writeJSON(workspacePath('package.json'), packageData);
}

// Configure the package.json scripts
export const initPackage = (name) => {

  // Determine the name from the directory if not set
  if (!name) name = workspaceDirectory.replace(/(?:\/.*\/)(.*)(?:\/*)/gm, (m, n) => n);

  // Read the version of the package
  const { version } = readJSON(packagePath('package.json'));

  // Read the package.json in the resources
  let packageData = readFile(resourcePath('npm/package.json'));

  // Replace the module name in the the package data
  packageData = packageData.replace(/(\$MODULE)/gm, name);

  // Replace the version in the the package data
  packageData = packageData.replace(/(\$VERSION)/gm, version);

  // Save the package.json file
  writeFile(workspacePath('package.json'), packageData);
}


// Clear the devDependencies of the package.json when installing (postinstall)
export const clearDependencies = () => {

  // Read the package.json in the workspace
  const packageData = readJSON(workspacePath('package.json'));

  // Clear the devDependencies
  packageData.devDependencies = {};

  // Update the package.json file
  writeJSON(workspacePath('package.json'), packageData);
}