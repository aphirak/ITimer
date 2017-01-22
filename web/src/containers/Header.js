import React, { Component } from 'react'
import { Nav, NavContainer, NavGroup, NavItem, Icon } from 're-bulma'
import { logoITimer } from 'assets/images'

export default class Header extends Component {
	render(){
		return (
			<nav className="nav has-shadow">
			  <div className="container">
			    <div className="nav-left">
			      <a className="nav-item">
			        <img src={logoITimer} alt="ITimer logo" />
			      </a>
			    </div>
			    <div className="nav-right">
			      <a className="nav-item is-tab is-active">Home</a>
			      <a className="nav-item is-tab">Competition</a>
			      <a className="nav-item is-tab">Timer</a>
			      <a className="nav-item is-tab">User</a>
			      <a className="nav-item is-tab">History</a>
			      <a className="nav-item is-tab">Contact</a>
			    </div>
			  </div>
			</nav>
		)
	}
}