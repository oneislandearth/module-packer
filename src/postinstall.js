// Import the filesystem module
import { copyResource, isPackage, workspacePathExists } from './filesystem';

// Import the package module
import { appendScripts, initPackage, clearDependencies } from './package';

// Handle the postinstall events
export const postinstall = () => {

  // Return if the workspace is the current package
  if (isPackage) return;

  // Copy the travis files
  copyResource('travis/.travis.yml', '.travis.yml');

  // Copy the git files
  copyResource('git/git-ignore', '.gitignore');
  copyResource('git/pre-commit', '.git/hooks/pre-commit');

  // Copy the npm files
  copyResource('npm/.npmignore', '.npmignore');

  // Check for a package.json file and append the scripts
  if (workspacePathExists('package.json')) {

    // Append the package scripts
    appendScripts();

  // Since the package.json doesn't exist, create one
  } else {

    // Create the package.json
    initPackage();

    // Clear the dependencies
    clearDependencies();
  }
}