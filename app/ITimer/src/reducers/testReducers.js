const initialState = {
	value: {}
}

export default (state = initialState, action) => {
	switch(action.type) {
		case 'LOAD_TEST_SUCCESS':
			return {
				...state,
				value: action.payload
			}
		default:
			return state
	}
}