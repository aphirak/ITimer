import { CALL_API } from 'redux-api-middleware'
import { push } from 'react-router-redux'

export default (id) => dispatch => dispatch({
	[CALL_API]: {
		endpoint: `http://localhost:9090/users/${id}`,
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
		method: 'DELETE',
		types: [
			'DELETE_USER_REQUEST',
			{
				type: 'DELETE_USER_SUCCESS',
				payload: (action, state, res) => {
					dispatch(push('/user'))
				}
			},
			'DELETE_USER_FAILURE'
	    ]
	}
})