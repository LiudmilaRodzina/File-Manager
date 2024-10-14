import { createReadStream, createWriteStream } from 'fs';
import { promises as fsPromises } from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';

const pipe = promisify(pipeline);
const { writeFile, rename, unlink } = fsPromises;

export const cat = async (filePath) => {
  try {
    await fsPromises.access(filePath);
    const readStream = createReadStream(filePath);

    return new Promise((resolve, reject) => {
      let data = '';
      readStream.on('data', (chunk) => {
        data += chunk;
      });

      readStream.on('end', () => {
        console.log(data);
        resolve();
      });

      readStream.on('error', (error) => {
        reject(new Error(`Operation failed: ${error.message}`));
      });
    });
  } catch (error) {
    console.error('Operation failed:', error.message);
  }
};

export const add = async (fileName) => {
  try {
    await writeFile(fileName, '', { flag: 'wx' });
    console.log(`File "${fileName}" created successfully`);
  } catch (error) {
    console.error('Operation failed:', error.message);
  }
};

export const rn = async (oldPath, newPath) => {
  try {
    await rename(oldPath, newPath);
    console.log(`File renamed from "${oldPath}" to "${newPath}"`);
  } catch (error) {
    console.error('Operation failed:', error.message);
  }
};

export const cp = async (sourcePath, destinationPath) => {
  try {
    const readStream = createReadStream(sourcePath);
    const writeStream = createWriteStream(destinationPath);
    await pipe(readStream, writeStream);
    console.log(`File copied from "${sourcePath}" to "${destinationPath}"`);
  } catch (error) {
    console.error('Operation failed:', error.message);
  }
};

export const mv = async (sourcePath, destinationPath) => {
  try {
    await cp(sourcePath, destinationPath);
    await unlink(sourcePath);
    console.log(`File moved from "${sourcePath}" to "${destinationPath}"`);
  } catch (error) {
    console.error('Operation failed:', error.message);
  }
};

export const rm = async (filePath) => {
  try {
    await unlink(filePath);
    console.log(`File "${filePath}" deleted successfully`);
  } catch (error) {
    console.error('Operation failed:', error.message);
  }
};
