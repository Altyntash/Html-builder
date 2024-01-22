const fs = require('fs');
const path = require('path');

const pathFolder = path.join(__dirname, 'secret-folder');

const checkFolder = (pathFolder) => {
  try {
    fs.readdir(pathFolder, { withFileTypes: true }, (err, files) => {
      if (err) console.log(err.message);
      files.forEach((file) => {
        if (file.isDirectory())
          checkFolder(path.join(pathFolder, file.name));
        if (file.isFile()) {
          if (file.name != '.gitkeep') writeInFile(file);
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
};

const writeInFile = (file) => {
  try {
    const filePath = path.join(pathFolder, file.name);
    const fileExt = path.parse(filePath).ext.slice(1);
    const fileName = path.parse(filePath).name;
    fs.stat(filePath, (err, stats) => {
      if (err) console.log(err.message);
      console.log(
        `${fileName} - ${fileExt} - ${(stats.size / 1024).toFixed(3)} kb`,
      );
    });
  } catch (error) {
    console.error(error);
  }
};

checkFolder(pathFolder);
