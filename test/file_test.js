const assert = require('assert');
const {newFile} = require('../src/file.js');

describe('file : getLines', function(){
  it("should return empty array when an empty file is given", function(){
    let file = newFile();
    assert.deepEqual(file.getLines(), ['']);
  });

  it("should return one line when an one line file is given", function(){
    let file = newFile();
    file.contents = "this is first line";
    assert.deepEqual(file.getLines(), ['this is first line']);
  });

  it("should return lines of file when a multiple lines file is given", function(){
    let file = newFile();
    file.contents = "this is first line\n" + 
                    "this is second line\n" +
                    "this is third line";
    assert.deepEqual(file.getLines(), ['this is first line', "this is second line", "this is third line"]);
  });
});
