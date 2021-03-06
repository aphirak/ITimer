import { CALL_API } from 'redux-api-middleware'

export default () => dispatch => dispatch({
	[CALL_API]: {
		endpoint: `${process.env.API}/users`,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'GET',
		types: [
			'GET_USERS_REQUEST',
			'GET_USERS_SUCCESS',
			'GET_USERS_FAILURE'
		]
	}
})
