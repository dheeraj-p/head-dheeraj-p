const assert = require('assert');
const {parseInputs,
       validateOptionValue} = require('../src/io.js');

describe("parseInputs", function(){
  it("should return inputs in form of object containing all the file names in default case", function(){
    let expectedOutput = {option: '-n', fileNames: ['file1', 'file2'], optionValue : '10'};
    assert.deepEqual(parseInputs(['file1', 'file2']), expectedOutput);
  });

  it("should return inputs in form of object when option is provided with one file", function(){
    let expectedOutput = {option: '-n', fileNames: ['file'], optionValue : '4'};
    assert.deepEqual(parseInputs(['-n4', 'file']), expectedOutput);
  });

  it("should return inputs in form of object when option is provided with multiple files", function(){
    let expectedOutput = {option: '-n', fileNames: ['file1', 'file2', 'file3'], optionValue : '4'};
    assert.deepEqual(parseInputs(['-n4', 'file1', 'file2', 'file3']), expectedOutput);
  });

  it("should return inputs in form of object when lines count is provided without -n", function(){
    let expectedOutput = {option: '-n', fileNames: ['file1', 'file2', 'file3'], optionValue : '4'};
    assert.deepEqual(parseInputs(['-4', 'file1', 'file2', 'file3']), expectedOutput);
  });
});

describe("validateOptionValue",function(){
  it("Should return an error if the given option value is less than 1", function(){
    let expectedOutput = {isValid: false, error: "head: illegal line count -- 0"};
    assert.deepEqual(validateOptionValue(0), expectedOutput); 
  });

  it("Should return an error if the given option value is not a number", function(){
    let expectedOutput = {isValid: false, error: "head: illegal line count -- asdf"};
    assert.deepEqual(validateOptionValue('asdf'), expectedOutput); 
  });
});
