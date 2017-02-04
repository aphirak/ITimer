import axios from 'axios'

const requestStart = () => ({
	type: 'LOAD_TEST_REQUEST'
})

const requestSuccess = (res) => ({
	type: 'LOAD_TEST_SUCCESS',
	payload: res.data
})

const requestFailure = (err) => ({
	type: 'LOAD_TEST_FAILURE',
	payload: err
})

export default () => dispatch => {
	dispatch(requestStart())
	axios.get('https://jsonplaceholder.typicode.com/posts')
		.then((res) => {
			dispatch(requestSuccess(res))
		})
		.catch((err) => {
			dispatch(requestFailure(err))
		})
}