const file = require('./file_helper');
const DIRECTORY = `${__dirname}/players/`;

module.exports = {
  load: load
}

function load() {
  return file.getFilesInDirectory(DIRECTORY)
    .then(onlyConf)
    .then(loadObjects);
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
    return file.readFile(DIRECTORY, filename);
  });
  return Promise.all(mapped);
}
