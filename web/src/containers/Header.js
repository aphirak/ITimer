import React, { Component } from 'react'
import { browserHistory, hashHistory } from 'react-router'
import { connect } from 'react-redux'
import _ from 'lodash'
import { logoITimer } from 'assets/images'

class Header extends Component {

	componentDidMount(){
		let currentUrl = window.location.pathname
		let text = (currentUrl.length == 1) ? 'Home' : currentUrl.substring(1)
		this.handleTab(text)
	}

	handleTab(text, path){
		_.map(this.refs.menu.children, (item, key) => {
			this.refs.menu.children[key].className = "nav-item is-tab"
			if(item.text.toLowerCase() == text.toLowerCase()){
				this.refs.menu.children[key].className = "nav-item is-tab is-active"
			}
		})

		if(path){
			browserHistory.push(path)			
		}
	}

	render(){
		return (
			<nav className="nav has-shadow">
			  <div className="container">
			    <div className="nav-left">
			      <a className="nav-item">
			        <img src={logoITimer} alt="ITimer logo" />
			      </a>
			    </div>
			    <div className="nav-right" ref='menu'>
					<a className="nav-item is-tab" onClick={this.handleTab.bind(this, "Home", '/')}>Home</a>
					<a className="nav-item is-tab" onClick={this.handleTab.bind(this, "Competition", 'competition')}>Competition</a>
					<a className="nav-item is-tab" onClick={this.handleTab.bind(this, "Timer", 'timer')}>Timer</a>
					<a className="nav-item is-tab" onClick={this.handleTab.bind(this, "User", 'user')}>User</a>
					<a className="nav-item is-tab" onClick={this.handleTab.bind(this, "History", 'history')}>History</a>
					<a className="nav-item is-tab" onClick={this.handleTab.bind(this, "Contact", 'contact')}>Contact</a>
			    </div>
			  </div>
			</nav>
		)
	}
}

export default connect(null, null)(Header)