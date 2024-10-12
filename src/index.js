import process from 'process';

const username =
  process.argv.find((arg) => arg.startsWith('--username='))?.split('=')[1] ||
  'User';

const welcomeMessage = `Welcome to the File Manager, ${username}!`;
const exitMessage = `Thank you for using File Manager, ${username}, goodbye!`;

console.log(welcomeMessage);

process.stdin.on('data', (data) => {
  const input = data.toString().trim();
  if (input === '.exit') {
    console.log(exitMessage);
    process.exit(0);
  }
});

process.on('SIGINT', () => {
  console.log(exitMessage);
  process.exit(0);
});
