var confLoader = require('./conf_loader').load;
var Game = require('./game');
var Player = require('./player');

confLoader().then(createGames).then(function(result) {
  result.forEach(each => {
    console.log(each.players[0].conf.name + ' vs ' + each.players[1].conf.name);

    var boardState = each.board.getState();
    console.log(boardState.slice(0, 3));
    console.log(boardState.slice(3, 6));
    console.log(boardState.slice(6, 9));

    if (each.type === "win") {
      console.log("Winner: " + each.winner.conf.name);
    }

    if (each.type === "draw") {
      console.log("It's a draw!");
    }

    console.log('');
  });
}).catch(console.log);

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
  var p1 = new Player(conf1, "O");
  var p2 = new Player(conf2, "X");
  return game.play(p1, p2);
}
