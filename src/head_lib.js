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

const head = function({option, files, optionValue}){
  let operations = {'-n' : getLinesFromHead, '-c': getCharsFromHead};
  let headOperation = operations[option];
  let contentJoiners = {'-n': "\n\n", '-c': '\n'};
  if(files.length == 1){
    return headOperation(files[0], optionValue);
  }
  let headedContents = files.map(file => {
    let header = "==> " + file.name + " <==";
    let headedFileContents = headOperation(file, optionValue);
    return header + "\n" + headedFileContents;
  });
  return headedContents.join(contentJoiners[option]);
}

exports.getLinesFromHead = getLinesFromHead;
exports.getCharsFromHead = getCharsFromHead;
exports.read = read;
exports.head = head;
