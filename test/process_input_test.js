const assert = require('assert');
const {parseInputs,
       validateOffsetHead,
       validateOffsetTail,
       isOptionSpecified,
       newParsedInputs} = require('../src/libs/process_input.js');

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

  it("should return inputs in form of object when lines count is provided without option", function(){
    let expectedOutput = {option: '-n', fileNames: ['file1', 'file2', 'file3'], optionValue : '4'};
    assert.deepEqual(parseInputs(['-4', 'file1', 'file2', 'file3']), expectedOutput);
  });

  it("should return inputs in form of object when option and offset are provided separately", function(){
    let expectedOutput = {option: '-n', fileNames: ['file1', 'file2', 'file3'], optionValue : '4'};
    assert.deepEqual(parseInputs(['-n','4', 'file1', 'file2', 'file3']), expectedOutput);
  });
});

describe("validateOffsetHead", function(){
  it("Should return an error if the given option value is less than 1 for '-n'", function(){
    let expectedOutput = {isValid: false, error: "head: illegal line count -- 0"};
    assert.deepEqual(validateOffsetHead(0, '-n'), expectedOutput); 
  });

  it("Should return an error if the given option value is not a number for '-n'", function(){
    let expectedOutput = {isValid: false, error: "head: illegal line count -- asdf"};
    assert.deepEqual(validateOffsetHead('asdf', '-n'), expectedOutput); 
  });

  it("Should return an error if the given option value is less than 1 for '-c'", function(){
    let expectedOutput = {isValid: false, error: "head: illegal byte count -- 0"};
    assert.deepEqual(validateOffsetHead(0, '-c'), expectedOutput); 
  });

  it("Should return an error if the given option value is not a number for '-c'", function(){
    let expectedOutput = {isValid: false, error: "head: illegal byte count -- asdf"};
    assert.deepEqual(validateOffsetHead('asdf', '-c'), expectedOutput); 
  });

  it("Should return no error when a valid offset is given for any option",function(){
    const expectedOutput = {isValid: true, error: ""};
    assert.deepEqual(validateOffsetHead(1, '-n'), expectedOutput);
  });
});

describe("isOptionSpecified", function(){
  it("should return true if given option candidate is an option", function(){
    assert.equal(isOptionSpecified("-n"), true);
  }); 

  it("should return false if given option candidate is not an option", function(){
    assert.equal(isOptionSpecified("cd"), false);
  }); 
});

describe("newParsedInputs", function(){
  it("should return encapsulated inputs for given option, optionValue and fileNames", function(){
    const expectedOutput = {option: '-n', optionValue: 10, fileNames: ['file1', 'file2']};
    assert.deepEqual(newParsedInputs("-n", 10, ['file1', 'file2']), expectedOutput);
  }); 
});

describe('validateOffsetTail', function(){
  it('should provide error for illegal offset', function(){
    assert.deepEqual(validateOffsetTail("dfs"), {isValid: false, error: "tail: illegal offset -- dfs"});
  });

  it('should not provide error for legal offset', function(){
    assert.deepEqual(validateOffsetTail(3), {isValid: true, error: ""});
  });
});