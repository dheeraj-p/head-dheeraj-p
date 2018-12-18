const getTailOffsetError = function(offset) {
  return `tail: illegal offset -- ${offset}`;
};

const getHeadOffsetError = function(offset, optionDescription) {
  return `head: illegal ${optionDescription} count -- ${offset}`;
};

module.exports = {
  getTailOffsetError,
  getHeadOffsetError
};
