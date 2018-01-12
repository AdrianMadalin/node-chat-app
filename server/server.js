const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const port = process.env.PORT || 8080;
const publicPath = path.join(__dirname, '../public');

let server = http.createServer(app);
let io = socketIO(server);

io.on('connection', function (socket) {
    let date = new Date();
    console.log('User connected to server');

        socket.emit('newMessage', {
            user: 'Admin',
            message: 'Welcome to the chat app',
            createdAt: date.getTime()
        });

        socket.broadcast.emit('newMessage', {
            user: 'Radu',
            message: 'Joined chat app',
            createdAt: date.getTime()
        });

    // socket.on('createMessage', (message) => {
    //
    //     console.log(`Incomming message from user: ${message.from}`);
    //     console.log(`Incomming message from user: ${message.text}`);
    //
    //     // io.emit('newMessage', {
    //     //     from: message.from,
    //     //     text: message.text,
    //     //     createdAt: date.getTime()
    //     // });
    //
    //     //fire message to everybody but my self
    //
    //     /*
    //     socket.broadcast.emit('newMessage', {
    //         from: message.from,
    //         text: message.text,
    //         createdAt: date.getTime()
    //     });
    //     */
    // });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`App started on port ${port}`);
});

