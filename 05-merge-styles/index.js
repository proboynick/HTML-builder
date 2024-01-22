const fs = require('fs');
const path = require('path');
const srcFoleder = path.join(__dirname, 'styles');
const destFolder = path.join(__dirname, 'project-dist');
const writeStream = fs.createWriteStream(path.join(destFolder, 'bundle.css'));

(async () => {
  const files = await fs.promises.readdir(srcFoleder, { withFileTypes: true });
  for (const file of files) {
    if (file.isFile() && file.name.includes('css')) {
      const readStream = fs.ReadStream(path.join(srcFoleder, file.name));
      readStream.on('readable', () => {
        const data = readStream.read();
        writeStream.write(data);
        writeStream.write('\n');
        readStream.destroy();
      });
    }
  }
})();
