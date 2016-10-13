var MultiTicTacToe = require('./multitictactoe');
var multiTicTacToe = new MultiTicTacToe();

var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var cache = {};
var scoreboard = {};

app.use("/public", express.static(__dirname + '/public'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/score', function(req, res){
  res.sendFile(__dirname + '/public/score.html');
});

app.get('/admin', function(req, res){
  res.sendFile(__dirname + '/public/admin.html');
});

app.get('/start', function (req, res) {
  trigger();
  res.sendStatus(200);
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});

var notifyClient = function(data) {
  cache.boards = data;
  io.emit('message', data);
}

var notifyScore = function(data) {
  cache.score = data;
  io.emit('score', data);
}

function sortScores(scoreboard) {
  var sort = [];

  for (var key in scoreboard) {
    sort.push([key, scoreboard[key]]);
  }
  return sort.sort((a, b) => {
    return b[1] - a[1];
  });
}

io.sockets.on('connection', function (socket) {
  if (cache.boards) {
    notifyClient(cache.boards);
  }
  if (cache.score) {
    notifyScore(cache.score);
  }
});

// update player confs via github

function trigger() {
  multiTicTacToe.play()
    .then(handleResult)
    .catch(console.log);
}

function handleResult(results) {
  notifyClient(results);

  results.forEach(each => {

    if (each.type === 'win') {
      updateScore(each.winner.conf, 2);
    } else if (each.type === 'draw') {
      updateScore(each.players[0].conf, 1);
      updateScore(each.players[1].conf, 1);
    } else {
      updateScore(each.winner.conf, -1);
      // update loser
    }
    updateScore(each.players[0].conf, 0);
    updateScore(each.players[1].conf, 0);
  });
  notifyScore(sortScores(scoreboard));
}

function updateScore(conf, amount) {
  if (!scoreboard[conf.name]) {
    scoreboard[conf.name] = 0;
  }
  scoreboard[conf.name] = scoreboard[conf.name] + amount;
}

function printResult(gameResult) {
  var boardState = gameResult.board.getState();
  var p1 = gameResult.players[0];
  var p2 = gameResult.players[1];

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
