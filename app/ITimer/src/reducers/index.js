import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import testReducers from 'ITimer/src/reducers/testReducers'
import competitionReducers from 'ITimer/src/reducers/competitionReducers'
import userReducers from 'ITimer/src/reducers/userReducers'
import timerReducers from 'ITimer/src/reducers/timerReducers'
import historyReducers from 'ITimer/src/reducers/historyReducers'

export default combineReducers({
	form: formReducer.plugin({
	    timerForm: (state, action) => {
			switch(action.type) {
				case 'GET_TIMER_SUCCESS':
					return {
						...state,
						values: {
							uid: action.payload.uid,
							nGate: action.payload.nGate,
							distances: action.payload.distances,
						}
					}
				default:
					return state
			}
		}
	}),
	test: testReducers,
	timer: timerReducers,
	competition: competitionReducers,
	user: userReducers,
	history: historyReducers
})