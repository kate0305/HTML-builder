const fs = require('fs');
const path = require('path');
const readline = require('readline');
const process = require('process');

const stdin = process.stdin;

const pathFile = path.join(__dirname, 'text.txt');
const output = fs.createWriteStream(pathFile);  //Создание потока записи в текстовый файл

console.log('Hello! Enter your text:'); 

const rl = readline.createInterface({ input: stdin, output });

rl.on('line', (text) => {
  if (text.trim().toLowerCase() === 'exit') {
    console.log('\nGood luck learning Node.js!');
    process.exit();
  }
  output.write(`${text}\n`);
});

//остановка процесса нажатием CTRL + C
process.on('SIGINT', () => {
  console.log('\nGood luck learning Node.js!');
  process.exit();
});
