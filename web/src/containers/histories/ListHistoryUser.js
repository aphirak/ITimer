import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import moment from 'moment'
import { ModalChartHistory, ModalDetailHistory } from 'components/histories'
import * as actions  from 'actions'

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

	activeModalChart(){
		let dataChart = {
			time: [],
			speed: []
		}
		this.props.histories.map((history) => {
			let data = moment(history.created_at).format("DD/MM/YYYY")
			dataChart.time.push({ name: data, Time: history.total_time })
			dataChart.speed.push({ name: data, Speed: history.speed_average })
		})
		this.setState({ dataChart })
		this.setState({ isModalActiveChart: true })
	}

	activeModalDetail(id, total_distance, total_time, speed_average){
		let dataDetail = this.props.histories.find((history) => history.id == id).details
		let totalDetail = {
			total_distance,
			total_time,
			speed_average
		}
		this.setState({ dataDetail, totalDetail })
		this.setState({ isModalActiveDetail: true })
	}

	inActiveModalDetail(){
		this.setState({ isModalActiveDetail: false })
	}	

	inActiveModalChart(){
		this.setState({ isModalActiveChart: false })
	}

	componentWillMount(){
		this.props.getUserById(this.props.params.id)
		this.props.getHistoriesByUserId(this.props.params.id)
	}

	render(){
		let { firstname, lastname, nickname } = this.props.user
		return (
			<div className="has-text-centered">
				<div className="heading">
					<h1 className="title">
					    <strong>History</strong>
					</h1>
			        <h2 className="subtitle">
						<div className="columns is-gapless">
						  <div className="column is-1" />
						  <div className="column">
								( {`${firstname} ${lastname} (${nickname})`} )
						  </div>
						  <div className="column is-1">
						  	<button className='button is-warning' onClick={this.activeModalChart.bind(this)}>Chart</button>
						  </div>
						</div>
			        </h2>
				</div>
				<hr />
				<div className="content">
					<table className="table is-striped is-fullwidth">
						<thead>
						  <tr>
						    <th>#</th>
						    <th>Number of gate</th>
						    <th>Total Distance (m)</th>
						    <th>Total Time (s)</th>
						    <th>Speed Average (m/s)</th>
						    <th>Date</th>
						    <th>Option</th>
						  </tr>
						</thead>
						<tbody>
							{
								this.props.histories.map((history, index) => {
									let { id, total_gate, total_distance, total_time, speed_average, created_at } = history
									return (
								      <tr key={index}>
								        <td>{index+1}</td>
								        <td>{total_gate}</td>
								        <td>{total_distance}</td>
								        <td>{total_time}</td>
								        <td>{speed_average}</td>
								        <td>{moment(created_at).fromNow()}</td>
								        <td>
										  <button onClick={this.activeModalDetail.bind(this, id, total_distance, total_time, speed_average)} className="button is-primary">Detail</button>
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
	user: state.user.value[ownProps.params.id] || { id: ownProps.params.id, ...initialUser },
	histories: state.history.valuesByUserId
})

const mapDispatchToProps = (dispatch) => ({
	getUserById(id){
		dispatch(getUserById(id))
	},
	getHistoriesByUserId(id){
		dispatch(getHistoriesByUserId(id))
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ListHistoryUser)