const {assert, expect, should} = require('chai');
const {Users} = require('./users');

describe('Users', () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: '1',
                name: 'adi',
                room: 'Node course'
            },{
                id: '2',
                name: 'Radu',
                room: 'React course'
            },{
                id: '3',
                name: 'mada',
                room: 'Node course'
            }
        ]
    });

    it('should add new user', function () {
        let users = new Users();
        let user = {id: 123, name: 'Adi', room: 'Fifa'};
        let respUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).to.be.an('array');
    });

    it('should return names for node course', function () {
        let userList = users.getUserList('Node course');
        expect(userList).to.deep.equal([ 'adi', 'mada' ]);
    });

    it('should return names for react course', function () {
        let userList = users.getUserList('React course');
        expect(userList).to.deep.equal([ 'Radu' ]);
    });

    it('should remove user', function () {
        let userId = users.removeUser('1');
        expect(userId).to.contain({id: '1'});
    });

    it('should find the user', function () {
        let userId = '1';
        let user = users.getUser(userId);
        expect(user).to.contain({id: '1'});
        expect(user.name).to.deep.equal('adi');
        expect(user.id).to.equal('1');
    });

    it('should NOT find the user', function () {
        let userId = '2';
        let user = users.getUser(userId);
        expect(user).to.not.contain({id: '1'});
        expect(user.name).to.deep.equal('Radu');
        expect(user.id).to.not.equal('1');
    });
});