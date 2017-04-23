import { CALL_API } from 'redux-api-middleware'

export default () => dispatch => dispatch({
	[CALL_API]: {
		endpoint: `${process.env.API}/wifis/connected`,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'GET',
		types: [
			'GET_WIFI_CONNECTED_REQUEST',
			'GET_WIFI_CONNECTED_SUCCESS',
			'GET_WIFI_CONNECTED_FAILURE'
		]
	}
})
