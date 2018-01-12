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
    console.log('New message ', message);
    let li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);
});

socket.on('newLocationMessage', function (locMessage) {
    console.log('New message ', locMessage);

    let li = $('<li></li>');
    let a = $('<a target="_blank">My current location</a>');
    li.text(`${locMessage.from}: `);
    a.attr('href', locMessage.url);
    li.append(a);
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

let locationButton = $('#send-location');

locationButton.on('click', function (e) {
    if (!navigator.geolocation) {
        return alert(`Geolocation not supported by your browser`);
    }
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMssage', {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });
        console.log(position);
    }, function (error) {
        return alert(`Unable tp share location`);
    })
});

