import React from 'react'
import { Scene, Router, Actions } from 'react-native-router-flux'
import { Text } from 'react-native'
import { App, Timer, Competition, User, Page2 } from 'ITimer/src/containers'

export default () => {
	return (
		<Router>
			<Scene key='app' component={App} hideNavBar={true}>
				<Scene key='competition' component={Competition} title='Competition' aaa={() => alert('eieiza')} hideNavBar />
				<Scene key='timer' component={Timer} title='Timer' hideNavBar />
				<Scene key='user' component={User} title='User' hideNavBar />
			</Scene>
			<Scene key='page2' component={Page2} title='page2' />
		</Router>
	)
}