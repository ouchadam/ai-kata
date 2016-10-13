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
      return command("javac", [ flattenedFileNames ]).then(() => {
        return command("java",
          [ '-classpath', path, "Main", board.getState().toString(), playerKey ]
        );
      });
  });
}

function filterCompiled(filenames) {
  return Promise.resolve(filenames.filter(filename => {
      return filename.endsWith('.java');
  }));
}

function flattenFileNames(path, filenames) {
  return filenames.map(name => {
    return path + name;
  }).join(' ');
}
