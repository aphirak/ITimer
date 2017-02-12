import socket from 'socket.io-client'
import config from 'ITimer/config'

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
        const io = socket(config.host, {jsonp: false})
		io.on('timer', (response) => {
			dispatch(requestSuccess(response))
		})
	}
}