const initialState = { time: 0 }

export default (state = initialState, action) => {
	// console.log(action)
	switch(action.type) {
		case 'GET_TEST_REQUEST':
			return 'no data'
		case 'GET_TEST_SUCCESS':
			return action.payload
		case 'FETCH_SCHOOL_MESSAGES_FAIL':
			return 'error'
		default:
			return state
	}
}