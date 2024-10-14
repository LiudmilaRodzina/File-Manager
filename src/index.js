import os from 'os';
import process from 'process';
import { up, cd, ls } from './commands/navigation.js';
import { cat, add, rn, cp, mv, rm } from './commands/fileOperations.js';
import { printCurrentDirectory, promptForInput, handleExit } from './utils.js';

const homeDir = os.homedir();
process.chdir(homeDir);

const username =
  process.argv.find((arg) => arg.startsWith('--username='))?.split('=')[1] ||
  'User';
console.log(`Welcome to the File Manager, ${username}!`);
printCurrentDirectory();
promptForInput();

const handleCommand = async (command, args) => {
  switch (command) {
    case 'up':
      up();
      break;
    case 'cd':
      cd(args.join(' '));
      break;
    case 'ls':
      await ls();
      break;
    case 'cat':
      if (args.length === 0) {
        console.log('Error: Missing file path');
      } else {
        await cat(args[0]);
      }
      break;
    case 'add':
      if (args.length === 0) {
        console.log('Error: Missing file name');
      } else {
        await add(args[0]);
      }
      break;
    case 'rn':
      if (args.length < 2) {
        console.log('Error: Missing old and new file names');
      } else {
        await rn(args[0], args[1]);
      }
      break;
    case 'cp':
      if (args.length < 2) {
        console.log('Error: Missing source and destination paths');
      } else {
        await cp(args[0], args[1]);
      }
      break;
    case 'mv':
      if (args.length < 2) {
        console.log('Error: Missing source and destination paths');
      } else {
        await mv(args[0], args[1]);
      }
      break;
    case 'rm':
      if (args.length === 0) {
        console.log('Error: Missing file path');
      } else {
        await rm(args[0]);
      }
      break;
    default:
      console.log('Invalid input');
  }
};

process.stdin.on('data', async (data) => {
  const input = data.toString().trim();
  const [command, ...args] = input.split(' ');

  if (input === '.exit') {
    handleExit(username);
  } else {
    await handleCommand(command, args);
    printCurrentDirectory();
    promptForInput();
  }
});

process.on('SIGINT', () => handleExit(username));
