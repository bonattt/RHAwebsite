var assert = require('assert');

var val = 1;
assert.equal(1, val, 'message? (should pass1)');
assert(2 !== val, 'message? (should pass2)');