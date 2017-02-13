import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import Layout from 'components/Layout'
import * as actions from 'actions'

const { getWifi, postWifi } = actions

const renderField = ({ input, label, type, min, max, step }) => {
	return (
		<div className="columns">
			<div className="column is-4" />
			<div className="column has-text-right">
				<label>{label}</label>{' : '}
			</div>
			<div className="column has-text-left">
				<input {...input} type={type} min={min} max={max} step={step} />
			</div>
			<div className="column is-4" />
		</div>
	)
}

class Setting extends Component {

	state = {}

	componentWillMount(){
		this.props.getWifi()
	}

	render(){
		return (
			<div className="has-text-centered">
				<div className="heading">
					<div className="title">
						<div className="columns is-gapless">
						  <div className="column is-3" />
						  <div className="column">
						    <strong>Setting</strong>
						  </div>
						  <div className="column is-3">
						  </div>
						</div>
					</div>
				</div>
				<hr />
				<div className='content'>
					<div className="notification is-primary">
						<h1 className="title">
							<br />
							SSID : {this.props.detail.ssid}
							<br />
							Status : {this.props.detail.status}
						</h1>
					</div>					
				    <form onSubmit={this.props.handleSubmit} className='form' action='javascript:void(0)'>
						<div className="columns">
							<div className="column is-4" />
							<div className="column has-text-right">
								<label>SSID</label>{' : '} 
							</div>
							<div className="column has-text-left">
								<Field name="ssid" component="select">
									<option value={undefined} />
									{
										this.props.wifi.map((data, index) => {
											return (
												<option value={data.ssid} key={index}>{data.ssid}</option>
											)
										})
									}
								</Field>
							</div>
							<div className="column is-4" />
						</div>
						<Field 
							name="password" 
							component={renderField} 
							type="text" 
							label='Password'
							autoFocus
						/>
						<button
					    	type='submit'
					        className='button is-primary'>
					        Submit
				    	</button>
				    </form>
				</div>
			</div>
		)
	}
}

Setting = reduxForm({
	form: 'settingForm'
})(Setting)

const selector = formValueSelector('settingForm')

const mapStateToProps = (state) => ({
	wifi: state.wifi.values,
	detail: state.wifi.detail,
	ssid: selector(state, 'ssid')
})

const mapDispatchToProps = (dispatch) => ({
	getWifi(){
		dispatch(getWifi())
	},
	onSubmit(value){
		dispatch(postWifi(value))
	}
})

export default connect(
	mapStateToProps, 
	mapDispatchToProps
)(Setting)