var MultiTicTacToe = require('./multitictactoe');
var multiTicTacToe = new MultiTicTacToe();

multiTicTacToe.play()
  .then(handleResult)
  .catch(console.log);

function handleResult(result) {
  result.forEach(each => {
    printResult(each);
  });
}

function printResult(gameResult) {
  var boardState = gameResult.board.getState();
  var p1 = gameResult.players[0];
  var p2 = gameResult.players[0];

  console.log(p1.conf.name + ' vs ' + p2.conf.name);
  console.log(boardState.slice(0, 3));
  console.log(boardState.slice(3, 6));
  console.log(boardState.slice(6, 9));

  if (gameResult.type === "win") {
    console.log("Winner: " + gameResult.winner.conf.name);
  }

  if (gameResult.type === "draw") {
    console.log("It's a draw!");
  }
  console.log('');
}
