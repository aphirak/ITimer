import { combineReducers } from 'redux'
import testReducers from 'ITimer/src/reducers/testReducers'
import competitionReducers from 'ITimer/src/reducers/competitionReducers'
import userReducers from 'ITimer/src/reducers/userReducers'

export default combineReducers({
	test: testReducers,
	competition: competitionReducers,
	user: userReducers
})