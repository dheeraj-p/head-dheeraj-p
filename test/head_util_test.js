const assert = require('assert');
const {call} = require('../src/head_utils.js');

describe("call", function(){
  it("should call the the given function with given two parameters", function(){
    assert.deepEqual(call((x,y) => x+y, 0, 3), 3); 
  });
});
