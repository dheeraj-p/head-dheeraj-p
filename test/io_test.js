const assert = require('assert');
const {parseInputs} = require('../src/io.js');

describe("parseInputs", function(){
  it("should return inputs in form of object containing all the file names in default case", function(){
    let expectedOutput = {option: 'n', fileNames: ['file1', 'file2'], optionValue : 10};
    assert.deepEqual(parseInputs(['file1', 'file2']), expectedOutput);
  });
});
