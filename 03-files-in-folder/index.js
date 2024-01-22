const fsPromises = require('fs').promises;
const path = require('path');

(async () => {
  try {
    const files = await fsPromises.readdir(
      path.join(__dirname, 'secret-folder'),
      { withFileTypes: true },
    );
    for (const file of files) {
      if (file.isFile()) {
        let fileName = file.name.split('.');
        let fileStats = await fsPromises.stat(
          path.join(__dirname, 'secret-folder', file.name),
        );
        console.log(
          `${fileName[0]} - ${fileName[1]} - ${fileStats.size / 1000}kb`,
        );
      }
    }
  } catch (err) {
    console.error(err);
  }
})();
