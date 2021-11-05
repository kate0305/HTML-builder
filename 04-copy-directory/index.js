const { copyFile, mkdir, readdir, rm } = require('fs/promises');
const path = require('path');

const pathDir = path.join(__dirname, 'files');
const pathCopyDir = path.join(__dirname, 'files-copy');

async function copyDir() {
  try {
    await rm(pathCopyDir, {recursive: true, force: true});
    await mkdir(pathCopyDir, {recursive: true});
    const files = await readdir(pathDir);
    for (const file of files) {
      const pathFile = path.join(`${pathDir}`, `${file}`);
      const pathCopyFile = path.join(`${pathCopyDir}`, `${file}`);
      await copyFile(pathFile, pathCopyFile);
    }
  } catch (err) {
    console.log(err);
  }
}

copyDir();