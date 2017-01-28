import React, { Component } from 'react'
import socket from 'socket.io-client'

const io = socket('http://localhost:9090')

export default class Competition extends Component {

	state = {
		competitions: []
	}

	componentWillMount(){
		console.log('aaa')
		io.emit('competitions', 'GET')
		io.on('competitions', (data) => {
			// console.log(data)
			this.setState({ competitions: data })
		})
	}

	render(){
		return (
			<div className="has-text-centered">
				<div className="heading">
					<h1 className="title">
						<strong>Competition</strong>
					</h1>
				</div>
				<hr />
				<div className="content">
					{
						this.state.competitions.map((competition, index) => {
							return (
								<ul key={index}>
									<li>{index+1}</li>
									<li>{competition.uid}</li>
									<li>{competition.time}</li>
									<li>{JSON.stringify(competition.distances)}</li>
									<hr />
								</ul>
							)
						})
					}
				</div>
			</div>
		)
	}
}