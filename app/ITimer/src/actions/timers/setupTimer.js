import axios from 'axios'
import config from 'ITimer/config'

const requestStart = () => ({
	type: 'SETUP_TIMER_REQUEST'
})

const requestSuccess = (res) => ({
	type: 'SETUP_TIMER_SUCCESS',
	payload: res.data
})

const requestFailure = (err) => ({
	type: 'SETUP_TIMER_FAILURE',
	payload: err
})

export default (value) => dispatch => {
	dispatch(requestStart())
	axios.post(`${config.API}/timers`, value)
		.then((res) => {
			dispatch(requestSuccess(res))
		})
		.catch((err) => {
			dispatch(requestFailure(err))
		})
}