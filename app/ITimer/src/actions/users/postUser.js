import axios from 'axios'
import config from 'ITimer/config'

const requestStart = () => ({
	type: 'POST_USERS_REQUEST'
})

const requestSuccess = (res) => ({
	type: 'POST_USERS_SUCCESS',
	payload: res.data
})

const requestFailure = (err) => ({
	type: 'POST_USERS_FAILURE',
	payload: err
})

export default (value) => dispatch => {
	dispatch(requestStart())
	axios.post(`${config.host}/users`, value)
		.then((res) => {
			dispatch(requestSuccess(res))
		})
		.catch((err) => {
			dispatch(requestFailure(err))
		})
}