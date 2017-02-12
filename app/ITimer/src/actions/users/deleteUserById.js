import axios from 'axios'
import config from 'ITimer/config'

const requestStart = () => ({
	type: 'DELETE_USER_REQUEST'
})

const requestSuccess = (res) => ({
	type: 'DELETE_USER_SUCCESS',
	payload: res.data
})

const requestFailure = (err) => ({
	type: 'DELETE_USER_FAILURE',
	payload: err
})

export default (id) => dispatch => {
	dispatch(requestStart())
	axios.delete(`${config.host}/users/${id}`)
		.then((res) => {
			dispatch(requestSuccess(res))
		})
		.catch((err) => {
			dispatch(requestFailure(err))
		})
}