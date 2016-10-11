var nodeLoader = require('./codeloaders/node_loader').load;
var javaLoader = require('./codeloaders/java_loader').load;

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
