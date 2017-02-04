import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { apiMiddleware } from 'redux-api-middleware'
import rootReducer from 'ITimer/src/reducers'

export default () => {
	const middlewares = [thunk, apiMiddleware]
	const store = createStore(
		rootReducer,
		applyMiddleware(...middlewares)
	)
	return store
}