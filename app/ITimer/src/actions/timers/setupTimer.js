import { CALL_API } from 'redux-api-middleware'

export default (value) => dispatch => dispatch({
	[CALL_API]: {
		endpoint: `http://localhost:9090/timers`,
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
		method: 'POST',
		body: JSON.stringify(value),
		types: [
			'SETUP_TIMER_REQUEST',
			'SETUP_TIMER_SUCCESS',
			'SETUP_TIMER_FAILURE'
	    ]
	}
})