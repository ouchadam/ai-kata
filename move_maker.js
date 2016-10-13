var nodeLoader = require('./codeloaders/node_loader').load;
var javaLoader = require('./codeloaders/java_loader').load;
var swiftLoader = require('./codeloaders/swift_loader').load;
var kotlinLoader = require('./codeloaders/kotlin_loader').load;
var haskellLoader = require('./codeloaders/haskell_loader').load;

function getMove(loadedPlayer, board, playerKey) {
   return getLoader(loadedPlayer)(`${__dirname}/players/${loadedPlayer.path}`, board, playerKey);
}

function getLoader(player) {
  switch (player.language) {
    case 'javascript':
      return nodeLoader;
    case 'java':
      return javaLoader;
    case 'swift':
      return swiftLoader;
    case 'kotlin':
      return kotlinLoader;
    case 'haskell':
      return haskellLoader;
    default:
      throw err;
  }
}

module.exports.getMove = getMove;
