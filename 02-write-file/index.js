const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
const readline = require('readline');

const filePath = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(filePath);

stdout.write('Hello! Input some text\n');
const readline = readline.createInterface({ input: stdin });
const exit = () => {
  stdout.write('Good luck!');
  process.exit();
};
readline.on('SIGINT', () => exit());
readline.on('line', (text) => {
  if (text.toLowerCase().trim() === 'exit') {
    exit();
  }
  writeStream.write(`${text}\n`);
});
