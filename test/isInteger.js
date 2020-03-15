const assert = require('assert');

const { isInteger } = require('../helpful-functions');

describe('isInteger', () => {
  it('test isInteger', () => {
    assert.equal(isInteger('0'), true);
    assert.equal(isInteger('10a'), false);
    assert.equal(isInteger('5.000000000000001'), false);
    assert.equal(isInteger(NaN), false);
    assert.equal(isInteger('5'), true);
    assert.equal(isInteger('-25.3'), false);
  });
});
