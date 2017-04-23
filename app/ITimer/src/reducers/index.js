import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import testReducers from 'ITimer/src/reducers/testReducers'
import competitionReducers from 'ITimer/src/reducers/competitionReducers'
import userReducers from 'ITimer/src/reducers/userReducers'
import timerReducers from 'ITimer/src/reducers/timerReducers'
import historyReducers from 'ITimer/src/reducers/historyReducers'
import wifiReducers from 'ITimer/src/reducers/wifiReducers'

export default combineReducers({
	form: formReducer,
	test: testReducers,
	timer: timerReducers,
	competition: competitionReducers,
	user: userReducers,
	history: historyReducers,
	wifi: wifiReducers
})