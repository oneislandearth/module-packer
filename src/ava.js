// Import the required modules
import { executablePath } from './filesystem';
import { spawn } from './spawn';

// Extract the flags
const [ ,,, ...flags ] = process.argv;

// Define the path to the ava cli
const ava = executablePath('ava');

// Run the module tests using ava (with any flags)
export const test = () => spawn(ava, ...flags);