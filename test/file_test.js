const assert = require('assert');
const {newFile} = require('../src/file.js');

describe('newFile', function(){
  it("should return an new file object", function(){
    let expectedOutput = {name: '', contents: ''};
    assert.deepEqual(newFile(), expectedOutput);
  });
});
