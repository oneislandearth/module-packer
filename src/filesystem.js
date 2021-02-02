// Import the filesystem and path modules
import { existsSync, readFileSync, writeFileSync, copyFileSync, symlinkSync } from 'fs';
import { resolve } from 'path';

// Define the package name
const packageID = '@oneisland/module-packer-dev';

// Read a file
export const readFile = (path) => readFileSync(path, { encoding: 'utf-8' });

// Write a file
export const writeFile = (path, content) => writeFileSync(path, content);

// Read a file as JSON
export const readJSON = (path) => JSON.parse(readFile(path));

// Write a file as JSON
export const writeJSON = (path, content) => writeFile(path, JSON.stringify(content, null, 2));

// Search recursively for a package root
export const findRootDirectory = (directory, namecheck) => {

  // Return the module directory as 'none' when there is no workspace
  if (directory == '/') return 'none';

  // Check for a package.json file
  if (existsSync(resolve(directory, 'package.json'))) {

    // Read the package.json file
    const { name } = readJSON(resolve(directory, 'package.json'));

    // Check the name matches as expected and return the directory if so
    if (namecheck && namecheck(name)) return directory;

  // Check for a node modules folder
  } else if (existsSync(resolve(directory, 'node_modules'))) return directory;

  // Recursively search up a directory
  return findRootDirectory(resolve(directory, '../'), (namecheck) ? namecheck : null);
}

// Define the workspace root directory
export const workspaceDirectory = findRootDirectory(process.cwd(), (name) => name != packageID).replace(/node_modules.*/, '');

// Define the package root directory
export const packageDirectory = findRootDirectory(__dirname, (name) => name == packageID);

// Define the node modules directory
export const modulesDirectory = `${packageDirectory.replace(/node_modules.*/, '')}/node_modules`;

// Define the package resource directory
export const resourceDirectory = `${packageDirectory}/resources`;

// Determine the path for a package file
export const packagePath = (file) => `${packageDirectory}/${file}`;

// Determine the path for a workspace file
export const workspacePath = (file) => `${workspaceDirectory}/${file}`;

// Determine the path for a node module
export const modulePath = (file) => `${modulesDirectory}/${file}`;

// Determine the path for a node executable
export const executablePath = (file) => `${modulesDirectory}/.bin/${file}`;

// Determine the path for a resource file
export const resourcePath = (file) => `${resourceDirectory}/${file}`;

// Determine if a file exists at the workspace path
export const workspacePathExists = (file) => existsSync(workspacePath(file));

// Determine if a file exists at the resource path
export const resourcePathExists = (file) => existsSync(resourcePath(file));

// Determine if the current root workspace is this package (e.g. npm link installing)
export const isPackage = (workspaceDirectory == 'none');

// Symbolically link a resource file to the workspace
export const linkResource = (resource, target) => {
  
  // Check that there is a resource to be linked and there is no file at the target
  if (resourcePathExists(resource) && !workspacePathExists(target)) {

    // Symbolically link the resource
    symlinkSync(resourcePath(resource), workspacePath(target));
  }
}

// Copy a resource file to the workspace
export const copyResource = (resource, target) => {
  
  // Check that there is a resource to be copied and there is no file at the target
  if (resourcePathExists(resource) && !workspacePathExists(target)) {

    // Copy the file
    copyFileSync(resourcePath(resource), workspacePath(target));
  }
}