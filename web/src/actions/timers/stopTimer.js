import { CALL_API } from 'redux-api-middleware'

export default (value) => dispatch => dispatch({
	[CALL_API]: {
		endpoint: `${__API__}/timers`,
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
		method: 'DELETE',
		types: [
			'STOP_TIMER_REQUEST',
			'STOP_TIMER_SUCCESS',
			'STOP_TIMER_FAILURE'
	    ]
	}
})