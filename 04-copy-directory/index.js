const { copyFile, mkdir, readdir, rm } = require('fs/promises');
const path = require('path');

const pathDir = path.join(__dirname, 'files');
const pathCopyDir = path.join(__dirname, 'files-copy');

async function copyDir(src, dest) {
  try {
    await rm(dest, {recursive: true, force: true});
    await mkdir(dest, {recursive: true});
    const files = await readdir(src, {withFileTypes: true});
    for (const file of files) {
      const pathFile = path.join(src, file.name);
      const pathCopyFile = path.join(dest, file.name);
      if (file.isFile()) {
        await copyFile(pathFile, pathCopyFile);
      } else {
        await copyDir(pathFile, pathCopyFile);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

copyDir(pathDir, pathCopyDir);