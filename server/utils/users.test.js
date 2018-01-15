const {assert, expect, should} = require('chai');
const {Users} = require('./users');

describe('Users', ()=>{
    it('should add new user', function () {
        let users = new Users();
        let user = {id: 123, name: 'Adi', room: 'Fifa'};
        let respUser = users.addUser(user.id, user.name, user.room);

        console.log('Users',users.users);
        console.log('User',user);
        console.log(respUser);

        // expect(users).to.have.property(users.users);
        expect(users.users).to.be.an('array');
    });
});