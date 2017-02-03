import { combineReducers } from 'redux'
import { routerReducer  } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import testReducers from 'reducers/testReducers'
import timerReducers from 'reducers/timerReducers'
import competitionReducers from 'reducers/competitionReducers'
import userReducers from 'reducers/userReducers'

export default combineReducers({
	routing: routerReducer,
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
	user: userReducers
})