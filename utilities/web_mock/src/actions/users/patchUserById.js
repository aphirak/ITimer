import { CALL_API } from 'redux-api-middleware'
import { push } from 'react-router-redux'

export default (value, id) => dispatch => dispatch({
	[CALL_API]: {
		endpoint: `${process.env.API}/users/${id}`,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'PATCH',
		body: JSON.stringify(value),
		types: [
			'PATCH_USER_REQUEST',
			{
				type: 'PATCH_USER_SUCCESS',
				payload: (action, state, res) => {
					return res.json().then((user) => {
						dispatch(push(`/user/${id}`))
						return user
					})
				}
			},
			'PATCH_USER_FAILURE'
		]
	}
})
