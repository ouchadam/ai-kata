module.exports = {
  load: load
}

var command = require('./command').run;

function load(path, board, playerKey) {
  return command("node", [ path, board.getState().toString(), playerKey ]);
}
