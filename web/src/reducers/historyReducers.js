const initialState = {
	valuesByUserId: []
}

export default (state = initialState, action) => {
	switch (action.type) {
		case 'GET_HISTORIES_BY_USER_ID_SUCCESS':
			return {
				...state,
				valuesByUserId: action.payload
			}
		default:
			return state
	}
}
