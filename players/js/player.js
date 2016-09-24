var board = process.argv[2].split(',');

var filterPlayed = (each) => each.item === '0';
var mapToIndex = function(each, index) { return { index: index, item: each } };

var available = board.map(mapToIndex).filter(filterPlayed);
var randomPosition = Math.floor((Math.random() * available.length));

console.log(available[randomPosition].index);
