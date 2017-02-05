import React from 'react'
import { Scene, Router, Actions } from 'react-native-router-flux'
import { Text } from 'react-native'
import { Timer, Competition, User } from 'ITimer/src/containers'

export default () => {
	return (
		<Router sceneStyle={{ paddingTop: 65 }}>
			<Scene key='competition' component={Competition} title='Competition' />
			<Scene key='timer' component={Timer} title='Timer' />
			<Scene key='user' component={User} title='User' />
		</Router>
	)
}