
// init game
var loader = require('./loader').load;

loader().then(onLoaded);

function onLoaded(players) {
  console.log(players);


  players.forEach

  run_cmd( "hostname", [], function(text) { console.log (text) });
}



// start game


function run_cmd(cmd, args, callBack ) {
    var spawn = require('child_process').spawn;
    var child = spawn(cmd, args);
    var resp = "";

    child.stdout.on('data', function (buffer) { resp += buffer.toString() });
    child.stdout.on('end', function() { callBack (resp) });
} // ()
