
// init game
var loader = require('./loader').load;

loader().then(onLoaded);

function onLoaded(players) {
  console.log(players[0]);

  var bar = players[0].path;
  run_cmd( "node ../players/" + bar, [], function(text) { console.log (text) });

}



// start game


function run_cmd(cmd, args, callBack ) {
    var spawn = require('child_process').spawn;
    var child = spawn(cmd, args);
    var resp = "";

    child.stdout.on('data', function (buffer) { resp += buffer.toString() });
    child.stdout.on('end', function() { callBack (resp) });
} // ()
