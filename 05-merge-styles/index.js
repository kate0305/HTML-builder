const fs = require('fs');
const { readdir } = require('fs/promises');
const path = require('path');

const pathDir = path.join(__dirname, 'styles');
const pathOutput = path.join(__dirname, 'project-dist', 'bundle.css');
const output = fs.createWriteStream(pathOutput);

async function createBundle() {
  try {
    const files = await readdir(pathDir, {withFileTypes: true});
    for (const file of files) {
      const fileExtension = path.extname(file.name).slice(1);
      if (file.isFile() && fileExtension === 'css') {
        const pathInput = path.join(pathDir, file.name);
        const input = fs.createReadStream(pathInput);
        input.pipe(output);
      }
    }
  } catch (err) {
    console.log(err);
  }
}
createBundle();