export default (text) => ({
	type : 'TEST_SUCCESS',
	payload : text
})

// import { CALL_API } from 'redux-api-middleware'

// export default () => dispatch => dispatch({
// 	[CALL_API]: {
// 		endpoint: `http://localhost:9090/users`,
// 		headers: {
// 		  'Accept': 'application/json',
// 		  'Content-Type': 'application/json'
// 		},
// 		method: 'GET',
// 		types: [
// 			'LOAD_USER_REQUEST',
// 			'LOAD_USER_SUCCESS',
// 			'LOAD_USER_FAILURE'
// 	    ]
// 	}
// })