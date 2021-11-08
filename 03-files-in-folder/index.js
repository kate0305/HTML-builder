const { readdir, stat } = require('fs/promises');
const path = require('path');

const pathDir = path.join(__dirname, 'secret-folder');

async function readFiles() {
  try {
    const files = await readdir(pathDir, {withFileTypes: true});
    for (const file of files) {
      const pathFile = path.join(__dirname, 'secret-folder', file.name);
      const fileName = path.basename(file.name, path.extname(file.name));
      const fileExtension = path.extname(file.name).slice(1);
      const fileSize = (await stat(pathFile)).size;
      if (file.isFile()) {
        console.log(`${fileName} - ${fileExtension} - ${fileSize}b`);
      }
    }
  } catch (err) {
    console.log(err);
  }
}
readFiles();