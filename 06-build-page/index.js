const fs = require('fs');
const { copyFile, mkdir, readdir, readFile, rm, writeFile } = require('fs/promises');
const path = require('path');

const pathComponents = path.join(__dirname, 'components');
const pathHTML = path.join(__dirname, 'template.html');
const pathStyles = path.join(__dirname, 'styles');
const pathAssets = path.join(__dirname, 'assets');

const pathProjectDir = path.join(__dirname, 'project-dist');
const pathProjectHTML = path.join(pathProjectDir, 'index.html');
const pathProjectStyle = path.join(pathProjectDir, 'style.css');
const pathProjectAssets = path.join(pathProjectDir, 'assets');

async function createProjectDir() {
  try {
    await mkdir(pathProjectDir, {recursive: true});
  } catch (err) {
    console.log(err);
  }
}

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

async function createFileHTML() {
  try {
    let template = await readFile(pathHTML, {encoding: 'utf-8'});
    const components = await readdir(pathComponents, {withFileTypes: true});
    for (let component of components) {
      const fileExtension = path.extname(component.name).slice(1);
      const pathComponent = path.join(pathComponents, component.name);
      const templateName = path.basename(component.name, path.extname(component.name));
      if (component.isFile() && fileExtension === 'html') {
        component = await readFile(pathComponent);
        template = template.replace(new RegExp(`{{${templateName}}}`, 'g'), component);
      }
    }
    await writeFile(pathProjectHTML, template);
  } catch (err) {
    console.log(err);
  }
}

async function createFileStyle() {
  try {
    const files = await readdir(pathStyles, {withFileTypes: true});
    const output = fs.createWriteStream(pathProjectStyle);
    for (const file of files) {
      const fileExtension = path.extname(file.name).slice(1);
      if (file.isFile() && fileExtension === 'css') {
        const pathInput = path.join(pathStyles, file.name);
        const input = fs.createReadStream(pathInput);
        input.pipe(output);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

async function start() {
  await createProjectDir();
  copyDir(pathAssets, pathProjectAssets);
  createFileHTML();
  createFileStyle();
}

start();
