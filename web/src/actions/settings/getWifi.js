import { CALL_API } from 'redux-api-middleware'

export default () => dispatch => dispatch({
	[CALL_API]: {
		endpoint: `${__API__}/wifi`,
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
		method: 'GET',
		types: [
			'GET_WIFI_REQUEST',
			'GET_WIFI_SUCCESS',
			'GET_WIFI_FAILURE'
	    ]
	}
})