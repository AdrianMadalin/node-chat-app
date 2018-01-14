const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const port = process.env.PORT || 8080;
const publicPath = path.join(__dirname, '../public');
const {generateMessage, generateLocationMessage} = require('./utils/message');

let server = http.createServer(app);
let io = socketIO(server);

io.on('connection', function (socket) {
    let date = new Date();
    console.log('User connected to server');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.emit('newMessage', generateMessage('Radu', 'Joined chat app'));

    socket.on('createMessage', (message, callback) => {
        console.log(message, `\n line 21`);
        io.emit('newMessage', generateMessage(message.from, message.message));
        callback();
    });

    socket.on('createLocationMssage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.lat, coords.lng));
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

app.use(express.static(publicPath));
app.use(express.static(path.join(__dirname, '../node_modules')));

server.listen(port, () => {
    console.log(`App started on port ${port}`);
});

