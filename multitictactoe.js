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
  var matches = generateMatches(confs);
  var results = [];
  return matches.reduce(function(promise, game) {
    return promise.then(function(result) {
      if (result) {
        results.push(result);
      }
      return play(game.confOne, game.confTwo);
    });
  }, Promise.resolve())
  .then(result => {
      results.push(result);
      return Promise.resolve(results);
  });
}

function generateMatches(confs) {
  var matches = [];
  confs.forEach(outer => {
    confs.forEach(inner => {
      if (outer === inner) {
        return;
      }
      matches.push(game(outer, inner));
      matches.push(game(inner, outer));
    });
  });

  var seen = {};
  return matches.filter(each => {
    var key = JSON.stringify(each);
    return seen[key] ? false : (seen[key] = true, true);
  });
}

function game(confOne, confTwo) {
  return {
    confOne: confOne,
    confTwo: confTwo
  };
}

function play(conf1, conf2) {
  var game = new Game();
  var playerKeys = ["X", "0"];
  var p1 = new Player(conf1, playerKeys[0]);
  var p2 = new Player(conf2, playerKeys[1]);
  return game.play(p1, p2);
}

module.exports = MultiTicTacToe;
