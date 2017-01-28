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
			<route path='competition' component={Competition} />
			<route path='timer' component={Timer} />
			<route path='user' component={User} />
			<route path='history' component={History} />
			<route path='contact' component={Contact} />
			<Redirect from='*' to='/' />
		</Route>
	</Router>
)