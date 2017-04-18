import socket from 'socket.io-client'

const requestFetch = () => {
	return {
		type: 'GET_TIMER_REQUEST'
	}
}

const requestSuccess = (response) => {
	return {
		type: 'GET_TIMER_SUCCESS',
		payload: response
	}
}

export default () => {
	return (dispatch) => {
		dispatch(requestFetch())
		const io = socket(process.env.API)
		io.on('timer', (response) => {
			dispatch(requestSuccess(response))
		})
	}
}
