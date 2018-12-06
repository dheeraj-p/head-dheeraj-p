const {newFile} = require('./file.js');
const {parseInputs,
       validateInputs} = require('./io.js');

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

const createHeading = function(text){
  return "==> " + text + " <==";
}

const head = function({option, files, optionValue}){
  let operations = {'-n' : getLinesFromHead, '-c': getCharsFromHead};
  let headOperation = operations[option];
  let contentJoiners = {'-n': "\n\n", '-c': '\n'};
  if(files.length == 1){
    return headOperation(files[0], optionValue);
  }
  let headedContents = files.map(file => {
    let header = createHeading(file.name);
    let headedFileContents = headOperation(file, optionValue);
    return header + "\n" + headedFileContents;
  });
  return headedContents.join(contentJoiners[option]);
}

const runHead = function(inputs, reader){
  let headContents;
  let userInputs = parseInputs(inputs);
  let optionValueValidation = validateInputs(userInputs);

  if(!optionValueValidation.isValid){
    return optionValueValidation.error; 
  }

  let fileNames = userInputs.fileNames;
  let files = fileNames.map(fileName => newFile(fileName, read(reader, fileName, "utf-8")));
  let headData = {option: userInputs.option, optionValue: userInputs.optionValue, files};
  headContents = head(headData);
  return headContents;
}

exports.getLinesFromHead = getLinesFromHead;
exports.getCharsFromHead = getCharsFromHead;
exports.read = read;
exports.head = head;
exports.createHeading = createHeading;
exports.runHead = runHead;
