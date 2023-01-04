import { createServer } from 'http';
import { Server } from 'socket.io';
import express from 'express';

const app = express();
const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: ['http://localhost:4000', 'http://10.58.52.96:4000'],
		credentials: true,
	},
});

io.on('connect', socket => {
	socket.on('client', data => {
		console.log(data);
	});
	socket.emit('server', '서버입니다');

	socket.on('join', key => {
		socket.join(key);
		socket.to(key).emit('welcome', `welcome ${key}를 통해 연결 하였습니다.`);
	});

	socket.on('chat', (chat, key) => {
		socket.to(key).emit('chat', chat);
	});

	socket.on('liveChat', (liveChat, key) => {
		socket.to(key).emit('liveChat', liveChat);
	});
});

io.listen(3001);
