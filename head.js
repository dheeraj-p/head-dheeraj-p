const {
  head,
  read
} = require('./src/head_lib.js');
const reader = require('fs').readFileSync;
const {newFile} = require('./src/file.js');
const {parseInputs} = require('./src/io.js');

const main = function(){
  let userInputs = parseInputs(process.argv.slice(2));
  let fileNames = userInputs.fileNames;
  let files = fileNames.map(fileName => newFile(fileName, read(reader, fileName, "utf-8")));
  let headData = {option: userInputs.option, optionValue: userInputs.optionValue, files};
  let headContents = head(headData);
  console.log(headContents);
}

main();
