const initialState = {
	gate: 0,
	isSetup: false,
	isStarted: false,
	results: [],
	time: undefined,
	uid: undefined,
	nPhase: undefined,
	distances: []
}

export default (state = initialState, action) => {
	switch (action.type) {
		case 'GET_TIMER_SUCCESS':
			return {
				...state,
				...action.payload
			}
		case 'SET_ISSETUP_TIMER':
			return {
				...state,
				isSetup: action.payload
			}
		default:
			return state
	}
}
