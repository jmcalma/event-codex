var assert = require('assert');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});

var add = function(a, b) {
  return a + b;
}

describe('add(a, b)', function() {
  it ('should be 9', function() {
    assert.equal(9, add(4, 5));
  })
  it ('should be 7', function() {
    assert.equal(7, add(4, 3));
  })
})
