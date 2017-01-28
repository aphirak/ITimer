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
	User
} from 'containers'


export default (store, history) => (
	<Router history={syncHistoryWithStore(history, store)}>
		<Route path='/' component={App}>
			<IndexRoute component={Home} />
			<Route path='competition' component={Competition} />
			<Route path='timer' component={Timer} />
			<Route path='user' component={User} />
			<Route path='history' component={History} />
			<Route path='contact' component={Contact} />
			<Redirect from='*' to='/' />
		</Route>
	</Router>
)