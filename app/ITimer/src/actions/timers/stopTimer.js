import axios from 'axios'
import config from 'ITimer/config'

const requestStart = () => ({
	type: 'STOP_TIMER_REQUEST'
})

const requestSuccess = (res) => ({
	type: 'STOP_TIMER_SUCCESS',
	payload: res.data
})

const requestFailure = (err) => ({
	type: 'STOP_TIMER_FAILURE',
	payload: err
})

export default () => dispatch => {
	dispatch(requestStart())
	axios.delete(`${config.API}/timers`)
		.then((res) => {
			dispatch(requestSuccess(res))
		})
		.catch((err) => {
			dispatch(requestFailure(err))
		})
}