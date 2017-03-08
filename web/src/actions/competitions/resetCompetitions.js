import { CALL_API } from 'redux-api-middleware'

export default (value) => dispatch => dispatch({
	[CALL_API]: {
		endpoint: `${__API__}/competitions`,
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
		method: 'DELETE',
		types: [
			'RESET_COMPETTIONS_REQUEST',
			'RESET_COMPETTIONS_SUCCESS',
			'RESET_COMPETTIONS_FAILURE'
	    ]
	}
})