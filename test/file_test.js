const assert = require('assert');
const {createFile} = require('../src/libs/file.js');

describe('file : getLines', function(){
  it("should return empty array when an empty file is given", function(){
    let file = createFile('testFile', '');
    assert.deepEqual(file.getLines(), ['']);
  });

  it("should return one line when an one line file is given", function(){
    let file = createFile('testFile', 'this is first line');
    file.contents = "this is first line";
    assert.deepEqual(file.getLines(), ['this is first line']);
  });

  it("should return lines of file when a multiple lines file is given", function(){
    let fileContents = "this is first line\n" + 
                    "this is second line\n" +
                    "this is third line";
    let file = createFile('testFile', fileContents);
    assert.deepEqual(file.getLines(), ['this is first line', "this is second line", "this is third line"]);
  });
});
