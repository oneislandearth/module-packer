// Import the filesystem module
import { packageDirectory, resourceDirectory } from './filesystem';

console.log('root', packageDirectory);
console.log('resource', resourceDirectory);
console.log('directory', __dirname);

// Setup each of the hooks
// console.log(readdirSync(`${__dirname}/resources/git-hooks`))