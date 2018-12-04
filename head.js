const {
       getLinesFromHead,
       read
      } = require('./src/head_lib.js');
const reader = require('fs').readFileSync;
const {newFile} = require('./src/file.js');

const main = function(){
  let filePath = process.argv[2];
  let file = newFile();
  file.name = filePath;
  file.contents = read(reader, filePath, "utf-8");
  let headContents = getLinesFromHead(file).join("\n");
  console.log(headContents);
}

main();
