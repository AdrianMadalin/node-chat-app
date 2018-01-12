const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const port = process.env.PORT || 8080;
const publicPath = path.join(__dirname, '../public');

let server = http.createServer(app);
let io = socketIO(server);

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`App started on port ${port}`);
});

