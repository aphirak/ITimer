import axios from 'axios'
import { Actions } from 'react-native-router-flux'
import config from 'ITimer/config'

const requestStart = () => ({
	type: 'POST_WIFI_REQUEST'
})

const requestSuccess = (res) => ({
	type: 'POST_WIFI_SUCCESS',
	payload: res.data
})

const requestFailure = (err) => ({
	type: 'POST_WIFI_FAILURE',
	payload: err
})

export default (value) => dispatch => {
	dispatch(requestStart())
	axios.post(`${config.host}/wifi`, value)
		.then((res) => {
			dispatch(requestSuccess(res))
		})
		.catch((err) => {
			dispatch(requestFailure(err))
		})
}