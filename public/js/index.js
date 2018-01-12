$(document).ready(function () {

});

let socket = io();  // create connection to socket

socket.on('connect', function () {
    console.log('Client connected');
});

socket.on('disconnect', function (reason) {
    console.log('Client disconnect from server');
    console.log(reason);
});

socket.on('newMessage', function (message) {
    console.log('New message ',message);
    let li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);
});

$('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        message: $('[name=message]').val()
    }, function (response) {
        // console.log(JSON.stringify(response,undefined,2));
    });
});
