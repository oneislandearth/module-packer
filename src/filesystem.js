// Import the filesystem and path modules
import { existsSync, symlinkSync, readFileSync } from 'fs';
import { resolve } from 'path';

// Read a file as JSON
const readJSON = (path) =>  JSON.parse(readFileSync(path, { encoding: 'utf-8' }));

// Search recursively for a package root
const findPackage = (directory) => {

  // Check for a path and return it if found
  if (existsSync(resolve(directory, 'package.json'))) return {
    name: readJSON(resolve(directory, 'package.json')).name,
    path: directory
  }

  // Search one directory higher
  return findPackage(resolve(directory, '../'))
}

// Define the package root directory
export const packageDirectory = findPackage(__dirname).path;

// Define the project root directory
export const projectDirectory = findPackage(process.cwd()).path;

// // Define the package root directory
// export const [, packageDirectory] = /(node_modules\/@oneisland\/module-packer)/.exec(__dirname);

// // Define the project root directory
// export const [, projectDirectory] = /(.*)(?:node_modules\/@oneisland\/module-packer)/.exec(__dirname);

// Define the package resource directory
export const resourceDirectory = `${packageDirectory}/resources`;

// Calculate the path for a resource
export const resourcePath = (path) => `${resourceDirectory}/${path}`;

// Create a symbolic link
export const linkResourceSymbolic = (resource, target) => symlinkSync(`${packageDirectory}/resources/${resource}`, target);