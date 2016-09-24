var confLoader = require('./conf_loader').load;
var Board = require('./board');
var Player = require('./player');

confLoader().then(onLoaded).then(function(result) {
  var boardState = result.board.getState();
  console.log(boardState.slice(0, 3));
  console.log(boardState.slice(3, 6));
  console.log(boardState.slice(6, 9));

  if (result.type === "win") {
    console.log("Winner: " + result.winner.conf.name);
  }

  if (result.type === "draw") {
    console.log("It's a draw!");
  }

}).catch(console.log);

function onLoaded(confs) {
  var p1 = new Player(confs[0], "O");
  var p2 = new Player(confs[1], "X");
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
