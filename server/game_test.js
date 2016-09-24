var Board = require('./board');
var board = new Board();

/*
[x, o ,x],
[x, o, o],
[o, x, x],
*/

var game = [
  x(0),
  o(1),
  x(2),
  o(4),
  x(3),
  o(5),
  x(7),
  o(6),
  x(8)
];

try {
  game.forEach(move => {
    console.log(play(move));
  });
} catch(err) {
  console.log(err);
}

function play(move) {
  return board.play(move);
}

function x(position) {
  return {
    playerKey: "X",
    position: position
  }
}

function o(position) {
  return {
    playerKey: "O",
    position: position
  }
}
