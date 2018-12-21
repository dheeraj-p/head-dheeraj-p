const assert = require("assert");
const {
  parseInputs,
  validateOffsetHead,
  validateOffsetTail,
  isOptionSpecified,
  newParsedInputs
} = require("../src/libs/process_input.js");
const {
  getTailOffsetError,
  getHeadOffsetError
} = require("../src/libs/error.js");

describe("parseInputs", function() {
  it("should return inputs in form of object containing all the file names in default case", function() {
    const expectedOutput = {
      option: "line",
      fileNames: ["file1", "file2"],
      optionValue: "10"
    };
    assert.deepEqual(parseInputs(["file1", "file2"]), expectedOutput);
  });

  it("should return inputs in form of object when option is provided with one file", function() {
    const expectedOutput = {
      option: "line",
      fileNames: ["file"],
      optionValue: "4"
    };
    assert.deepEqual(parseInputs(["-n4", "file"]), expectedOutput);
  });

  it("should return inputs in form of object when option is provided with multiple files", function() {
    const expectedOutput = {
      option: "line",
      fileNames: ["file1", "file2", "file3"],
      optionValue: "4"
    };
    assert.deepEqual(
      parseInputs(["-n4", "file1", "file2", "file3"]),
      expectedOutput
    );
  });

  it("should return inputs in form of object when lines count is provided without option", function() {
    const expectedOutput = {
      option: "line",
      fileNames: ["file1", "file2", "file3"],
      optionValue: "4"
    };
    assert.deepEqual(
      parseInputs(["-4", "file1", "file2", "file3"]),
      expectedOutput
    );
  });

  it("should return inputs in form of object when option and offset are provided separately", function() {
    const expectedOutput = {
      option: "line",
      fileNames: ["file1", "file2", "file3"],
      optionValue: "4"
    };
    assert.deepEqual(
      parseInputs(["-n", "4", "file1", "file2", "file3"]),
      expectedOutput
    );
  });
});

describe("validateOffsetHead", function() {
  const errorMessageProvider = getHeadOffsetError;
  it("Should return an error if the given option value is less than 1 for '-n'", function() {
    const expectedOutput = {
      isValid: false,
      error: "head: illegal line count -- 0"
    };
    assert.deepEqual(
      validateOffsetHead(0, errorMessageProvider, "line"),
      expectedOutput
    );
  });

  it("Should return an error if the given option value is not a number for '-n'", function() {
    const expectedOutput = {
      isValid: false,
      error: "head: illegal line count -- asdf"
    };
    assert.deepEqual(
      validateOffsetHead("asdf", errorMessageProvider, "line"),
      expectedOutput
    );
  });

  it("Should return an error if the given option value is less than 1 for '-c'", function() {
    const expectedOutput = {
      isValid: false,
      error: "head: illegal byte count -- 0"
    };
    assert.deepEqual(
      validateOffsetHead(0, errorMessageProvider, "byte"),
      expectedOutput
    );
  });

  it("Should return an error if the given option value is not a number for '-c'", function() {
    const expectedOutput = {
      isValid: false,
      error: "head: illegal byte count -- asdf"
    };
    assert.deepEqual(
      validateOffsetHead("asdf", errorMessageProvider, "byte"),
      expectedOutput
    );
  });

  it("Should return no error when a valid offset is given for any option", function() {
    const expectedOutput = { isValid: true, error: "" };
    assert.deepEqual(
      validateOffsetHead(1, errorMessageProvider, "line"),
      expectedOutput
    );
  });
});

describe("isOptionSpecified", function() {
  it("should return true if given option candidate is an option", function() {
    assert.equal(isOptionSpecified("-n"), true);
  });

  it("should return false if given option candidate is not an option", function() {
    assert.equal(isOptionSpecified("cd"), false);
  });
});

describe("newParsedInputs", function() {
  it("should return encapsulated inputs for given option, optionValue and fileNames", function() {
    const expectedOutput = {
      option: "-n",
      optionValue: 10,
      fileNames: ["file1", "file2"]
    };
    assert.deepEqual(
      newParsedInputs("-n", 10, ["file1", "file2"]),
      expectedOutput
    );
  });
});

describe("validateOffsetTail", function() {
  const errorMessageProvider = getTailOffsetError;
  it("should provide error for illegal offset", function() {
    assert.deepEqual(validateOffsetTail("dfs", errorMessageProvider), {
      isValid: false,
      error: "tail: illegal offset -- dfs"
    });
  });

  it("should not provide error for legal offset", function() {
    assert.deepEqual(validateOffsetTail(3, errorMessageProvider), {
      isValid: true,
      error: ""
    });
  });
});
