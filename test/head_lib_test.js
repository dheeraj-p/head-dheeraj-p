const assert = require('assert');
const {getLinesFromHead,
       getCharsFromHead,
       read} = require('../src/head_lib.js');
const {newFile} = require('../src/file.js');

describe("getLinesFromHead",function(){
  it("should return no lines when any number of lines are required of an empty file", function(){
    let file = newFile();
    assert.deepEqual(getLinesFromHead(file, 1), ''); 
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

    let expectedOutput = "This is line 1\n" +
                         "This is line 2\n" +
                         "This is line 3\n" +
                         "This is line 4\n" +
                         "This is line 5\n" +
                         "This is line 6\n" +
                         "This is line 7\n" +
                         "This is line 8\n" +
                         "This is line 9\n" +
                         "This is line 10";

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

    let expectedOutput = "This is line 1\n" +
                         "This is line 2\n" +
                         "This is line 3\n" +
                         "This is line 4\n" +
                         "This is line 5";

    assert.deepEqual(getLinesFromHead(file, 5), expectedOutput); 
  });
})

describe("getCharsFromHead", function(){
  it("Should return empty string when an empty file is given",function(){
    let file = newFile();
    assert.deepEqual(getCharsFromHead(file, 4), ''); 
  });

  it("Should return first N characters of one liner file",function(){
    let file = newFile();
    file.contents = "This is one liner file";
    assert.deepEqual(getCharsFromHead(file, 4), 'This'); 
  });

  it("Should return first N characters of a multi liner file including \\n",function(){
    let file = newFile();
    file.contents = "This is file \n contains multiple lines\n" +
                    "so that I can test my function.";
    assert.deepEqual(getCharsFromHead(file, 14), 'This is file \n'); 
  });
});

const readHelloWorld = function(file, encoding) {
  if(file && encoding) {
    return "Hello World";
  }
};

const readEmptyFile = function(file, encoding) {
  if(file && encoding) {
    return "";
  }
}
describe("read", function(){
  it("should return the content of provided file when file and encoding is valid", function(){
    assert.deepEqual(read(readHelloWorld, "helloworld.txt", "utf-8"), "Hello World"); 
  });

  it("should return empty string when empty file is provided", function(){
    assert.deepEqual(read(readEmptyFile, "emptyFile.txt", "utf-8"), ""); 
  });
});
