const {newFile} = require('./file.js');
const {call} = require('./head_utils.js');

const getLinesFromHead = function(file, numberOfLines = 10){
  let lines = file.getLines();
  return lines.slice(0, numberOfLines);
}

const getCharsFromHead = function(file, numberOfCharacters){
  let characters = file.contents.split('');
  return characters.slice(0, numberOfCharacters);
}

exports.getLinesFromHead = getLinesFromHead
exports.getCharsFromHead = getCharsFromHead
