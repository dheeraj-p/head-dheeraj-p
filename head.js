const {
  getLinesFromHead,
  read
} = require('./src/head_lib.js');
const reader = require('fs').readFileSync;
const {newFile} = require('./src/file.js');

const main = function(){
  let filePath = process.argv[2];
  let fileContents = read(reader, filePath, "utf-8");
  let file = newFile(filePath, fileContents);
  let headContents = getLinesFromHead(file);
  console.log(headContents);
}

main();
