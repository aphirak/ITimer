import React, { Component } from 'react'
import Header from 'containers/Header'
import Footer from 'containers/Footer'
import moment from 'moment-timezone'
import 'containers/App.css'

const styles = {
	site: {
	  display: 'flex',
	  minHeight: '100vh',
	  flexDirection: 'column'
	},
	siteContent: {
	  flex: 1,
	  margin: 20
	}
}


export default class App extends Component {

	componentWillMount(){
		// moment.tz.setDefault('Asia/Bangkok');
	}

	render(){
		return (
			<div style={styles.site}>
				<Header />
				<div style={styles.siteContent}>
				  <section className="section">
						<div className="container">
							{this.props.children}
						</div>
				</section>
				</div>
				<Footer />
			</div>
		)
	}
}