const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const port = process.env.PORT || 8080;
const publicPath = path.join(__dirname, '../public');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

io.on('connection', function (socket) {
    console.log('User connected to server');

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required');
        }

        //join the room;
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage(`Admin`, `${params.name} joined chat app`));



        //leave the room
        // socket.leave(params.room);

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        console.log(message, `\n line 21`);
        io.emit('newMessage', generateMessage(message.from, message.message));
        callback();
    });

    socket.on('createLocationMssage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.lat, coords.lng));
    });

    socket.on('disconnect', function () {
        let user = users.removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', ` ${user.name} has left`));
        }
        console.log('user disconnected');
    });
});

app.use(express.static(publicPath));
app.use(express.static(path.join(__dirname, '../node_modules')));

server.listen(port, () => {
    console.log(`App started on port ${port}`);
});
