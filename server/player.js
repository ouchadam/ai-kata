var getMove = require('./move_maker').getMove;

function Player(conf, playerKey) {
  this.conf = conf;
  this.playerKey = playerKey;
}

Player.prototype.makeMove = function(board) {
  var self = this;
  return getMove(this.conf, board)
    .then(function(movePosition) {
      return Promise.resolve( {
        position: movePosition,
        playerKey: self.playerKey
      });
  });
}

Player.prototype.getName = function() {
  return this.conf.name;
}

module.exports = Player;