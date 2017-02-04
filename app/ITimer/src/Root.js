import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'ITimer/src/configureStore'
import routes from 'ITimer/src/routes'

const store = configureStore()

export default () => (
	<Provider store={store} key='provider'>
		{routes()}
	</Provider>
)