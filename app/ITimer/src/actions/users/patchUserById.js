import axios from 'axios'
import config from 'ITimer/config'

const requestStart = () => ({
	type: 'PATCH_USER_REQUEST'
})

const requestSuccess = (res) => ({
	type: 'PATCH_USER_SUCCESS',
	payload: res.data
})

const requestFailure = (err) => ({
	type: 'PATCH_USER_FAILURE',
	payload: err
})

export default (value, id) => dispatch => {
	dispatch(requestStart())
	axios.patch(`${config.host}/users/${id}`, value)
		.then((res) => {
			dispatch(requestSuccess(res))
		})
		.catch((err) => {
			dispatch(requestFailure(err))
		})
}