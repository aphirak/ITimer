import axios from 'axios'
import config from 'ITimer/config'

const requestStart = () => ({
	type: 'GET_HISTORIES_BY_USER_ID_REQUEST'
})

const requestSuccess = (res) => ({
	type: 'GET_HISTORIES_BY_USER_ID_SUCCESS',
	payload: res.data
})

const requestFailure = (err) => ({
	type: 'GET_HISTORIES_BY_USER_ID_FAILURE',
	payload: err
})

export default (id) => dispatch => {
	dispatch(requestStart())
	axios.get(`${config.host}/users/${id}/histories`)
		.then((res) => {
			dispatch(requestSuccess(res))
		})
		.catch((err) => {
			dispatch(requestFailure(err))
		})
}