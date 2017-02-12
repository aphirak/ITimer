import socket from 'socket.io-client'

const requestFetch = () => {
    return {
        type : 'GET_TIMER_REQUEST'
    }
}

const requestSuccess = (response) =>  {
    return{
        type : 'GET_TIMER_SUCCESS',
        payload : response
    }
}

const requestFail = (error) =>  {
    return{
        type : 'GET_TIMER_FAIL'
    }
}

export default () => {
	return (dispatch) => {
		dispatch(requestFetch())
        const io = socket(__API__)
		io.on('timer', (response) => {
			dispatch(requestSuccess(response))
		})
	}
}