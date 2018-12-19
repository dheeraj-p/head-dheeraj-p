const createFile = function(name, contents, doesExists) {
  const file = { name, contents, doesExists };
  file.getLines = getLines.bind(file);
  return file;
};

const getLines = function() {
  return this.contents.split("\n");
};

module.exports = { createFile };
