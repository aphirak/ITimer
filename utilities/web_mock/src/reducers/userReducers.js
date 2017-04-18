const initialState = {
	isFetchedUserById: false,
	value: {},
	values: []
}

export default (state = initialState, action) => {
	switch (action.type) {
		case 'GET_USERS_SUCCESS':
			return {
				...state,
				values: action.payload
			}
		case 'GET_USER_BY_ID_SUCCESS':
			return {
				...state,
				isFetchedUserById: true,
				value: {
					...state.value,
					[action.payload.id]: action.payload
				}
			}
		default:
			return state
	}
}
