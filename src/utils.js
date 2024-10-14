export const printCurrentDirectory = () => {
  console.log(`You are currently in ${process.cwd()}`);
};

export const handleExit = (username) => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
};
