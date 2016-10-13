const file = require('../file_helper');
const command = require('./command').run;

module.exports = {
  load: load
}

function load(path, board, playerKey) {
  return file.getFilesInDirectory(path)
    .then(filterCompiled)
    .then(filenames => {
      var flattenedFileNames = flattenFileNames(path, filenames);
      return command("ghc", [ flattenedFileNames, '-tmpdir', path ]).then(() => {
        return command(path + "main", [ board.getState().toString(), playerKey ]);
      });
    });
}

function filterCompiled(filenames) {
  return Promise.resolve(filenames.filter(filename => {
      return filename.endsWith('.hs');
  }));
}

function flattenFileNames(path, filenames) {
  return filenames.map(name => {
    return path + name;
  }).join(' ');
}
