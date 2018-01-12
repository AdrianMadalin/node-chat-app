$(document).ready(function () {

});

let socket = io();  // create connection to socket

 socket.on('connect', function()  {
    console.log('Client connected');
});

socket.on('disconnect', function(reason) {
    console.log('Client disconnect from server');
    console.log(reason);
});

 socket.on('newMessage', function (res) {
     if (res.length !== 0){
        $('.response1').text(`From: ${res.from}`);
        $('.response2').text(`Message: ${res.text}`);
         console.log(res);
     }
 });

// socket.emit('createMessage',{from: 'Fanel', text: 'Salut'});




