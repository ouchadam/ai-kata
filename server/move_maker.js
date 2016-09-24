var nodeLoader = require('./js_loader').load;
var javaLoader = require('./class_loader').load;

function getMove(loadedPlayer, board) {
   return getLoader(loadedPlayer)(`../players/${loadedPlayer.path}`, board);
}

function getLoader(player) {
  if (player.path.endsWith('.js')) {
    return nodeLoader;
  }
  if (player.path.endsWith(".class")) {
    return javaLoader;
  }
  throw err;
}

module.exports.getMove = getMove;
