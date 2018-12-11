const { newFile } = require("./file.js");
const { parseInputs, validateInputs, validateOffset } = require("./io.js");

const getLinesFromHead = function(file, numberOfLines = 10) {
  let lines = file.getLines();
  return lines.slice(0, numberOfLines).join("\n");
};

const getCharsFromHead = function(file, numberOfCharacters) {
  return file.contents.substr(0, numberOfCharacters);
};

const getLinesFromTail = function(file, numberOfLines = 10) {
  let lines = file.getLines();
  const isFileEndingWithNewLine = lines[lines.length - 1] == "";
  if (isFileEndingWithNewLine) {
    lines.pop();
  }
  let tailedLines = lines.slice(-numberOfLines);
  return tailedLines.join("\n");
};

const getCharsFromTail = function(file, numberOfCharacters) {
  return file.contents.substr(-numberOfCharacters);
};

const read = function(reader, filepath, encoding) {
  return reader(filepath, encoding);
};

const createHeading = function(text) {
  return "==> " + text + " <==";
};

const newFileNotFoundMsg = function(commandName, fileName) {
  return `${commandName}: ${fileName}: No such file or directory`;
};

const runCommand = function(commandData, messageProvider, commandOperations) {
  const { option, files, optionValue } = commandData;
  let commandOperation = commandOperations[option];
  let contentJoiners = { "-n": "\n\n", "-c": "\n" };
  let resultedContents = files.map(file => {
    if (!file.doesExists) {
      return messageProvider(file.name);
    }
    if (files.length == 1) {
      return commandOperation(files[0], optionValue);
    }
    let header = createHeading(file.name);
    let resultedFileContents = commandOperation(file, optionValue);
    return header + "\n" + resultedFileContents;
  });
  return resultedContents.join(contentJoiners[option]);
};

const head = function(commandData) {
  const headOperations = { "-n": getLinesFromHead, "-c": getCharsFromHead };
  const fileNotFoundProvider = newFileNotFoundMsg.bind(null, "head");
  return runCommand(commandData, fileNotFoundProvider, headOperations);
};

const tail = function(commandData) {
  const headOperations = { "-n": getLinesFromTail, "-c": getCharsFromTail };
  const fileNotFoundProvider = newFileNotFoundMsg.bind(null, "tail");
  return runCommand(commandData, fileNotFoundProvider, headOperations);
};

const createCommandData = function(userInputs, reader, doesFileExists) {
  const fileNames = userInputs.fileNames;
  const files = fileNames.map(fileName => {
    if (doesFileExists(fileName)) {
      return newFile(fileName, read(reader, fileName, "utf-8"), true);
    }
    return newFile(fileName, "", false);
  });

  let headData = {
    option: userInputs.option,
    optionValue: userInputs.optionValue,
    files
  };
  return headData;
};

const runHead = function(inputs, reader, doesFileExists) {
  let userInputs = parseInputs(inputs);
  let optionValueValidation = validateInputs(userInputs);

  if (!optionValueValidation.isValid) {
    return optionValueValidation.error;
  }
  const headData = createCommandData(userInputs, reader, doesFileExists);
  return head(headData);
};

const runTail = function(inputs, reader, doesFileExists) {
  let userInputs = parseInputs(inputs);

  const validatedOffset = validateOffset(userInputs.optionValue);
  if (!validatedOffset.isValid) {
    return validatedOffset.error;
  }

  userInputs.optionValue = Math.abs(userInputs.optionValue);
  const tailData = createCommandData(userInputs, reader, doesFileExists);
  return tail(tailData);
};

exports.getLinesFromHead = getLinesFromHead;
exports.getCharsFromHead = getCharsFromHead;
exports.read = read;
exports.head = head;
exports.createHeading = createHeading;
exports.runHead = runHead;
exports.getLinesFromTail = getLinesFromTail;
exports.getCharsFromTail = getCharsFromTail;
exports.newFileNotFoundMsg = newFileNotFoundMsg;
exports.createCommandData = createCommandData;
exports.tail = tail;
exports.runTail = runTail;
