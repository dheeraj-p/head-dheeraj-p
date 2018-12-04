const assert = require('assert');
const {getLinesFromHead,
       getCharsFromHead} = require('../src/head_lib.js');
const {newFile} = require('../src/file.js');

describe("getLinesFromHead",function(){
  it("should return no lines when any number of lines are required of an empty file", function(){
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

describe("getCharsFromHead", function(){
  it("Should return no characters when any number of characters of a empty file",function(){
    let file = newFile();
    assert.deepEqual(getCharsFromHead(file, 4), []); 
  });

  it("Should return first N characters of one liner file",function(){
    let file = newFile();
    file.contents = "This is one liner file";
    assert.deepEqual(getCharsFromHead(file, 4), ['T','h','i','s']); 
  });

  it("Should return first N characters of a multi liner file including \\n",function(){
    let file = newFile();
    file.contents = "This is file \n contains multiple lines\n" +
                    "so that I can test my function.";
    let expectedOutput = ['T','h','i','s',' ','i','s',' ','f','i','l','e',' ','\n'];
    assert.deepEqual(getCharsFromHead(file, 14), expectedOutput); 
  });
});
