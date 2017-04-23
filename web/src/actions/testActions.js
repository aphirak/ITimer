// import axios from 'axios'
import socket from 'socket.io-client'
let io = socket(__API__)

const requestFetch = () => {
    return {
        type : 'GET_TEST_REQUEST'
    }
}

const requestSuccessFetch = (response) =>  {
    return{
        type : 'GET_TEST_SUCCESS',
        payload : response
    }
}

const requestFailFetch = (error) =>  {
    return{
        type : 'FETCH_SCHOOL_MESSAGES_FAIL',
        error : error
    }
}



export const getTest = () => {
	return (dispatch) => {
		// io.on('timer', (data) => {
		// 	console.log(data)
		// })
		console.log('aaa')
		dispatch(requestFetch())
		io.on('timer', (data) => {
			// console.log(data)
			dispatch(requestSuccessFetch(data))
		})



		// axios.get('https://jsonplaceholder.typicode.com/posts')
		//   .then((response) => {
		//   	console.log(response.data)
		// 	dispatch(requestSuccessFetch(response))
		//   })
		//   .catch((error) => {
		// 	dispatch(requestFailFetch())
		//   })
	}
}

// import { CALL_API } from 'redux-api-middleware'

// export const getTest = () => dispatch => dispatch({
// 	[CALL_API]: {
// 		endpoint: `https://www.regis.ku.ac.th/cpcmns/kugradNew/mis/gr_advisor_book.php`,
// 		method: 'POST',
// 		types: [
// 			'GET_TEST_REQUEST',
// 			{
// 	            type: 'GET_TEST_SUCCESS',
// 	            payload: (action, state, res) => {
// 	            	console.log(res)
// 					return res.json().then((json) => {
// 						dispatch(push(`/`))
// 						return json
// 					})
// 	            }
// 			},
// 			'GET_TEST_FAILURE'
// 	    ]
// 	}
// })

		// headers: {
		//   'Accept': 'application/json',
		//   'Content-Type': 'application/json'
		// },


		// .json().then((json) => {
		// 				dispatch(push(`/`))
		// 				return json
		// 			})