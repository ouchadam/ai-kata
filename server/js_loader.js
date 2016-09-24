module.exports = {
  load: load
}

var command = require('./command').run;

function load(path, board) {
  return command("node", [ path ]);
}
