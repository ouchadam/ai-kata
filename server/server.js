var confLoader = require('./conf_loader').load;
var Game = require('./game');
var Player = require('./player');

Array.prototype.shuffle = function() {
    var input = this;
    for (var i = input.length-1; i >=0; i--) {
        var randomIndex = Math.floor(Math.random()*(i+1));
        var itemAtIndex = input[randomIndex];
        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
}

confLoader()
  .then(createGames)
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

function createGames(confs) {
  var matches = [];
  for (var i = 0; i < confs.length; i++) {
    for (var j = i+1; j < confs.length; j++) {
      matches.push(play(confs[i], confs[j]));
    }
  }
  return Promise.all(matches);
}

function play(conf1, conf2) {
  var game = new Game();
  var playerKeys = ["0", "X"].shuffle();
  var p1 = new Player(conf1, playerKeys[0]);
  var p2 = new Player(conf2, playerKeys[1]);
  return game.play(p1, p2);
}
