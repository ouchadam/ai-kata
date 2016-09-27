module.exports = {
  run: run
}

function run(cmd, args) {
  return new Promise(function(resolve, reject) {
    var spawn = require('child_process').spawn;
    var child = spawn(cmd, args);
    var result = "";

    child.stderr.on('data', (data) => {
      reject(data);
    });

    child.stdout.on('data', function (buffer) { result += buffer.toString() });
    child.stdout.on('end', function() {
      resolve(parse(result));
    });
  });
}

function parse(input) {
  return input.trim();
}
