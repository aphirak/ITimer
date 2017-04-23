import axios from 'axios'
import { Actions } from 'react-native-router-flux'
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
	axios.post(`${config.API}/users`, value)
		.then((res) => {
			Actions.listUser({ type: 'reset' })
			dispatch(requestSuccess(res))
		})
		.catch((err) => {
			dispatch(requestFailure(err))
		})
}