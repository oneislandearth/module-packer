// Import the filesystem module
import { symlinkSync } from 'fs'

// Define the package root directory
export const [, packageDirectory] = /(node_modules\/@oneisland\/module-packer)/.exec(__dirname);

// Define the project root directory
export const [, projectDirectory] = /(.*)(?:node_modules\/@oneisland\/module-packer)/.exec(__dirname);

// Define the package resource directory
export const resourceDirectory = `${packageDirectory}/resources`;

// Calculate the path for a resource
export const resourcePath = (path) => `${resourceDirectory}/${path}`;

// Create a symbolic link
export const linkResourceSymbolic = (resource, target) => symlinkSync(`${packageDirectory}/resources/${resource}`, target);