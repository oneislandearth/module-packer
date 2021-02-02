// Import the package module
import { initPackage } from './package';

// Extract the name
const [ ,,, name, ...flags ] = process.argv;

// Handle the init events
export const init = () => initPackage(name, ...flags);