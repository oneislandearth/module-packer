!function(e,n){if("object"==typeof exports&&"object"==typeof module)module.exports=n();else if("function"==typeof define&&define.amd)define([],n);else{var r=n();for(var t in r)("object"==typeof exports?exports:e)[t]=r[t]}}(global,(function(){return(()=>{"use strict";var __webpack_modules__={617:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('// ESM COMPAT FLAG\n__webpack_require__.r(__webpack_exports__);\n\n// EXPORTS\n__webpack_require__.d(__webpack_exports__, {\n  "copyResource": () => /* binding */ copyResource,\n  "executablePath": () => /* binding */ executablePath,\n  "findRootDirectory": () => /* binding */ findRootDirectory,\n  "isPackage": () => /* binding */ isPackage,\n  "linkResource": () => /* binding */ linkResource,\n  "modulePath": () => /* binding */ modulePath,\n  "modulesDirectory": () => /* binding */ modulesDirectory,\n  "packageDirectory": () => /* binding */ packageDirectory,\n  "packagePath": () => /* binding */ packagePath,\n  "readFile": () => /* binding */ readFile,\n  "readJSON": () => /* binding */ readJSON,\n  "resourceDirectory": () => /* binding */ resourceDirectory,\n  "resourcePath": () => /* binding */ resourcePath,\n  "resourcePathExists": () => /* binding */ resourcePathExists,\n  "workspaceDirectory": () => /* binding */ workspaceDirectory,\n  "workspacePath": () => /* binding */ workspacePath,\n  "workspacePathExists": () => /* binding */ workspacePathExists,\n  "writeFile": () => /* binding */ writeFile,\n  "writeJSON": () => /* binding */ writeJSON\n});\n\n;// CONCATENATED MODULE: external "fs"\nconst external_fs_namespaceObject = require("fs");;\n;// CONCATENATED MODULE: external "path"\nconst external_path_namespaceObject = require("path");;\n;// CONCATENATED MODULE: ./src/filesystem.js\n// Import the filesystem and path modules\n\n\n\n// Define the package name\nconst packageID = \'@oneisland/module-packer\';\n\n// Read a file\nconst readFile = (path) => (0,external_fs_namespaceObject.readFileSync)(path, { encoding: \'utf-8\' });\n\n// Write a file\nconst writeFile = (path, content) => (0,external_fs_namespaceObject.writeFileSync)(path, content);\n\n// Read a file as JSON\nconst readJSON = (path) => JSON.parse(readFile(path));\n\n// Write a file as JSON\nconst writeJSON = (path, content) => writeFile(path, JSON.stringify(content, null, 2));\n\n// Search recursively for a package root\nconst findRootDirectory = (directory, namecheck) => {\n\n  // Return the module directory as \'none\' when there is no workspace\n  if (directory == \'/\') return \'none\';\n\n  // Check for a package.json file\n  if ((0,external_fs_namespaceObject.existsSync)((0,external_path_namespaceObject.resolve)(directory, \'package.json\'))) {\n\n    // Read the package.json file\n    const { name } = readJSON((0,external_path_namespaceObject.resolve)(directory, \'package.json\'));\n\n    // Check the name matches as expected and return the directory if so\n    if (namecheck && namecheck(name)) return directory;\n\n  // Check for a node modules folder\n  } else if ((0,external_fs_namespaceObject.existsSync)((0,external_path_namespaceObject.resolve)(directory, \'node_modules\'))) return directory;\n\n  // Recursively search up a directory\n  return findRootDirectory((0,external_path_namespaceObject.resolve)(directory, \'../\'), (namecheck) ? namecheck : null);\n}\n\n// Define the workspace root directory\nconst workspaceDirectory = findRootDirectory(process.cwd(), (name) => name != packageID).replace(/node_modules.*/, \'\');\n\n// Define the package root directory\nconst packageDirectory = findRootDirectory(__dirname, (name) => name == packageID);\n\n// Define the node modules directory\nconst modulesDirectory = `${packageDirectory.replace(/node_modules.*/, \'\')}/node_modules`;\n\n// Define the package resource directory\nconst resourceDirectory = `${packageDirectory}/resources`;\n\n// Determine the path for a package file\nconst packagePath = (file) => `${packageDirectory}/${file}`;\n\n// Determine the path for a workspace file\nconst workspacePath = (file) => `${workspaceDirectory}/${file}`;\n\n// Determine the path for a node module\nconst modulePath = (file) => `${modulesDirectory}/${file}`;\n\n// Determine the path for a node executable\nconst executablePath = (file) => `${modulesDirectory}/.bin/${file}`;\n\n// Determine the path for a resource file\nconst resourcePath = (file) => `${resourceDirectory}/${file}`;\n\n// Determine if a file exists at the workspace path\nconst workspacePathExists = (file) => (0,external_fs_namespaceObject.existsSync)(workspacePath(file));\n\n// Determine if a file exists at the resource path\nconst resourcePathExists = (file) => (0,external_fs_namespaceObject.existsSync)(resourcePath(file));\n\n// Determine if the current root workspace is this package (e.g. npm link installing)\nconst isPackage = (workspaceDirectory == \'none\');\n\n// Symbolically link a resource file to the workspace\nconst linkResource = (resource, target) => {\n  \n  // Check that there is a resource to be linked and there is no file at the target\n  if (resourcePathExists(resource) && !workspacePathExists(target)) {\n\n    // Symbolically link the resource\n    (0,external_fs_namespaceObject.symlinkSync)(resourcePath(resource), workspacePath(target));\n  }\n}\n\n// Copy a resource file to the workspace\nconst copyResource = (resource, target) => {\n  \n  // Check that there is a resource to be copied and there is no file at the target\n  if (resourcePathExists(resource) && !workspacePathExists(target)) {\n\n    // Copy the file\n    (0,external_fs_namespaceObject.copyFileSync)(resourcePath(resource), workspacePath(target));\n  }\n}\n\n//# sourceURL=/media/data/OneIsland/Software/module-packer/src/filesystem.js%7C51f566cc85759d7fa5afa5e6aaf9f911')}},__webpack_module_cache__={};function __webpack_require__(e){if(__webpack_module_cache__[e])return __webpack_module_cache__[e].exports;var n=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](n,n.exports,__webpack_require__),n.exports}return __webpack_require__.d=(e,n)=>{for(var r in n)__webpack_require__.o(n,r)&&!__webpack_require__.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},__webpack_require__.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},__webpack_require__(617)})()}));