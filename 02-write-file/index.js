const fs = require('fs');
const path = require('path');
const readline = require('readline');
const process = require('process');

const stdin = process.stdin;
const stdout = process.stdout;

const pathFile = path.join(__dirname, 'text.txt');
const file = fs.createWriteStream(pathFile);  //Создание потока записи в текстовый файл

console.log('Hello! Enter your text:'); 

const rl = readline.createInterface({ input: stdin, output: stdout });

rl.on('line', (text) => {
  if (text.trim().toLowerCase() === 'exit') {
    console.log('Good luck learning Node.js!');
    process.exit();
  }
  file.write(`${text}\n`);
});

//остановка процесса нажатием CTRL + C
rl.on('SIGINT', () => {
  console.log('Good luck learning Node.js!');
  process.exit();
});
