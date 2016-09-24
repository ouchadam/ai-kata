const winningMoves = [
  [0, 1 ,2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 9],

  [0, 4, 8],
  [2, 4, 6]
];

function Board() {
    this.state = [0, 0, 0, 0, 0, 0, 0, 0, 0];
}

Board.prototype.getState = function() {
  return this.state;
}

Board.prototype.play = function(move) {
  console.log(move.position);
  var self = this;
  validateMove(move, self);
  playMove(move, self);
  return checkBoard(move.playerKey, self);
}

function validateMove(move, self) {
  var movePosition = move.position;
  if (movePosition > self.state.length || movePosition < 0) {
    fail(move, "Invalid position");
  }
  if (self.state[movePosition] != 0) {
    fail(move, "Tried to play index at already played position");
  }
}

function fail(move, reason) {
  throw {
    playerKey: move.playerKey,
    reason: reason
  };
}

function playMove(move, self) {
    self.state[move.position] = move.playerKey;
}

function checkBoard(playerKey, self) {
  for (var i = 0; i < winningMoves.length; i++) {
    if (hasWon(playerKey, winningMoves[i], self)) {
      return {
        type: "win",
        playerKey: playerKey
      }
    }
  }

  if (self.state.indexOf(0) != -1) {
    return {
        type: "continue"
    };
  } else {
    return {
        type: "draw"
    };
  }
}

function hasWon(playerKey, winningMove, self) {
  var success = 0;
  for (i = 0; i < winningMove.length; i++) {
    if (self.state[winningMove[i]] === playerKey) {
      success++;
    }
  }
  return success === winningMove.length;
}

module.exports = Board;
