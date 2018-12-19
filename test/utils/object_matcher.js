const assert = require("assert");
const { zip } = require("./array.js");

const assertObject = function(actual, expected, keysToMatch) {
  const unmatchedKeys = keysToMatch.filter(
    key => actual[key] !== expected[key]
  );

  const assertMessages = unmatchedKeys.map(unmatchedKey =>
    getAssertMessage(unmatchedKey, actual[unmatchedKey], expected[unmatchedKey])
  );

  const didExpectationMet = unmatchedKeys.length == 0;
  assert.equal(didExpectationMet, true, assertMessages.join("\n"));
};

const getAssertMessage = function(key, actual, expected) {
  return `For Object.key: ${key}, expected: ${expected} | actual ${actual}`;
};

const assertObjectList = function(actualList, expectedList, keysToMatch) {
  zip(actualList, expectedList).forEach(actualExpectedPair =>
    assertObject(actualExpectedPair[0], actualExpectedPair[1], keysToMatch)
  );
};

module.exports = { assertObject, assertObjectList };
