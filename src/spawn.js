// Import the spawn process
import cp from 'child_process';

// Define the spawn module
export const spawn = (script, ...flags) => cp.spawn(script, flags, { stdio: 'inherit' }).on('error', (error) => console.log(error));
