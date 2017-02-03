import { CALL_API } from 'redux-api-middleware'

export default (id) => dispatch => dispatch({
	[CALL_API]: {
		endpoint: `http://localhost:9090/users/${id}`,
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
		method: 'GET',
		types: [
			'GET_USER_BY_ID_REQUEST',
			'GET_USER_BY_ID_SUCCESS',
			'GET_USER_BY_ID_FAILURE'
	    ]
	}
})