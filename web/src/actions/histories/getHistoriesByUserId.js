import { CALL_API } from 'redux-api-middleware'

export default (id) => dispatch => dispatch({
	[CALL_API]: {
		endpoint: `${__API__}/users/${id}/histories`,
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
		method: 'GET',
		types: [
			'GET_HISTORIES_BY_USER_ID_REQUEST',
			'GET_HISTORIES_BY_USER_ID_SUCCESS',
			'GET_HISTORIES_BY_USER_ID_FAILURE'
	    ]
	}
})