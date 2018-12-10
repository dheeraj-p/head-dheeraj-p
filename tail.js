const {runTail} = require('./src/lib.js');
const {readFileSync, existsSync} = require('fs');

const main = function(){
  console.log(runTail(process.argv.slice(2), readFileSync, existsSync));
}
main();