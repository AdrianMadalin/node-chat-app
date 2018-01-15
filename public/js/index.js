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
    let template = $('#message-template').html();
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formatedTime
    });
    $('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {
    console.log('New message ', message);
    let formatedTime = moment(message.createdAt).format('h:mm a');
    let template = $('#location-message-template').html();
    let html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formatedTime
    });

    $('#messages').append(html);
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

