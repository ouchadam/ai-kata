const fs = require('fs');
const DIRECTORY = '../players/';

module.exports = {
  load: load
}

function load() {
  return getFileNames()
    .then(onlyConf)
    .then(loadObjects);
}

function getFileNames(path) {
  return new Promise(function(resolve, reject) {
    fs.readdir(DIRECTORY, function(err, filenames) {
      if (err) {
        reject(err);
      } else {
        resolve(filenames);
      }
    });
  });
}

function onlyConf(filenames) {
  return new Promise(function(resolve, reject) {
    var confFilenames = filenames.filter(name => {
      return name.endsWith('.conf');
    });
    resolve(confFilenames);
  });
}

function loadObjects(confFilenames) {
  var mapped = confFilenames.map(function(filename) {
    return loadPlayer(filename);
  });
  return Promise.all(mapped);
}

function loadPlayer(filename) {
  return new Promise(function(resolve, reject) {
    fs.readFile(DIRECTORY + '/'+ filename, 'utf-8', function(err, content) {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(content));
      }
    });
  });
}
