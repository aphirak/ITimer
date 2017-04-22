import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { ModalChartHistory, ModalDetailHistory } from 'components/histories'
import * as actions from 'actions'

const { getHistoriesByUserId, getUserById } = actions

const initialUser = {
	username: '',
	firstname: '',
	lastname: '',
	nickname: ''
}

class ListHistoryUser extends Component {
	state = {
		isModalActiveChart: false,
		isModalActiveDetail: false,
		dataChart: {},
		dataDetail: [],
		totalDetail: {}
	}

	activeModalChart () {
		let dataChart = {
			time: [],
			speed: []
		}
		let histories = [...this.props.histories]
		histories.reverse()
		histories.map((history, index) => {
			let data = moment(history.created_at).format('DD/MM/YY')
			dataChart.time.push({ name: `${data}`, Time: history.totalTime })
			dataChart.speed.push({ name: `${data}`, Speed: history.speedAverage })
		})
		this.setState({ dataChart })
		this.setState({ isModalActiveChart: true })
	}

	activeModalDetail (id, total_distance, totalTime, speedAverage) {
		let dataDetail = this.props.histories.find((history) => history.id === id).details
		let totalDetail = {
			total_distance,
			totalTime,
			speedAverage
		}
		this.setState({ dataDetail, totalDetail })
		this.setState({ isModalActiveDetail: true })
	}

	inActiveModalDetail () {
		this.setState({ isModalActiveDetail: false })
	}

	inActiveModalChart () {
		this.setState({ isModalActiveChart: false })
	}

	componentDidMount () {
		this.props.getUserById(this.props.params.user_id)
		this.props.getHistoriesByUserId(this.props.params.user_id)
	}

	render () {
		let { firstname, lastname, nickname } = this.props.user

		return (
			<div className='has-text-centered'>
				<div className='heading'>
					<h1 className='title'>
						<strong>History</strong>
					</h1>
					<h2 className='subtitle'>
						<div className='columns is-gapless'>
							<div className='column is-1' />
							<div className='column'>
								( {`${firstname} ${lastname} (${nickname})`} )
							</div>
							<div className='column is-1'>
								<button className='button is-warning' onClick={this.activeModalChart.bind(this)}>Chart</button>
							</div>
						</div>
					</h2>
				</div>
				<hr />
				<div className='content'>
					<table className='table is-striped is-fullwidth'>
						<thead>
							<tr>
								<th style={{ 'textAlign': 'center' }}>#</th>
								<th style={{ 'textAlign': 'center' }}>Number of phase</th>
								<th style={{ 'textAlign': 'center' }}>Total Distance (m)</th>
								<th style={{ 'textAlign': 'center' }}>Total Time (s)</th>
								<th style={{ 'textAlign': 'center' }}>Speed Average (m/s)</th>
								<th style={{ 'textAlign': 'center' }}>Date</th>
								<th style={{ 'textAlign': 'center' }}>Option</th>
							</tr>
						</thead>
						<tbody>
							{
								this.props.histories.map((history, index) => {
									let { id, total_phase, total_distance, total_time, speed_average, created_at } = history
									return (
										<tr key={index}>
											<td style={{ 'textAlign': 'center' }}>{index + 1}</td>
											<td style={{ 'textAlign': 'center' }}>{total_phase}</td>
											<td style={{ 'textAlign': 'center' }}>{total_distance}</td>
											<td style={{ 'textAlign': 'center' }}>{total_time}</td>
											<td style={{ 'textAlign': 'center' }}>{speed_average}</td>
											<td style={{ 'textAlign': 'center' }}>{moment(created_at).fromNow()}</td>
											<td style={{ 'textAlign': 'center' }}>
												<button onClick={this.activeModalDetail.bind(this, id, total_distance, total_time, speed_average)} className='button is-primary'>Detail</button>
											</td>
										</tr>
									)
								})
							}
						</tbody>
					</table>
				</div>
				<ModalChartHistory
					isActive={this.state.isModalActiveChart}
					inActiveModal={this.inActiveModalChart.bind(this)}
					data={this.state.dataChart}
				/>
				<ModalDetailHistory
					isActive={this.state.isModalActiveDetail}
					inActiveModal={this.inActiveModalDetail.bind(this)}
					data={this.state.dataDetail}
					total={this.state.totalDetail}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
	user: state.user.value[ownProps.params.user_id] || { id: ownProps.params.user_id, ...initialUser },
	histories: state.history.valuesByUserId
})

const mapDispatchToProps = (dispatch) => ({
	getUserById (id) {
		dispatch(getUserById(id))
	},
	getHistoriesByUserId (id) {
		dispatch(getHistoriesByUserId(id))
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ListHistoryUser)
