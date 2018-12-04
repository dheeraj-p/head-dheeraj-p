const newFile = function(){
  let file = {name: '', contents: ''};
  file.getLines = getLines.bind(file);
  return file;
}

const getLines = function(){
  return this.contents.split("\n");
}

exports.newFile = newFile;
