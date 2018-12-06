const assert = require('assert');
const {parseInputs,
       validateOptions,
       isOptionValid,
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

describe("validateOptions",function(){
  it("Should return an error if the given option value is less than 1 for '-n'", function(){
    let input = {option: '-n', optionValue: '0', fileNames: ['file']};
    let expectedOutput = {isValid: false, error: "head: illegal line count -- 0"};
    assert.deepEqual(validateOptions(input), expectedOutput); 
  });

  it("Should return an error if the given option value is not a number for '-n'", function(){
    let input = {option: '-n', optionValue: 'asdf', fileNames: ['file']};
    let expectedOutput = {isValid: false, error: "head: illegal line count -- asdf"};
    assert.deepEqual(validateOptions(input), expectedOutput); 
  });

  it("Should return an error if the given option value is less than 1 for '-c'", function(){
    let input = {option: '-c', optionValue: '0', fileNames: ['file']};
    let expectedOutput = {isValid: false, error: "head: illegal byte count -- 0"};
    assert.deepEqual(validateOptions(input), expectedOutput); 
  });

  it("Should return an error if the given option value is not a number for '-c'", function(){
    let input = {option: '-c', optionValue: 'asdf', fileNames: ['file']};
    let expectedOutput = {isValid: false, error: "head: illegal byte count -- asdf"};
    assert.deepEqual(validateOptions(input), expectedOutput); 
  });

  it("Should return an illegal option error if the given option is not valid", function(){
    let input = {option: '-d', optionValue: 'asdf', fileNames: ['file']};
    let expectedOutput = {isValid: false, error: "head: illegal option -- d\nusage: head [-n lines | -c bytes] [file ...]"};
    assert.deepEqual(validateOptions(input), expectedOutput); 
  });
});

describe("isOptionValid", function(){
  it("Should return true if the option is valid", function(){
    assert.equal(isOptionValid("-n"), true); 
  });

  it("Should return false if the option is not valid", function(){
    assert.equal(isOptionValid("-d"), false); 
  });
});

describe("validateOptionValue", function(){
  it("Should return an error if the given option value is less than 1 for '-n'", function(){
    let input = {option: '-n', optionValue: '0', fileNames: ['file']};
    let expectedOutput = {isValid: false, error: "head: illegal line count -- 0"};
    assert.deepEqual(validateOptions(input), expectedOutput); 
  });

  it("Should return an error if the given option value is not a number for '-n'", function(){
    let input = {option: '-n', optionValue: 'asdf', fileNames: ['file']};
    let expectedOutput = {isValid: false, error: "head: illegal line count -- asdf"};
    assert.deepEqual(validateOptions(input), expectedOutput); 
  });

  it("Should return an error if the given option value is less than 1 for '-c'", function(){
    let input = {option: '-c', optionValue: '0', fileNames: ['file']};
    let expectedOutput = {isValid: false, error: "head: illegal byte count -- 0"};
    assert.deepEqual(validateOptions(input), expectedOutput); 
  });

  it("Should return an error if the given option value is not a number for '-c'", function(){
    let input = {option: '-c', optionValue: 'asdf', fileNames: ['file']};
    let expectedOutput = {isValid: false, error: "head: illegal byte count -- asdf"};
    assert.deepEqual(validateOptions(input), expectedOutput); 
  });
});
