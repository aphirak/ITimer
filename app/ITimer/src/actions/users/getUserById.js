import axios from 'axios'
import config from 'ITimer/config'

const requestStart = () => ({
	type: 'GET_USER_BY_ID_REQUEST'
})

const requestSuccess = (res) => ({
	type: 'GET_USER_BY_ID_SUCCESS',
	payload: res.data
})

const requestFailure = (err) => ({
	type: 'GET_USER_BY_ID_FAILURE',
	payload: err
})

export default (id) => dispatch => {
	dispatch(requestStart())
	axios.get(`${config.API}/users/${id}`)
		.then((res) => {
			dispatch(requestSuccess(res))
		})
		.catch((err) => {
			dispatch(requestFailure(err))
		})
}