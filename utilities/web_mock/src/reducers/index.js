import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import timerReducers from 'reducers/timerReducers'
import competitionReducers from 'reducers/competitionReducers'
import userReducers from 'reducers/userReducers'
import historyReducers from 'reducers/historyReducers'
import wifiReducers from 'reducers/wifiReducers'

export default combineReducers({
	routing: routerReducer,
	form: formReducer.plugin({
		timerForm: (state, action) => {
			switch (action.type) {
				case 'GET_TIMER_SUCCESS':
					return {
						...state,
						values: {
							uid: action.payload.uid,
							nPhase: action.payload.nPhase,
							mode: action.payload.mode || 'sprint'
						}
					}
				default:
					return state
			}
		}
	}),
	timer: timerReducers,
	competition: competitionReducers,
	user: userReducers,
	history: historyReducers,
	wifi: wifiReducers
})
