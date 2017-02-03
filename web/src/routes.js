import React from 'react'
import {
	Router,
	Route,
	IndexRoute,
	Redirect
} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import {
	App,
	Home,
	Competition,
	Contact,
	History,
	Timer,
	ListUser,
	AddUser,
	EditUser,
	ProfileUser,
	ListHistoryUser
} from 'containers'


export default (store, history) => (
	<Router history={syncHistoryWithStore(history, store)}>
		<Route path='/' component={App}>
			<IndexRoute component={Home} />
			<Route path='competition' component={Competition} />
			<Route path='timer' component={Timer} />
			<Route path='user'>
				<IndexRoute component={ListUser} />
				<Route path='add' component={AddUser} />
				<Route path=':id'>
					<IndexRoute component={ProfileUser} />
					<Route path='edit' component={EditUser} />
					<Route path='history' component={ListHistoryUser} />
				</Route>
			</Route>
			<Route path='history' component={History} />
			<Route path='contact' component={Contact} />
			<Redirect from='*' to='/' />
		</Route>
	</Router>
)