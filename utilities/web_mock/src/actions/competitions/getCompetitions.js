import socket from 'socket.io-client'

const requestFetch = () => {
	return {
		type: 'GET_COMPETITIONS_REQUEST'
	}
}

const requestSuccess = (response) => {
	return {
		type: 'GET_COMPETITIONS_SUCCESS',
		payload: response
	}
}

export default () => {
	return (dispatch) => {
		dispatch(requestFetch())
		const io = socket(process.env.SOCKET)
		io.on('competitions', (response) => {
			dispatch(requestSuccess(response))
		})
	}
}
