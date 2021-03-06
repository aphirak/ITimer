import React from 'react'
import {
	Router,
	Route,
	IndexRoute,
	Redirect
} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

function errorLoading (error) {
	throw new Error(`Dynamic page loading failed: ${error}`)
}

function loadRoute (cb) {
	return component => cb(null, component.default || component)
}

const routes = (store, history) => (
	<Router history={syncHistoryWithStore(history, store)}>
		<Route path='/' getComponent = {(location, cb) => { System.import('containers/apps').then(loadRoute(cb)).catch(errorLoading) }}>
			<IndexRoute getComponent = {(location, cb) => { System.import('containers/Home').then(loadRoute(cb)).catch(errorLoading) }} />
			<Route path='competition' getComponent = {(location, cb) => { System.import('containers/Competition').then(loadRoute(cb)).catch(errorLoading) }} />
			<Route path='timer' getComponent = {(location, cb) => { System.import('containers/Timer').then(loadRoute(cb)).catch(errorLoading) }} />
			<Route path='user'>
				<IndexRoute getComponent = {(location, cb) => { System.import('containers/users').then(loadRoute(cb)).catch(errorLoading) }} />
				<Route path='add' getComponent = {(location, cb) => { System.import('containers/users/AddUser').then(loadRoute(cb)).catch(errorLoading) }} />
				<Route path=':user_id'>
					<IndexRoute getComponent = {(location, cb) => { System.import('containers/users/ProfileUser').then(loadRoute(cb)).catch(errorLoading) }} />
					<Route path='edit' getComponent = {(location, cb) => { System.import('containers/users/EditUser').then(loadRoute(cb)).catch(errorLoading) }} />
					<Route path='history' getComponent = {(location, cb) => { System.import('containers/histories/ListHistoryUser').then(loadRoute(cb)).catch(errorLoading) }} />
				</Route>
			</Route>
			<Route path='history' getComponent = {(location, cb) => { System.import('containers/History').then(loadRoute(cb)).catch(errorLoading) }} />
			<Route path='contact' getComponent = {(location, cb) => { System.import('containers/Contact').then(loadRoute(cb)).catch(errorLoading) }} />
			<Route path='setting' getComponent = {(location, cb) => { System.import('containers/Setting').then(loadRoute(cb)).catch(errorLoading) }} />
		</Route>
		<Redirect from='*' to='/' />
	</Router>
)

export default routes
