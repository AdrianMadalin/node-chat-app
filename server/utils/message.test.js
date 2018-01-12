let {assert, expect, should} = require('chai');
let {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should return user, message and time created ', () => {
        let from = 'Adi';
        let text = 'Hello app';
        let message = generateMessage(from, text);

        assert.typeOf(message.createdAt, 'number');
        assert.include({from: message.from, text: message.text}, {from:from, text: text}, 'Object contains prop');
    });
});