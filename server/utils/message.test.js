let {assert, expect, should} = require('chai');
let {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should return user, message and time created ', () => {
        let from = 'Adi';
        let text = 'Hello app';
        let message = generateMessage(from, text);

        assert.typeOf(message.createdAt, 'number');
        assert.include({from: message.from, text: message.text}, {from:from, text: text}, 'Object contains prop');
    });
});

describe('generateLocationMessage', ()=>{
    it('should return user, url location', function () {
        let from = 'User';
        let lat = 1;
        let lng = 1;
        let url = `https://www.google.com/maps?q=${lat},${lng}`;
        let location = generateLocationMessage(from, 1,1);

        assert.typeOf(location.url, 'string');
        assert.typeOf(location.from, 'string');
        assert.typeOf(location.createdAt, 'number');
        assert.include({url: location.url}, {url: url});

    });
});