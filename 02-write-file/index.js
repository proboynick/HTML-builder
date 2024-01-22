const path = require('path');
const fs = require('fs');
const process = require('process');
const readLine = require('readline');
const writeStream = fs.createWriteStream(path.join(__dirname, 'output.txt'));

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

process.on('SIGINT', () => {
  process.exit();
});
process.on('exit', () => {
  console.log('The programm will be closed. Good bye!');
});

rl.write('Enter your text(To exit press ctrl-c or enter "exit"):\n');
rl.on('line', (text) => {
  if (text.toLowerCase().includes('exit')) {
    process.exit();
  } else {
    writeStream.write(`${text}\n`);
  }
});
