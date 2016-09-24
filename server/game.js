
var playersLoader = require('./players_loader').load;
var getMove = require('./move_maker').getMove;

var Board = require('./board');

playersLoader().then(onLoaded).then(function(result) {
  console.log(result);
}).catch(console.log);

function onLoaded(loadedPlayers) {
  var p1 = createPlayer(loadedPlayers[0], "O");
  var p2 = createPlayer(loadedPlayers[0], "X");
  return playGame(p1, p2);
}

function playGame(playerOne, playerTwo, board) {
  var players = [playerOne, playerTwo];
  var board = new Board();
  return loop(board, players, 0);
}

function loop(board, players, currentPlayer) {
  return players[currentPlayer].makeMove(board)
    .then(board.play.bind(board))
    .then(function(result) {
      return handleResult(result, board, players, currentPlayer);
    });
};

function handleResult(result, board, players, currentPlayer) {
  if (result.type === "continue") {
    return loop(board, players, getNextPlayer(currentPlayer, players.length));
  }
  if (result.type === "win") {
    return Promise.resolve(players[currentPlayer]);
  }
  if (result.type === "draw") {
    return Promise.resolve("draw");
  }
}

function getNextPlayer(currentPlayer, playerCount) {
  if (currentPlayer >= playerCount - 1) {
    return 0;
  } else {
    return currentPlayer + 1;
  }
}

function createPlayer(loadedPlayer, playerKey) {
  return {
    makeMove: function(board) {
      return getMove(loadedPlayer, board)
      .then(function(movePosition) {
        return Promise.resolve( {
          position: movePosition,
          playerKey: playerKey
        });
      });
    },
    name: loadedPlayer.name
  };
}
