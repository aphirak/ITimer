import { CALL_API } from 'redux-api-middleware'

export default (value) => dispatch => dispatch({
	[CALL_API]: {
		endpoint: `${__API__}/wifi`,
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
		method: 'POST',
		body: JSON.stringify(value),
		types: [
			'POST_WIFI_REQUEST',
			'POST_WIFI_SUCCESS',
			'POST_WIFI_FAILURE'
	    ]
	}
})