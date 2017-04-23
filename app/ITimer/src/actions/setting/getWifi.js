import axios from 'axios'
import config from 'ITimer/config'

const requestStart = () => ({
	type: 'GET_WIFI_REQUEST'
})

const requestSuccess = (res) => ({
	type: 'GET_WIFI_SUCCESS',
	payload: res.data
})

const requestFailure = (err) => ({
	type: 'GET_WIFI_FAILURE',
	payload: err
})

export default () => dispatch => {
	dispatch(requestStart())
	axios.get(`${config.API}/wifi`)
		.then((res) => {
			dispatch(requestSuccess(res))
		})
		.catch((err) => {
			dispatch(requestFailure(err))
		})
}