const { runHead } = require('./src/lib.js');
const {readFileSync, existsSync} = require('fs');

const main = function(){
  console.log(runHead(process.argv.slice(2), readFileSync, existsSync));
}
main();
