module.exports = {
  run: run
}

function run(cmd, args) {
  return new Promise(function(resolve, reject) {
    console.log("exec: " + cmd + ' with : ' + args);
    var spawn = require('child_process').spawn;
    var child = spawn(cmd, args);
    var result = "";

    child.stderr.on('data', (data) => {
      var buff = new Buffer(data);
      child.exitCode = 1;
      reject(buff);
    });

    child.stdout.on('data', function (buffer) { result += buffer.toString() });
    child.stdout.on('end', function() {
      child.exitCode = 1;
      resolve(parse(result));
    });
  });
}

function parse(input) {
  return input.trim();
}
