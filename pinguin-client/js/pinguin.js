"use strict";

// const socket = io('http://127.0.0.1:2222');
// const socket = io('https://pinguin-server.herokuapp.com/');
// const socket = io('195.239.5.90:8081', {path: '/api/ws'});
// const socket = io('https://pinguin-server.herokuapp.com/', {transports: ['websocket']});
const socket = io('http://195.239.5.90:8081');
console.log('fuck!');

const input = document.body.querySelector('input');
const button = document.body.querySelector('button');
const info = document.body.querySelector('i');
const reaction = document.body.querySelector('b');

button.addEventListener('click', () => {
	socket.emit('testing event', {message: input.value});
});

socket.on('connect', function(){
	socket.on('pinguin', function(data){
		console.log(data);
	});

	socket.on('testing success', function(data){
		info.textContent = data.overheared;
		reaction.textContent = data.reaction;
	});

	window.onunload = function() {
		socket.disconnect();
	};
});