const {runTail} = require('./src/libs/file_utils');
const {readFileSync, existsSync} = require('fs');

const main = function(){
  console.log(runTail(process.argv.slice(2), readFileSync, existsSync));
}
main();