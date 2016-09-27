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

function MultiTicTacToe() {}

MultiTicTacToe.prototype.play = function() {
  return confLoader()
    .then(createGames);
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

module.exports = MultiTicTacToe;
