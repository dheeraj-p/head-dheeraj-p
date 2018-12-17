const { newFile } = require("./file.js");
const { parseInputs, validateOffsetHead, validateOffsetTail } = require("./process_input.js");

const getLinesFromHead = function(file, numberOfLines = 10) {
  let lines = file.getLines();
  return lines.slice(0, numberOfLines).join("\n");
};

const getCharsFromHead = function(file, numberOfCharacters) {
  return file.contents.substr(0, numberOfCharacters);
};

const getLinesFromTail = function(file, numberOfLines = 10) {
  let lines = file.getLines();
  if (file.contents.endsWith("\n")) {
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

const runCommand = function(commandData, fileNotFoundMsgProvider, commandOperations) {
  const { option, files, optionValue } = commandData;
  let commandOperation = commandOperations[option];
  let contentJoiners = { "-n": "\n\n", "-c": "\n" };

  let resultedContents = files.map(file => {
    if (!file.doesExists) {
      return fileNotFoundMsgProvider(file.name);
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

const getOffsetValidator = function(command){
  const validators = {"head": validateOffsetHead, "tail": validateOffsetTail};
  return validators[command];
}

const getFinalOutput = function(inputs, reader, doesFileExists, command){
  let userInputs = parseInputs(inputs);
  const offsetValidator = getOffsetValidator(command);

  const validatedOffset = offsetValidator(userInputs.optionValue, userInputs.option);
  if (!validatedOffset.isValid) {
    return validatedOffset.error;
  }

  const commandData = createCommandData(userInputs, reader, doesFileExists);
  if(command === "head"){
    return head(commandData);
  }

  return tail(commandData);
}

const runHead = function(inputs, reader, doesFileExists) {
  return getFinalOutput(inputs, reader, doesFileExists, "head");
};

const runTail = function(inputs, reader, doesFileExists) {
  return getFinalOutput(inputs, reader, doesFileExists, "tail");
};

module.exports = {
  getLinesFromHead,
  getCharsFromHead,
  read,
  head,
  createHeading,
  runHead,
  getLinesFromTail,
  getCharsFromTail,
  newFileNotFoundMsg,
  createCommandData,
  tail,
  runTail
}
