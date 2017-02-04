import React from 'react'
import { Scene, Router, Actions } from 'react-native-router-flux'
import Home from 'ITimer/src/containers/Home'

export default () => {
	return (
		<Router sceneStyle={{ paddingTop: 65 }}>
			<Scene key='home' component={Home} title='Home' />
		</Router>
	)
}