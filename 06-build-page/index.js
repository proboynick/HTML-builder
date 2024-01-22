const fs = require('fs');
const path = require('path');

const assetsFoleder = path.join(__dirname, 'assets');
const stylesFolder = path.join(__dirname, 'styles');
const componentsFolder = path.join(__dirname, 'components');
const destFolder = path.join(__dirname, 'project-dist');

async function createBundleCSS() {
  const files = await fs.promises.readdir(stylesFolder, {
    withFileTypes: true,
  });
  const writeStream = fs.createWriteStream(path.join(destFolder, 'style.css'));
  for (const file of files) {
    if (file.isFile() && file.name.includes('css')) {
      const readStream = fs.ReadStream(path.join(stylesFolder, file.name));
      readStream.on('readable', () => {
        const data = readStream.read();
        writeStream.write(data);
        writeStream.write('\n');
        readStream.destroy();
      });
    }
  }
}

async function createBundleHTML() {
  const files = await fs.promises.readdir(componentsFolder, {
    withFileTypes: true,
  });
  let templateData = await fs.promises.readFile(
    path.join(__dirname, 'template.html'),
    { encoding: 'utf-8' },
  );
  for (const file of files) {
    if (file.isFile() && file.name.includes('html')) {
      const content = await fs.promises.readFile(
        path.join(componentsFolder, file.name),
        { encoding: 'utf-8' },
      );
      templateData = templateData.replace(
        `{{${file.name.slice(0, file.name.lastIndexOf('.'))}}}`,
        content,
      );
    }
  }
  await fs.promises.writeFile(
    path.join(destFolder, 'index.html'),
    templateData,
  );
}

async function copyAssets(from, to) {
  await fs.promises.mkdir(to, { recursive: true });
  const files = await fs.promises.readdir(from, { withFileTypes: true });
  for (const file of files) {
    if (file.isFile()) {
      await fs.promises.copyFile(
        path.join(from, file.name),
        path.join(to, file.name),
      );
    } else if (file.isDirectory) {
      const currentPathToCopy = path.join(destFolder, 'assets', file.name);
      const currentPathFrom = path.join(from, file.name);
      await fs.promises.mkdir(currentPathToCopy, { recursive: true });
      copyAssets(currentPathFrom, currentPathToCopy);
    }
  }
}

async function buildProject() {
  await fs.promises.mkdir(destFolder, { recursive: true });
  createBundleCSS();
  createBundleHTML();
  copyAssets(assetsFoleder, path.join(destFolder, 'assets'));
}

buildProject();
