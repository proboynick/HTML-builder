const fsPromises = require('fs').promises;
const path = require('path');

const srcFoleder = path.join(__dirname, 'files');
const destFolder = path.join(__dirname, 'files-copy');

(async () => {
  await fsPromises.rm(destFolder, { recursive: true, force: true });
  await fsPromises.mkdir(destFolder, { recursive: true });
  const files = await fsPromises.readdir(srcFoleder, { withFileTypes: true });
  for (const file of files) {
    if (file.isFile()) {
      await fsPromises.copyFile(
        path.join(srcFoleder, file.name),
        path.join(destFolder, file.name),
      );
    }
  }
})();
