var nodeLoader = require('./codeloaders/node_loader').load;
var javaLoader = require('./codeloaders/java_loader').load;
var swiftLoader = require('./codeloaders/swift_loader').load;

function getMove(loadedPlayer, board) {
   return getLoader(loadedPlayer)(`../players/${loadedPlayer.path}`, board);
}

function getLoader(player) {

  switch (player.language) {
    case 'javascript':
      return nodeLoader;
    case 'java':
      return javaLoader;
    case 'swift':
      return swiftLoader;
    default:
      throw err;
  }
}

module.exports.getMove = getMove;
