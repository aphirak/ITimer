import React from 'react'
import { Scene, Router, Actions } from 'react-native-router-flux'
import { Text } from 'react-native'
import { App, Timer, Competition, User } from 'ITimer/src/containers'

export default () => {
	return (
		<Router>
			<Scene key='app' component={App} hideNavBar={true}>
				<Scene key='competition' component={Competition} title='Competition' hideNavBar />
				<Scene key='timer' component={Timer} title='Timer' hideNavBar />
				<Scene key='user' component={User} title='User' hideNavBar />
			</Scene>
		</Router>
	)
}