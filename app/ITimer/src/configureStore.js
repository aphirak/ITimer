import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from 'ITimer/src/reducers'

export default () => {
	const middlewares = [thunk]
	const store = createStore(
		rootReducer,
		applyMiddleware(...middlewares)
	)
	return store
}