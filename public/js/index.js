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
        $('.response1').text(`From: ${res.user}`);
        $('.response2').text(`Message: ${res.message}`);
         console.log(res);
     }
 });

 socket.on('clientMessage', function (res) {
     if (res.length !== 0){
        $('.response1').text(`From: ${res.user}`);
        $('.response2').text(`Message: ${res.message}`);
         console.log(res);
     }
 });





