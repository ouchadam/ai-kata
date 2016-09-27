var MultiTicTacToe = require('./multitictactoe');
var multiTicTacToe = new MultiTicTacToe();

var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use("/public", express.static(__dirname + '/public'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});
app.get('/start', function (req, res) {
  trigger();
  res.send(200);
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});

var notifyClient = function(data) {
  io.emit('message', data);
}

io.sockets.on('start', function (socket) {
  // todo
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
    printResult(each);
  });
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
