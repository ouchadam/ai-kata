var main = function() {
  var socket = io();

  socket.on('message', function(results) {
    results.forEach(result => {
      var titles = createResult(result);
      create(titles, result);
    });
  });
}

function createResult(gameResult) {
  var boardState = gameResult.board.state;
  var p1 = gameResult.players[0];
  var p2 = gameResult.players[1];

  var title = p1.conf.name + ' vs ' + p2.conf.name;
  var resultMessage;
  if (gameResult.type === "win") {
    resultMessage = "Winner: " + gameResult.winner.conf.name;
  }

  if (gameResult.type === "draw") {
    resultMessage = "It's a draw!";
  }

  return {
    title: title,
    message: resultMessage
  };
}

function create(titles, result) {
  var board = document.createElement("table");
  board.border = 1;
  var indicator = 1;
  for (var i = 0; i < 3; i += 1) {
    var row = document.createElement("tr");
    board.appendChild(row);
    for (var j = 0; j < 3; j += 1) {
      var cell = document.createElement("td");
      cell.width = cell.height = 50;
      cell.align = cell.valign = 'center';
      cell.indicator = indicator;
      var cellResult = result.board.state[j + (i * 3)];

      cell.appendChild(document.createTextNode(cellResult));
      row.appendChild(cell);
      indicator += indicator;
    }
  }

  var parent = document.getElementById("tictactoe");
  parent.appendChild(createP(titles.title));
  parent.appendChild(board);
  parent.appendChild(createP(titles.message));
}

function createP(text) {
  var p = document.createElement("p")
  p.innerHTML = text;
  return p;
}

main();
