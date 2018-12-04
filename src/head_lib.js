const {newFile} = require('./file.js');

const getLinesFromHead = function(file, numberOfLines = 10){
  let lines = file.getLines();
  return lines.slice(0, numberOfLines).join("\n");
}

const getCharsFromHead = function(file, numberOfCharacters){
  return file.contents.substr(0, numberOfCharacters);
}

const read = function(reader, filepath, encoding){
  return reader(filepath, encoding);
}

exports.getLinesFromHead = getLinesFromHead;
exports.getCharsFromHead = getCharsFromHead;
exports.read = read;
