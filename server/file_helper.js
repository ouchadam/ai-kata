const fs = require('fs');

module.exports = {
  getFilesInDirectory: getFilesInDirectory,
  readFile: readFile
}

function getFilesInDirectory(path) {
  return new Promise(function(resolve, reject) {
    fs.readdir(path, function(err, filenames) {
      if (err) {
        reject(err);
      } else {
        resolve(filenames);
      }
    });
  });
}

function readFile(path, filename) {
  return new Promise(function(resolve, reject) {
    fs.readFile(path + '/' + filename, 'utf-8', function(err, content) {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(content));
      }
    });
  });
}
