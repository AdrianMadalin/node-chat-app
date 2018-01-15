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
    let formatedTime = moment(message.createdAt).format('h:mm a');
    console.log('New message ', message);
    let li = $('<li></li>');
    li.text(`${message.from} ${formatedTime}:  ${message.text}`);
    $('#messages').append(li);
});

socket.on('newLocationMessage', function (locMessage) {
    console.log('New message ', locMessage);
    let formatedTime = moment(locMessage.createdAt).format('h:mm a');

    let li = $('<li></li>');
    let a = $('<a target="_blank">My current location</a>');
    li.text(`${locMessage.from} ${formatedTime}:  `);
    a.attr('href', locMessage.url);
    li.append(a);
    $('#messages').append(li);
});

$('#message-form').on('submit', function (e) {
    let messageTextBox = $('[name=message]');

    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        message: messageTextBox.val()
    }, function (response) {
        messageTextBox.val('');
    });
});

let locationButton = $('#send-location');

locationButton.on('click', function (e) {
    if (!navigator.geolocation) {
        return alert(`Geolocation not supported by your browser`);
    }

    locationButton.attr('disabled', true).text('Sending address...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled', false).text('Send location');

        socket.emit('createLocationMssage', {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });
        console.log(position);
    }, function (error) {
        locationButton.removeAttr('disabled', false).text('Send location');

        return alert(`Unable tp share location`);
    });
});

