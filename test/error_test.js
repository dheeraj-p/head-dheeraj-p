const assert = require("assert");
const {
  getTailOffsetError,
  getHeadOffsetError
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