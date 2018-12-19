const assert = require("assert");
const {
  getTailOffsetError,
  getHeadOffsetError,
  getFileNotFoundError
} = require("../src/libs/error.js");

describe("getTailOffsetError", function() {
  it("should return tail's offset error for given offset", function() {
    const expectedOutput = "tail: illegal offset -- sdf";
    assert.equal(getTailOffsetError("sdf"), expectedOutput);
  });
});

describe("getHeadOffsetError", function() {
  it("should return head's byte count error for given invalid byte count", function() {
    const expectedOutput = "head: illegal byte count -- 0";
    assert.equal(getHeadOffsetError(0, "byte"), expectedOutput);
  });

  it("should return head's line count error for given invalid line count", function() {
    const expectedOutput = "head: illegal line count -- 0";
    assert.equal(getHeadOffsetError(0, "line"), expectedOutput);
  });
});

describe("getFileNotFoundError", function() {
  it("should return a 'file or directory not found' message with command name and filename", function() {
    assert.equal(
      getFileNotFoundError("head", "sampleFile"),
      "head: sampleFile: No such file or directory"
    );
  });
});