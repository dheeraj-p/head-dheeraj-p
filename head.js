const runHead = require('./src/head_lib.js').runHead;
const {readFileSync, existsSync} = require('fs');

const main = function(){
  console.log(runHead(process.argv.slice(2), readFileSync, existsSync));
}
main();
