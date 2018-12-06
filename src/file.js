const newFile = function(name, contents, doesExists){
  let file = {name, contents, doesExists};
  file.getLines = getLines.bind(file);
  return file;
}

const getLines = function(){
  return this.contents.split("\n");
}

exports.newFile = newFile;
