import { combineReducers } from 'redux'
import testReducers from 'ITimer/src/reducers/testReducers'
import competitionReducers from 'ITimer/src/reducers/competitionReducers'

export default combineReducers({
	test: testReducers,
	competition: competitionReducers
})