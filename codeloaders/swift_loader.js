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

      return Promise.resolve(function() {
        return command("swiftc", [ flattenedFileNames ]).then(() => {
          return command("rm", [path + "main"]).then(() => {
            return command("mv", [ './main', path]).then(() => {
              return command(path + "main", [ board.getState().toString(), playerKey ]);
            });
          });
        });
      });
    });
}

function filterCompiled(filenames) {
  return Promise.resolve(filenames.filter(filename => {
      return filename.endsWith('.swift');
  }));
}

function flattenFileNames(path, filenames) {
  return filenames.map(name => {
    return path + name;
  }).join(' ');
}