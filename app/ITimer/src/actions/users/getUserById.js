import axios from 'axios'

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
	axios.get(`http://localhost:9090/users/${id}`)
		.then((res) => {
			dispatch(requestSuccess(res))
		})
		.catch((err) => {
			dispatch(requestFailure(err))
		})
}