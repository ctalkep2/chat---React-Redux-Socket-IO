export const ADD_USER = 'ADD_USER';
export const SAVE_MESSAGES = 'SAVE_MESSAGES';
export const USER_LOGOUT = 'USER_LOGOUT';
export const CURRENT_USER = 'CURRENT_USER';
export const USER_UPDATE = 'USER_UPDATE';
export const MESSAGES_UPDATE = 'MESSAGES_UPDATE';
export const USER_VALIDATE = 'USER_VALIDATE';
export const CURRENT_USER_WRAPPER = 'CURRENT_USER_WRAPPER';

export function addUser(nickName) {
	return {
		type: ADD_USER,
		nick: nickName
	}
};

export function currentUser(nickName) {
	return {
		type: CURRENT_USER,
		nick: nickName
	}
}

export function validateUser(validUser) {
	return {
		type: USER_VALIDATE,
		validate: validUser
	}
}

export function saveMessage(message) {
	return {
		type: SAVE_MESSAGES,
		msg: message
	}
}

export function userLogout(nickName) {
	return {
		type: USER_LOGOUT,
		nick: nickName
	}
}

export function userUpdate(userList) {
	return {
		type: USER_UPDATE,
		users: userList
	}
}

export function currentUserWrapper(nickName) {
	return {
		type: CURRENT_USER_WRAPPER,
		currentUserWrapper: nickName
	}
}

export function messagesUpdate(usersMessages) {
	return {
		type: MESSAGES_UPDATE,
		messages: usersMessages
	}
}