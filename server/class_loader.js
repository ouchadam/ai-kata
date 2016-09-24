module.exports = {
  load: load
}

var command = require('./command').run;

function load(path, board) {
  var classpath = path.replace('Main.class', '');
  return command("java",
    [ '-classpath', classpath, "Main", board.getState().toString() ]
  );
}
