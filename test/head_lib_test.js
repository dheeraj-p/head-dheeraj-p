const assert = require('assert');
const {getLinesFromHead} = require('../src/head_lib.js');
const {newFile} = require('../src/file.js');

describe("getLinesFromHead",function(){
  it("should return empty array when any number of lines are required of an empty file", function(){
    let file = newFile();
    assert.deepEqual(getLinesFromHead(file, 1), ['']); 
  });

  it("should return 10 lines by default when number of lines is not specified", function(){
    let file = newFile();
    file.contents = "This is line 1\n" +
                    "This is line 2\n" +
                    "This is line 3\n" +
                    "This is line 4\n" +
                    "This is line 5\n" +
                    "This is line 6\n" +
                    "This is line 7\n" +
                    "This is line 8\n" +
                    "This is line 9\n" +
                    "This is line 10\n" +
                    "This is line 11";

    let expectedOutput = ["This is line 1",
                          "This is line 2",
                          "This is line 3",
                          "This is line 4",
                          "This is line 5",
                          "This is line 6",
                          "This is line 7",
                          "This is line 8",
                          "This is line 9",
                          "This is line 10"];

    assert.deepEqual(getLinesFromHead(file), expectedOutput); 
  });

  it("should return lines when number of lines is specified for a file", function(){
    let file = newFile();
    file.contents = "This is line 1\n" +
                    "This is line 2\n" +
                    "This is line 3\n" +
                    "This is line 4\n" +
                    "This is line 5\n" +
                    "This is line 6\n" +
                    "This is line 7\n" +
                    "This is line 8\n" +
                    "This is line 9\n" +
                    "This is line 10\n" +
                    "This is line 11";

    let expectedOutput = ["This is line 1",
                          "This is line 2",
                          "This is line 3",
                          "This is line 4",
                          "This is line 5"];

    assert.deepEqual(getLinesFromHead(file, 5), expectedOutput); 
  });
})
