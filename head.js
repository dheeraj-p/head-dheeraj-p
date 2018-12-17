const { runHead } = require('./src/libs/text_utils.js');
const {readFileSync, existsSync} = require('fs');

const main = function(){
  console.log(runHead(process.argv.slice(2), readFileSync, existsSync));
}
main();
