const assert = require("assert");
const {
  getLinesFromHead,
  getCharsFromHead,
  read,
  head,
  createHeading,
  runHead,
  getLinesFromTail,
  getCharsFromTail,
  createCommandData,
  tail,
  runTail
} = require("../src/libs/file_utils.js");
const { createFile } = require("../src/libs/file.js");
const { assertObjectList } = require("./utils/object_matcher.js");

const elevenLinesText =
  "This is line 1\n" +
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

describe("getLinesFromHead", function() {
  it("should return no lines when any number of lines are required of an empty file", function() {
    const file = createFile("testFile", "", true);
    assert.deepEqual(getLinesFromHead(file, 1), "");
  });

  it("should return 10 lines from top by default when number of lines is not specified", function() {
    const fileContents = elevenLinesText;
    const file = createFile("testFile", fileContents, true);
    const expectedOutput =
      "This is line 1\n" +
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

  it("should return lines from top when number of lines is specified for a file", function() {
    const fileContents = elevenLinesText;
    const file = createFile("testFile", fileContents, true);
    const expectedOutput =
      "This is line 1\n" +
      "This is line 2\n" +
      "This is line 3\n" +
      "This is line 4\n" +
      "This is line 5";

    assert.deepEqual(getLinesFromHead(file, 5), expectedOutput);
  });
});

describe("getCharsFromHead", function() {
  it("Should return empty string when an empty file is given", function() {
    const file = createFile("testFile", "", true);
    assert.deepEqual(getCharsFromHead(file, 4), "");
  });

  it("Should return first N characters of one liner file", function() {
    const file = createFile("testFile", "This is one liner file", true);
    assert.deepEqual(getCharsFromHead(file, 4), "This");
  });

  it("Should return first N characters of a multi liner file including \\n", function() {
    const fileContents =
      "This is file \n contains multiple lines\n" +
      "so that I can test my function.";
    const file = createFile("testFile", fileContents, true);
    assert.deepEqual(getCharsFromHead(file, 14), "This is file \n");
  });
});

const mockReader = function(expectedFile, expectedEncoding, expectedContent) {
  return function(actualFile, actualencoding) {
    const isFileValid = function() {
      return actualFile === expectedFile;
    };

    const isEncodingValid = function() {
      return actualencoding === expectedEncoding;
    };

    const areArgsValid = function() {
      return isFileValid() && isEncodingValid();
    };

    if (areArgsValid()) {
      return expectedContent;
    }
  };
};

describe("read", function() {
  it("should return the content of provided file when file and encoding is valid", function() {
    const readHelloWorld = mockReader(
      "../helloworld.txt",
      "utf-8",
      "Hello World"
    );
    assert.deepEqual(
      read(readHelloWorld, "../helloworld.txt", "utf-8"),
      "Hello World"
    );
  });

  it("should return empty string when empty file is provided", function() {
    const readEmptyFile = mockReader("../emptyFile.txt", "utf-8", "");
    assert.deepEqual(read(readEmptyFile, "../emptyFile.txt", "utf-8"), "");
  });
});

const headTailTestData = {
  fiveLinesText:
    "This is first line of file\n" +
    "and this seems to be second line\n" +
    "this is third line\n" +
    "I think this is fourth line\n" +
    "And this seems to be last",

  multipleFilesTest: {
    fiveLinesText1:
      "This is first line of file 1\n" +
      "and this seems to be second line 1\n" +
      "this is third line 1\n" +
      "I think this is fourth line 1\n" +
      "And this seems to be last 1",

    fiveLinesText2:
      "This is first line of file 2\n" +
      "and this seems to be second line 2\n" +
      "this is third line 2\n" +
      "I think this is fourth line 2\n" +
      "And this seems to be last 2"
  }
};

describe("head", function() {
  it("should return headed content when only one file is provided for byte option", function() {
    const file = createFile("testFile", "this is test file contents", true);
    const input = { option: "byte", files: [file], optionValue: 4 };
    const expectedOutput = "this";
    assert.deepEqual(head(input), expectedOutput);
  });

  it("should return headed content when multiple files are provided for byte option", function() {
    const file1 = createFile("testFile1", "this is test file1 contents", true);
    const file2 = createFile(
      "testFile2",
      "And this is test file2 contents",
      true
    );
    const file3 = createFile(
      "testFile3",
      "I think this is the last file",
      true
    );
    const input = {
      option: "byte",
      files: [file1, file2, file3],
      optionValue: 4
    };
    const expectedOutput =
      "==> testFile1 <==\n" +
      "this\n" +
      "==> testFile2 <==\n" +
      "And \n" +
      "==> testFile3 <==\n" +
      "I th";
    assert.deepEqual(head(input), expectedOutput);
  });

  it("should return headed content when only one file is provided for line option", function() {
    const fileContents = headTailTestData.fiveLinesText;
    const file = createFile("testFile", fileContents, true);
    const input = { option: "line", files: [file], optionValue: 3 };
    const expectedOutput =
      "This is first line of file\n" +
      "and this seems to be second line\n" +
      "this is third line";
    assert.deepEqual(head(input), expectedOutput);
  });

  it("should return headed content when mulitiple files are provided for line option", function() {
    const file1Contents = headTailTestData.multipleFilesTest.fiveLinesText1;
    const file2Contents = headTailTestData.multipleFilesTest.fiveLinesText2;

    const file1 = createFile("testFile1", file1Contents, true);
    const file2 = createFile("testFile2", file2Contents, true);

    const input = {
      option: "line",
      files: [file1, file2],
      optionValue: 3
    };
    const expectedOutput =
      "==> testFile1 <==\n" +
      "This is first line of file 1\n" +
      "and this seems to be second line 1\n" +
      "this is third line 1\n\n" +
      "==> testFile2 <==\n" +
      "This is first line of file 2\n" +
      "and this seems to be second line 2\n" +
      "this is third line 2";

    assert.deepEqual(head(input), expectedOutput);
  });
});

describe("createHeading", function() {
  it("Should surround given text with '==> ' and ' <==' ", function() {
    assert.equal(createHeading("sampleFile.txt"), "==> sampleFile.txt <==");
  });
});

const doesFileExists = function(fileName) {
  if (fileName.startsWith("existing")) {
    return true;
  }
  return false;
};

describe("runHead", function() {
  const readHelloWorld = mockReader(
    "existing_helloWorldTest",
    "utf-8",
    "Hello World"
  );
  it("should head characters of a single file", function() {
    const inputs = ["-c", "2", "existing_helloWorldTest"];
    assert.equal(runHead(inputs, readHelloWorld, doesFileExists), "He");
  });

  it("should head lines of a single file", function() {
    const inputs = ["-n", "2", "existing_helloWorldTest"];
    assert.equal(
      runHead(inputs, readHelloWorld, doesFileExists),
      "Hello World"
    );
  });

  it("should head characters of a multiple files", function() {
    const inputs = [
      "-c",
      "2",
      "existing_helloWorldTest",
      "existing_helloWorldTest"
    ];
    const expectedOutput =
      "==> existing_helloWorldTest <==\n" +
      "He\n" +
      "==> existing_helloWorldTest <==\n" +
      "He";
    assert.equal(
      runHead(inputs, readHelloWorld, doesFileExists),
      expectedOutput
    );
  });

  it("should throw illegal line count error for invalid options", function() {
    const inputs = ["-0", "helloWorldfile1", "helloWorldfile2"];
    assert.equal(
      runHead(inputs, readHelloWorld, doesFileExists),
      "head: illegal line count -- 0"
    );
  });

  it("should throw illegal byte count error for invalid options", function() {
    const inputs = ["-c0", "helloWorldfile1", "helloWorldfile2"];
    assert.equal(
      runHead(inputs, readHelloWorld, doesFileExists),
      "head: illegal byte count -- 0"
    );
  });

  it("should provide an error for a single missing file", function() {
    const inputs = ["-c3", "helloWorldfile1"];
    assert.equal(
      runHead(inputs, readHelloWorld, doesFileExists),
      "head: helloWorldfile1: No such file or directory"
    );
  });

  it("should provide the error message for a missing file but list other files that are present", function() {
    const inputs = ["-c3", "helloWorldfile1", "existing_helloWorldTest"];
    const expectedOutput =
      "head: helloWorldfile1: No such file or directory\n" +
      "==> existing_helloWorldTest <==\n" +
      "Hel";
    assert.equal(
      runHead(inputs, readHelloWorld, doesFileExists),
      expectedOutput
    );
  });
});

describe("getLinesFromTail", function() {
  it("should return no lines when any number of lines are required of an empty file", function() {
    const file = createFile("testFile", "", true);
    assert.deepEqual(getLinesFromTail(file, 1), "");
  });

  it("should return 10 lines from bottom by default when number of lines is not specified", function() {
    const fileContents = elevenLinesText;
    const file = createFile("testFile", fileContents, true);

    const expectedOutput =
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

    assert.deepEqual(getLinesFromTail(file), expectedOutput);
  });

  const lastFiveLinesOfElevenLinesText =
    "This is line 7\n" +
    "This is line 8\n" +
    "This is line 9\n" +
    "This is line 10\n" +
    "This is line 11";

  it("should return lines from bottom when number of lines is specified for a file", function() {
    const fileContents = elevenLinesText;
    const file = createFile("testFile", fileContents, true);
    const expectedOutput = lastFiveLinesOfElevenLinesText;
    assert.deepEqual(getLinesFromTail(file, 5), expectedOutput);
  });
});

describe("getCharsFromTail", function() {
  it("Should return empty string when an empty file is given", function() {
    const file = createFile("testFile", "", true);
    assert.deepEqual(getCharsFromTail(file, 4), "");
  });

  it("Should return last N characters of one liner file", function() {
    const file = createFile("testFile", "This is one liner file", true);
    assert.deepEqual(getCharsFromTail(file, 4), "file");
  });

  it("Should return last N characters of a multi liner file", function() {
    const fileContents =
      "This is file \n contains multiple lines\n" +
      "so that I can test my function.";
    const file = createFile("testFile", fileContents, true);
    assert.deepEqual(getCharsFromTail(file, 14), "t my function.");
  });
});

describe("createCommandData", function() {
  const userInputs = {
    option: "-n",
    optionValue: 10,
    fileNames: ["existing_helloWorldFile"]
  };

  const helloWorldReader = mockReader(
    "existing_helloWorldFile",
    "utf-8",
    "Hello World"
  );

  const actual = createCommandData(
    userInputs,
    helloWorldReader,
    doesFileExists
  );

  it("should preserve the option given by user", function() {
    assert.deepEqual(actual.option, "-n");
  });

  it("should preserve the option value given by user", function() {
    assert.deepEqual(actual.optionValue, 10);
  });

  it("should contain files that have been read using given reader", function() {
    const helloWorldFile = createFile(
      "existing_helloWorldFile",
      "Hello World",
      true
    );
    const expectedFiles = [helloWorldFile];
    const keysToMatch = ["name", "contents", "doesExists"];
    assertObjectList(actual.files, expectedFiles, keysToMatch);
  });
});

describe("tail", function() {
  it("should return tailed content when only one file is provided for byte option", function() {
    const file = createFile("testFile", "this is test file contents", true);
    const input = { option: "byte", files: [file], optionValue: 4 };
    const expectedOutput = "ents";
    assert.deepEqual(tail(input), expectedOutput);
  });

  it("should return tailed content when multiple files are provided for byte option", function() {
    const file1 = createFile("testFile1", "this is test file1 contents", true);
    const file2 = createFile(
      "testFile2",
      "And this is test file2 contents",
      true
    );
    const file3 = createFile(
      "testFile3",
      "I think this is the last file",
      true
    );
    const input = {
      option: "byte",
      files: [file1, file2, file3],
      optionValue: 4
    };
    const expectedOutput =
      "==> testFile1 <==\n" +
      "ents\n" +
      "==> testFile2 <==\n" +
      "ents\n" +
      "==> testFile3 <==\n" +
      "file";
    assert.deepEqual(tail(input), expectedOutput);
  });

  it("should return tailed content when only one file is provided for line option", function() {
    const fileContents = headTailTestData.fiveLinesText;
    const file = createFile("testFile", fileContents, true);
    const input = { option: "line", files: [file], optionValue: 3 };
    const expectedOutput =
      "this is third line\n" +
      "I think this is fourth line\n" +
      "And this seems to be last";
    assert.deepEqual(tail(input), expectedOutput);
  });

  it("should return tailed content when mulitiple files are provided for line option", function() {
    const file1Contents = headTailTestData.multipleFilesTest.fiveLinesText1;
    const file2Contents = headTailTestData.multipleFilesTest.fiveLinesText2;

    const file1 = createFile("testFile1", file1Contents, true);
    const file2 = createFile("testFile2", file2Contents, true);

    const input = {
      option: "line",
      files: [file1, file2],
      optionValue: 3
    };
    const expectedOutput =
      "==> testFile1 <==\n" +
      "this is third line 1\n" +
      "I think this is fourth line 1\n" +
      "And this seems to be last 1\n\n" +
      "==> testFile2 <==\n" +
      "this is third line 2\n" +
      "I think this is fourth line 2\n" +
      "And this seems to be last 2";

    assert.deepEqual(tail(input), expectedOutput);
  });
});

describe("runTail", function() {
  const readHelloWorld = mockReader(
    "existing_helloWorldTest",
    "utf-8",
    "Hello World"
  );
  it("should tail characters of a single file", function() {
    const inputs = ["-c", "2", "existing_helloWorldTest"];
    assert.equal(runTail(inputs, readHelloWorld, doesFileExists), "ld");
  });

  it("should tail lines of a single file", function() {
    const inputs = ["-n", "2", "existing_helloWorldTest"];
    assert.equal(
      runTail(inputs, readHelloWorld, doesFileExists),
      "Hello World"
    );
  });

  it("should tail characters of a multiple files", function() {
    const inputs = [
      "-c",
      "2",
      "existing_helloWorldTest",
      "existing_helloWorldTest"
    ];
    const expectedOutput =
      "==> existing_helloWorldTest <==\n" +
      "ld\n" +
      "==> existing_helloWorldTest <==\n" +
      "ld";
    assert.equal(
      runTail(inputs, readHelloWorld, doesFileExists),
      expectedOutput
    );
  });

  it("should provide an error for a single missing file", function() {
    const inputs = ["-c3", "helloWorldfile1"];
    assert.equal(
      runTail(inputs, readHelloWorld, doesFileExists),
      "tail: helloWorldfile1: No such file or directory"
    );
  });

  it("should provide the error message for a missing file but list other files that are present", function() {
    const inputs = ["-c3", "helloWorldfile1", "existing_helloWorldTest"];
    const expectedOutput =
      "tail: helloWorldfile1: No such file or directory\n" +
      "==> existing_helloWorldTest <==\n" +
      "rld";
    assert.equal(
      runTail(inputs, readHelloWorld, doesFileExists),
      expectedOutput
    );
  });

  it("should provide an error for a illegal offset", function() {
    const inputs = ["-cdsf", "helloWorldfile1"];
    assert.equal(
      runTail(inputs, readHelloWorld, doesFileExists),
      "tail: illegal offset -- dsf"
    );
  });

  it("should return empty string for offset 0", function() {
    const inputs = ["-0", "helloWorldfile1"];
    assert.equal(runTail(inputs, readHelloWorld, doesFileExists), "");
  });
});
