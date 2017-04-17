import React, { Component } from 'react'
import Header from 'containers/App/Header'
import Footer from 'containers/App/Footer'
import 'stylesheets/main.css'

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
	render () {
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
