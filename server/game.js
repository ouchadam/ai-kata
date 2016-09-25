var Board = require('./board');

function Game() {}

Game.prototype.play = function(playerOne, playerTwo) {
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
    var winner = players[currentPlayer];
    return Promise.resolve(createResult('win', board, players, winner));
  }
  if (result.type === "draw") {
    return Promise.resolve(createResult('draw', board, players));
  }
}

function createResult(type, board, players, winner) {
  return {
    type: type,
    board: board,
    players: players,
    winner: winner
  };
}

function getNextPlayer(currentPlayer, playerCount) {
  if (currentPlayer >= playerCount - 1) {
    return 0;
  } else {
    return currentPlayer + 1;
  }
}

module.exports = Game;
