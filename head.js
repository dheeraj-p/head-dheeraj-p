const runHead = require('./src/head_lib.js').runHead;
const reader = require('fs').readFileSync;

const main = function(){
  console.log(runHead(process.argv.slice(2), reader));
}

main();
