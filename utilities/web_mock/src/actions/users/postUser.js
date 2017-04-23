import { CALL_API } from 'redux-api-middleware'
import { push } from 'react-router-redux'

export default (value) => dispatch => dispatch({
	[CALL_API]: {
		endpoint: `${process.env.API}/users`,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify(value),
		types: [
			'POST_USERS_REQUEST',
			{
				type: 'POST_USERS_SUCCESS',
				payload: (action, state, res) => {
					return res.json().then((user) => {
						dispatch(push('/user'))
						return user
					})
				}
			},
			'POST_USERS_FAILURE'
		]
	}
})
