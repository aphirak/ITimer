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
	Setting,
	DetailHistory,
	ChartHistory
} from 'ITimer/src/containers'

export default () => (
	<Router>
		<Scene key='app' component={App} >
			<Scene key='competition' component={Competition} title='Competition' hideNavBar />
			<Scene key='timer' component={Timer} title='Timer' hideNavBar />
			<Scene key='listUser' component={ListUser} title='User' rightNav={() => Actions.addUser({ type: "reset" })} rightNavIcon='md-person-add' />
			<Scene key='profileUser' component={ProfileUser} title='User Profile' leftNav={() => Actions.listUser({ type: "reset" })} leftNavIcon='arrow-back' />
			<Scene key='addUser' component={AddUser} title='User' leftNav={() => Actions.listUser({ type: "reset" })} leftNavIcon='arrow-back' />
			<Scene key='editUser' component={EditUser} title='User' leftNav={() => Actions.listUser({ type: "reset" })} leftNavIcon='arrow-back' />
			<Scene key='history' component={ListHistoryUser} title='History' leftNav={() => Actions.listUser({ type: "reset" })} leftNavIcon='arrow-back' />
			<Scene key='setting' component={Setting} title='Setting' />
			<Scene key='detailHistory' component={DetailHistory} title='Detail' leftNav={() => Actions.listUser({ type: "reset" })} leftNavIcon='arrow-back' />
			<Scene key='chartHistory' component={ChartHistory} title='Chart' />
			<Scene key='page2' component={Page2} title='page2' />
		</Scene>
	</Router>
)
