import socket from 'socket.io-client'
const io = socket('http://localhost:9090')

const requestFetch = () => {
    return {
        type : 'GET_COMPETITIONS_REQUEST'
    }
}

const requestSuccess = (response) =>  {
    return{
        type : 'GET_COMPETITIONS_SUCCESS',
        payload : response
    }
}

const requestFail = (error) =>  {
    return{
        type : 'GET_COMPETITIONS_FAIL'
    }
}

export default () => {
	return (dispatch) => {
		dispatch(requestFetch())
		io.on('competitions', (response) => {
			dispatch(requestSuccess(response))
		})
	}
}