import os from 'os';
import process from 'process';
import { up, cd, ls } from './commands/navigation.js';
import { printCurrentDirectory, handleExit } from './utils.js';

const homeDir = os.homedir();
process.chdir(homeDir);

const username =
  process.argv.find((arg) => arg.startsWith('--username='))?.split('=')[1] ||
  'User';

console.log(`Welcome to the File Manager, ${username}!`);
printCurrentDirectory();

process.stdin.on('data', async (data) => {
  const input = data.toString().trim();
  const [command, ...args] = input.split(' ');

  if (input === '.exit') {
    handleExit(username);
  } else if (command === 'up') {
    up();
  } else if (command === 'cd') {
    cd(args.join(' '));
  } else if (command === 'ls') {
    await ls();
  } else {
    console.log('Invalid input');
  }

  printCurrentDirectory();
});

process.on('SIGINT', () => handleExit(username));
