const getTailOffsetError = function(offset) {
  return `tail: illegal offset -- ${offset}`;
};

const getHeadOffsetError = function(offset, optionDescription) {
  return `head: illegal ${optionDescription} count -- ${offset}`;
};

const getFileNotFoundError = function(commandName, fileName) {
  return `${commandName}: ${fileName}: No such file or directory`;
};

module.exports = {
  getTailOffsetError,
  getHeadOffsetError,
  getFileNotFoundError
};
