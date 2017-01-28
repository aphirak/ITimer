import { CALL_API } from 'redux-api-middleware'

export const getTest = () => dispatch => dispatch({
	[CALL_API]: {
		endpoint: `https://www.regis.ku.ac.th/cpcmns/kugradNew/mis/gr_advisor_book.php`,
		method: 'POST',
		types: [
			'GET_TEST_REQUEST',
			{
	            type: 'GET_TEST_SUCCESS',
	            payload: (action, state, res) => {
	            	console.log(res)
					return res.json().then((json) => {
						dispatch(push(`/`))
						return json
					})
	            }
			},
			'GET_TEST_FAILURE'
	    ]
	}
})

		// headers: {
		//   'Accept': 'application/json',
		//   'Content-Type': 'application/json'
		// },


		// .json().then((json) => {
		// 				dispatch(push(`/`))
		// 				return json
		// 			})