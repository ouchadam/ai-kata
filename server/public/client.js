var main = function() {
  var socket = io();

  socket.on('message', function(msg) {
    // display
    console.log(message);
  });
}

main();
