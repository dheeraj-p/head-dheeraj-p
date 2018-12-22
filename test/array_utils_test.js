const assert = require("assert");
const { take } = require("../src/utils/array.js");

describe("take", function() {
  it("should return empty list when 0 elements are required of any list", function() {
    const numbers = [2, 3, 5];
    assert.deepEqual(take(0, numbers), []);
  });

  it("should return first element when 1 element is required of any list", function() {
    const numbers = [2, 3, 5];
    assert.deepEqual(take(1, numbers), [2]);
  });

  it("should return first N elements when N elements are required of any list", function() {
    const numbers = [2, 3, 5, 4, 5];
    assert.deepEqual(take(3, numbers), [2, 3, 5]);
  });

  it("should return all elements when N elements are required of any list if N>Size of list", function() {
    const numbers = [2, 3, 5, 4, 5];
    assert.deepEqual(take(6, numbers), [2, 3, 5, 4, 5]);
  });

  it("should return empty list when N elements are required for an empty list", function() {
    const numbers = [2, 3, 5, 4, 5];
    assert.deepEqual(take(6, numbers), [2, 3, 5, 4, 5]);
  });
});
