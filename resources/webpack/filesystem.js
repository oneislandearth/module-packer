!function(e,n){if("object"==typeof exports&&"object"==typeof module)module.exports=n();else if("function"==typeof define&&define.amd)define([],n);else{var t=n();for(var r in t)("object"==typeof exports?exports:e)[r]=t[r]}}(global,(function(){return(()=>{"use strict";var __webpack_modules__={487:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('// ESM COMPAT FLAG\n__webpack_require__.r(__webpack_exports__);\n\n// EXPORTS\n__webpack_require__.d(__webpack_exports__, {\n  "copyResource": () => (/* binding */ copyResource),\n  "createDirectory": () => (/* binding */ createDirectory),\n  "executablePath": () => (/* binding */ executablePath),\n  "findRootDirectory": () => (/* binding */ findRootDirectory),\n  "isPackage": () => (/* binding */ isPackage),\n  "linkResource": () => (/* binding */ linkResource),\n  "modulePath": () => (/* binding */ modulePath),\n  "modulesDirectory": () => (/* binding */ modulesDirectory),\n  "packageDirectory": () => (/* binding */ packageDirectory),\n  "packagePath": () => (/* binding */ packagePath),\n  "pathExists": () => (/* binding */ pathExists),\n  "readFile": () => (/* binding */ readFile),\n  "readJSON": () => (/* binding */ readJSON),\n  "removeDirectory": () => (/* binding */ removeDirectory),\n  "resourceDirectory": () => (/* binding */ resourceDirectory),\n  "resourcePath": () => (/* binding */ resourcePath),\n  "resourcePathExists": () => (/* binding */ resourcePathExists),\n  "temporaryDirectory": () => (/* binding */ temporaryDirectory),\n  "temporaryPath": () => (/* binding */ temporaryPath),\n  "workspaceDirectory": () => (/* binding */ workspaceDirectory),\n  "workspacePath": () => (/* binding */ workspacePath),\n  "workspacePathExists": () => (/* binding */ workspacePathExists),\n  "writeFile": () => (/* binding */ writeFile),\n  "writeJSON": () => (/* binding */ writeJSON)\n});\n\n;// CONCATENATED MODULE: external "fs"\nconst external_fs_namespaceObject = require("fs");;\n;// CONCATENATED MODULE: external "path"\nconst external_path_namespaceObject = require("path");;\n;// CONCATENATED MODULE: external "os"\nconst external_os_namespaceObject = require("os");;\n;// CONCATENATED MODULE: ./src/filesystem.js\n// Import the os, ilesystem and path modules\n\n\n\n\n// Define the package name\nconst packageID = \'@oneisland/module-packer\';\n\n// Read a file\nconst readFile = (path) => (0,external_fs_namespaceObject.readFileSync)(path, { encoding: \'utf-8\' });\n\n// Write a file\nconst writeFile = (path, content) => (0,external_fs_namespaceObject.writeFileSync)(path, content);\n\n// Read a file as JSON\nconst readJSON = (path) => JSON.parse(readFile(path));\n\n// Write a file as JSON\nconst writeJSON = (path, content) => writeFile(path, JSON.stringify(content, null, 2));\n\n// Search recursively for a package root\nconst findRootDirectory = (directory, namecheck) => {\n\n  // Return the module directory as \'none\' when there is no workspace\n  if (directory == \'/\') return \'none\';\n\n  // Check for a package.json file\n  if ((0,external_fs_namespaceObject.existsSync)((0,external_path_namespaceObject.resolve)(directory, \'package.json\'))) {\n\n    // Read the package.json file\n    const { name } = readJSON((0,external_path_namespaceObject.resolve)(directory, \'package.json\'));\n\n    // Check the name matches as expected and return the directory if so\n    if (namecheck && namecheck(name)) return directory;\n\n  // Check for a node modules folder\n  } else if ((0,external_fs_namespaceObject.existsSync)((0,external_path_namespaceObject.resolve)(directory, \'node_modules\'))) return directory;\n\n  // Recursively search up a directory\n  return findRootDirectory((0,external_path_namespaceObject.resolve)(directory, \'../\'), (namecheck) ? namecheck : null);\n};\n\n// Define the temporary directory\nconst temporaryDirectory = (0,external_fs_namespaceObject.mkdtempSync)((0,external_path_namespaceObject.join)((0,external_os_namespaceObject.tmpdir)(), \'omp-\'));\n\n// Define the workspace root directory\nconst workspaceDirectory = findRootDirectory(process.cwd(), (name) => name != packageID).replace(/node_modules.*/, \'\');\n\n// Define the package root directory\nconst packageDirectory = findRootDirectory(__dirname, (name) => name == packageID);\n\n// Define the node modules directory\nconst modulesDirectory = (0,external_path_namespaceObject.join)(packageDirectory.replace(/node_modules.*/, \'\'), \'/node_modules\');\n\n// Define the package resource directory\nconst resourceDirectory = (0,external_path_namespaceObject.join)(packageDirectory, \'/resources\');\n\n// Determine the path for a temporary file\nconst temporaryPath = (file) => (0,external_path_namespaceObject.join)(temporaryDirectory, \'/\', file);\n\n// Determine the path for a workspace file\nconst workspacePath = (file) => (0,external_path_namespaceObject.join)(workspaceDirectory, \'/\', file);\n\n// Determine the path for a package file\nconst packagePath = (file) => (0,external_path_namespaceObject.join)(packageDirectory, \'/\', file);\n\n// Determine the path for a node module\nconst modulePath = (file) => (0,external_path_namespaceObject.join)(modulesDirectory, \'/\', file);\n\n// Determine the path for a node executable\nconst executablePath = (file) => (0,external_path_namespaceObject.join)(modulesDirectory, \'/.bin/\', file);\n\n// Determine the path for a resource file\nconst resourcePath = (file) => (0,external_path_namespaceObject.join)(resourceDirectory, \'/\', file);\n\n// Determine if a path exists\nconst pathExists = (path) => (0,external_fs_namespaceObject.existsSync)(path);\n\n// Determine if a file exists at the workspace path\nconst workspacePathExists = (file) => pathExists(workspacePath(file));\n\n// Determine if a file exists at the resource path\nconst resourcePathExists = (file) => pathExists(resourcePath(file));\n\n// Determine if the current root workspace is this package (e.g. npm link installing)\nconst isPackage = (workspaceDirectory == \'none\');\n\n// Symbolically link a resource file to the workspace\nconst linkResource = (resource, target) => {\n  \n  // Check that there is a resource to be linked and there is no file at the target\n  if (resourcePathExists(resource) && !workspacePathExists(target)) {\n\n    // Attempt to symlink\n    try {\n\n      console.log(resourcePath(resource));\n\n      // Symbolically link the resource\n      (0,external_fs_namespaceObject.symlinkSync)(resourcePath(resource), workspacePath(target));\n    \n    // Ignore the error as the file exists\n    } catch (e) {\n\n      // Log the error\n      console.error(e);\n    }\n  }\n};\n\n// Copy a resource file to the workspace\nconst copyResource = (resource, target) => {\n  \n  // Check that there is a resource to be copied and there is no file at the target\n  if (resourcePathExists(resource) && !workspacePathExists(target)) {\n\n    // Copy the file\n    (0,external_fs_namespaceObject.copyFileSync)(resourcePath(resource), workspacePath(target));\n  }\n};\n\n// Create a directory\nconst createDirectory = (path) => {\n\n  // Check if the directory already exists and creat one if not\n  if (!pathExists(path)) (0,external_fs_namespaceObject.mkdirSync)(path); \n};\n\n// Remove a directory\nconst removeDirectory = (directory, recursive) => (0,external_fs_namespaceObject.rmdirSync)(directory, { recursive });\n\n// Remove the temporary directory on exit\nprocess.on(\'exit\', () => removeDirectory(temporaryDirectory, true));\n\n//# sourceURL=/media/data/OneIsland/Software/module-packer/src/filesystem.js%7Ce4201c28ccee487d3e583c373afd5705')}},__webpack_require__={d:(e,n)=>{for(var t in n)__webpack_require__.o(n,t)&&!__webpack_require__.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},o:(e,n)=>Object.prototype.hasOwnProperty.call(e,n),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},__webpack_exports__={};return __webpack_modules__[487](0,__webpack_exports__,__webpack_require__),__webpack_exports__})()}));