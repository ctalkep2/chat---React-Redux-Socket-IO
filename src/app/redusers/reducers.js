import * as types from '../actions/actions';

const initialState = {
	usersList: [],
	messages: [],
	userLogin: false,
  currentUser: 'empty',
  currentUserWrapper: 'empty'
};

export function reducers(state = initialState, action) {

	switch (action.type) {

		case types.ADD_USER:
			return {
				...state,
				usersList: [...state.usersList, action.nick]
			};

		case types.USER_UPDATE: 
			return {
				...state,
				usersList: action.users
			};

		case types.CURRENT_USER:
			return {
				...state,
				currentUser: action.nick
			};

		case types.USER_VALIDATE:
			return {
				...state,
				userLogin: action.validate
			};

		case types.SAVE_MESSAGES:
			return {
				...state,
				messages: [...state.messages, action.msg]
			};

		case types.MESSAGES_UPDATE:
			return {
				...state,
				messages: action.messages
			};

		case types.CURRENT_USER_WRAPPER:
			return {
				...state,
				currentUserWrapper: action.currentUserWrapper
			}

		case types.USER_LOGOUT:
			return {
				...state,
				usersList: state.usersList.filter(nick => nick !== action.name)
			};

		default:
			return state;
	}
}