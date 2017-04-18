const initialState = {
	values: [],
	detail: {
		ssid: 'Not Found',
		status: 'Unconnected'
	}
}

export default (state = initialState, action) => {
	switch (action.type) {
		case 'GET_WIFI_SUCCESS':
			return {
				...state,
				values: action.payload
			}
		case 'POST_WIFI_SUCCESS':
			return {
				...state,
				detail: action.payload
			}
		default:
			return state
	}
}
