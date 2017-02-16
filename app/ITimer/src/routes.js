import React from 'react'
import { Scene, Router, Actions } from 'react-native-router-flux'
import { Text } from 'react-native'
import { 
	App,
	Timer, 
	Competition, 
	ListUser, 
	Page2,
	ProfileUser,
	AddUser,
	EditUser,
	ListHistoryUser,
	Setting
} from 'ITimer/src/containers'

export default () => (
	<Router>
		<Scene key='app' component={App} >
			<Scene key='competition' component={Competition} title='Competition' hideNavBar />
			<Scene key='timer' component={Timer} title='Timer' hideNavBar />
			<Scene key='listUser' component={ListUser} title='User' leftNav={() => Actions.addUser({ type: "reset" })} leftNavIcon='md-person-add' rightNav={() => Actions.setting({ type: "reset" })} rightNavIcon='md-settings' hideNavBar />
			<Scene key='profileUser' component={ProfileUser} title='User Profile' leftNav={() => Actions.listUser({ type: "reset" })} leftNavIcon='arrow-back' rightNav={() => Actions.editUser({ type: 'reset'})} rightNavIcon='md-create' />
			<Scene key='addUser' component={AddUser} title='User' leftNav={() => Actions.listUser({ type: "reset" })} leftNavIcon='arrow-back' />
			<Scene key='editUser' component={EditUser} title='User' leftNav={() => Actions.listUser({ type: "reset" })} leftNavIcon='arrow-back' />
			<Scene key='history' component={ListHistoryUser} title='History' />
			<Scene key='setting' component={Setting} title='Setting' />
			<Scene key='page2' component={Page2} title='page2' />
		</Scene>
	</Router>
)
