import axios from 'axios'

const requestStart = () => ({
	type: 'RESET_COMPETTIONS_REQUEST'
})

const requestSuccess = (res) => ({
	type: 'RESET_COMPETTIONS_SUCCESS',
	payload: res.data
})

const requestFailure = (err) => ({
	type: 'RESET_COMPETTIONS_FAILURE',
	payload: err
})

export default () => dispatch => {
	dispatch(requestStart())
	axios.delete('http://localhost:9090/competitions')
		.then((res) => {
			dispatch(requestSuccess(res))
		})
		.catch((err) => {
			dispatch(requestFailure(err))
		})
}