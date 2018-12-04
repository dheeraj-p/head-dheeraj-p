const {newFile} = require('./file.js');
const {call} = require('./head_utils.js');

const getLinesFromHead = function(file, numberOfLines = 10){
  let lines = file.getLines();
  return lines.slice(0, numberOfLines);
}

exports.getLinesFromHead = getLinesFromHead
