import React, { Component } from 'react'
import { Link } from 'react-router'

export default class App extends Component {
	render () {
		return (
			<div>
				<Link to='/user/1'>aaaa</Link>
				<h1>Header</h1>
				{this.props.children}
				<h1>Footer</h1>
			</div>
		)
	}
}
