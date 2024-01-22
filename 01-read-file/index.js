const path = require('path');
const fs = require('fs');
const process = require('process');

const stream = fs.ReadStream(path.join(__dirname, 'text.txt'));

stream.on('readable', () => {
  const data = stream.read();
  process.stdout.write(data);
  stream.destroy();
});
