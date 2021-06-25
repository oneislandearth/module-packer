// Import the path module
const { join } = require('path');

// Fetch the context root from here
const contextRoot = join(__dirname, '../../');

// Generate the full module filename
module.exports.moduleFilename = (info, pathResolver) => {

  const path = info.absoluteResourcePath;

  // Strip the filepath without the hash from the identifier
  const filepath = (path.indexOf('|') > -1) ? path.substring(0, path.indexOf('|')) : path;

  // console.log(filepath, JSON.stringify(info, null, 2));

  // Define the path resolver if unset
  if (!pathResolver) pathResolver = (filepath) => join(contextRoot, filepath);

  // Return the resolved path
  return pathResolver(filepath);
};