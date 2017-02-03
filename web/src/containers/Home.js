import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as actions from 'actions'

class Home extends Component {
	render(){
		return (
			<div className="has-text-centered">
				<div className="heading">
					<h1 className="title">
						<strong>Home</strong>
					</h1>
				</div>
				<hr />
				<div className='content'>

				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)
