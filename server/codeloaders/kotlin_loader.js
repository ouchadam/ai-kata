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
      return command("kotlinc", [ flattenedFileNames, '-include-runtime', '-d', path + 'main.jar' ]).then(() => {
        return command("kotlin",
          [ '-classpath', path + 'main.jar', "MainKt", board.getState().toString(), playerKey ]
        );
      });
    });
}

function filterCompiled(filenames) {
  return Promise.resolve(filenames.filter(filename => {
      return filename.endsWith('.kt');
  }));
}

function flattenFileNames(path, filenames) {
  return filenames.map(name => {
    return path + name;
  }).join(' ');
}
