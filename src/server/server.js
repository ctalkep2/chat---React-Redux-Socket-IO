const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let users = [];
let activeUsers = [];
let activeSocketUsers = [];
let usersMessages = [];

io.on('connection', (socket) => {

	socket.on('userSignUp', currentUser => {
		let validation = true;

		activeUsers.forEach((user, id) => {
			if (currentUser.nickName === user) validation = false;
		});

		users.forEach((user, id) => {
			if (currentUser.nickName === user.nickName) validation = false;
		});

		if (validation === true) {
			users.push({
				nickName: currentUser.nickName,
				password: currentUser.password
			});

			activeUsers.push(currentUser.nickName);

			activeSocketUsers.push({
				nickName: currentUser.nickName, 
				socket: socket.id
			});

			socket.emit('userValidation', validation);
		}
	});

	socket.on('userLogin', currentUser => {
		let validation = false;

		users.forEach((user, id) => {
			if (
				user.nickName === currentUser.nickName & 
				user.password === currentUser.password
				) validation = true;
		});

		activeUsers.forEach((user, id) => {
			if (currentUser.nickName === user) validation = false;
		});

		if (validation === true) {
			activeUsers.push(currentUser.nickName);

			activeSocketUsers.push({
				nickName: currentUser.nickName, 
				socket: socket.id
			});
		}

		socket.emit('userValidation', validation);
	});

	socket.on('userOut', currentUser => {
		activeUsers = activeUsers.filter(user => user !== currentUser);
		activeSocketUsers = activeSocketUsers.filter(user => user.nickName !== currentUser);
	});

	socket.on('close_conn', () => {
		socket.emit('close_conn');
	});

	socket.on('userUpdate', () => {
		socket.broadcast.emit('userUpdate', activeUsers);
		socket.emit('userUpdate', activeUsers);
	});

	socket.on('addMessage', message => {
		usersMessages.push(message);
	});

	socket.on('returnMessage', () => {
		socket.emit('returnMessage', usersMessages);
		socket.broadcast.emit('returnMessage', usersMessages);
	});

	socket.on('userValidation', nickName => {
		let validation = false;

		if (activeUsers.length !== 0) validation = true;

		activeUsers.forEach((user, id) => {
			if (user === nickName) validation = false;
		});

		socket.emit('userValidation', validation);
	});

	socket.on('userRegisterValidation', nickName => {
		let validation = true;

		users.forEach((user, id) => {
			if (user.nickName === nickName) validation = false;
		});

		socket.emit('userRegisterValidation', validation);
	});

	socket.on('disconnect', () => {
		activeSocketUsers = activeSocketUsers.filter(user => {
			if (user.socket === socket.id) {
				activeUsers = activeUsers.filter(actUser => user === user.nickName);
			}
			return user.socket !== socket.id
		});

		socket.broadcast.emit('userUpdate', activeUsers);
		socket.emit('userUpdate', activeUsers);
	});
});

http.listen(8081, () => {
	console.log('listening on: 8081');
});