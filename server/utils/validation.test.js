const {assert, expect, should} = require('chai');
const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values',()=>{
        let nonString = 'string';
        assert.isTrue(isRealString(nonString), 'Should be true if is string');
    });

    it('should reject string with only spaces',()=>{
        let emptyStr = ' ';
        assert.isFalse(isRealString(emptyStr), 'Should reject empty string');
    });
    it('should allow string with non-space characters',()=>{
        let spacedStr = ' adi';
        assert.isTrue(isRealString(spacedStr), 'Should allow');
    });
});