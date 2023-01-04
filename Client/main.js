import { io } from 'socket.io-client';

const socket = io('ws://localhost:3001', {
	withCredentials: true,
});

socket.on('connect', () => {
	console.log('connect');
});

socket.on('server', data => {
	console.log(data);
});

socket.emit('client', '클라이언트 입니다.');

socket.on('welcome', data => {
	console.log(data);
});

socket.emit('join', 1);

const input = document.querySelector('input');
const button = document.querySelector('button');
const chatDiv = document.querySelector('.chat');

socket.on('chat', data => {
	const chat = document.createElement('div');
	chat.innerText = data;
	chatDiv.appendChild(chat);
});

button.addEventListener('click', () => {
	console.log(input.value);
	socket.emit('chat', input.value, 1);
	input.value = '';
});

const liveDiv = document.querySelector('.live');

socket.on('liveChat', data => {
	liveDiv.innerText = data;
});

input.addEventListener('keyup', () => {
	socket.emit('liveChat', input.value, 1);
});
