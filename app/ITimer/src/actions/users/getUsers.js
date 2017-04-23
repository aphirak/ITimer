import axios from 'axios'
import config from 'ITimer/config'

const requestStart = () => ({
	type: 'GET_USERS_REQUEST'
})

const requestSuccess = (res) => ({
	type: 'GET_USERS_SUCCESS',
	payload: res.data
})

const requestFailure = (err) => ({
	type: 'GET_USERS_FAILURE',
	payload: err
})

export default () => dispatch => {
	dispatch(requestStart())
	axios.get(`${config.API}/users`)
		.then((res) => {
			dispatch(requestSuccess(res))
		})
		.catch((err) => {
			dispatch(requestFailure(err))
		})
}