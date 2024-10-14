import { readdir } from 'fs/promises';
import path from 'path';

export const up = () => {
  const currentDir = process.cwd();
  const parentDir = path.dirname(currentDir);
  if (currentDir !== parentDir) {
    process.chdir(parentDir);
  }
};

export const cd = (targetDir) => {
  try {
    const fullPath = path.isAbsolute(targetDir)
      ? targetDir
      : path.resolve(process.cwd(), targetDir);
    process.chdir(fullPath);
  } catch (error) {
    console.error('Operation failed');
  }
};

export const ls = async () => {
  try {
    const listObject = await readdir(process.cwd(), { withFileTypes: true });

    const directories = listObject
      .filter((object) => object.isDirectory())
      .sort((a, b) => a.name.localeCompare(b.name));
    const files = listObject
      .filter((object) => object.isFile())
      .sort((a, b) => a.name.localeCompare(b.name));

    const objects = [...directories, ...files];

    console.table(
      objects.map((object) => ({
        Name: object.name,
        Type: object.isFile() ? 'file' : 'directory',
      }))
    );
  } catch (error) {
    console.error('Operation failed');
  }
};
