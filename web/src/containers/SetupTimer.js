import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
// const socket = require('socket.io-client')('http://localhost:9090');
import * as actions from 'actions'

const { setupTimer } = actions

const renderField = ({ input, label, type, min, max, step}) => (
  <div>
    <label>{label}</label>{' : '}
	<input {...input} type={type} min={min} max={max} step={step} />
	<br />
  </div>
)

const renderFields = ({ nGate }) => {
	let fields = []
	for(let i=0;i<nGate-1;i++){
		fields.push(0)
	}

	return (
		<div>
			{
				fields.map((field, index) => (
			        <Field
						name={`distanceValues[${index}]`}
						type="number"
						component={renderField}
						label={`Distance ${index+1} - ${index+2}`}
						key={index}
					/> 
				))
			}
		</div>
	)
}

// const distanceEqual = () => (
// 	<div>
// 		<FieldArray name="1.distanceValue" component="input" /> Meter
// 	</div>
// )

// const distanceNotEqual = () => (
// 	<div>
// 		<FieldArray name="1.distanceValue" component="input" /> Meter
// 	</div>
// )




class SetupTimer extends Component {

	// state = {
	// 	time: 0
	// }

	// componentDidMount(){
	// 	socket.on('timer', (data) => {
	// 		console.log(data)
	// 		this.setState({ time: data.time })
	// 	})
	// }


	render(){
		const { handleSubmit } = this.props
		return (
			<div className="has-text-centered">
				<div className="heading">
					<h1 className="title">
						<strong>Setup</strong>
					</h1>
				</div>
				<hr />
				<div className="content">
				    <form onSubmit={handleSubmit} className='form' action='javascript:void(0)'>
						<Field name="uid" component={renderField} type="text" label='Student ID' autoFocus />
						<Field name="nGate" component={renderField} type="number" label='Number of gate' />
						<label>Distance Type</label>{' : '} 
						<Field name="distanceType" component="select">
							<option value={undefined}></option>
							<option value={0}>Not equal</option>
							<option value={1}>Equal</option>
						</Field>
				        <Field
							name={`distanceValues[0]`}
							type="number"
							component={renderField}
							label={`Distance 1 - 2`}
						/> 
						<br />
						<button
					    	type='submit'
					        className='button is-primary'>
					        Start
				    	</button>
				    </form>
				</div>
			</div>
		)
	}
}

						// { 
						// 	(this.props.distanceType != undefined) && ((this.props.distanceType == 1) ? distanceEqual() : distanceNotEqual())
						// }

SetupTimer = reduxForm({
	form: 'timerForm'
})(SetupTimer)

const selector = formValueSelector('timerForm')

const mapStateToProps = (state) => ({
	nGate: selector(state, 'nGate'),
	distanceType: selector(state, 'distanceType'),
	distanceValues: selector(state, 'distanceValues')
})

const mapDispatchToProps = (dispatch) => ({
	onSubmit(value){
		dispatch(setupTimer({
			...value,
			distances: value.distanceValues
		}))
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SetupTimer)



// class Timer extends Component {

// 	state = {
// 		time: 0
// 	}

// 	componentDidMount(){
// 		socket.on('timer', (data) => {
// 			console.log(data)
// 			this.setState({ time: data.time })
// 		})
// 	}


// 	render(){
// 		const { handleSubmit } = this.props
// 		return (
// 			<div className="has-text-centered">
// 				<div className="heading">
// 					<h1 className="title">
// 						<strong>Setup</strong>
// 						<div>{this.state.time}</div>
// 					</h1>
// 				</div>
// 				<hr />
// 				<div className="content">
// 				    <form onSubmit={handleSubmit} className='form' action='javascript:void(0)'>
// 						<Field name="uid" component={renderField} type="text" label='Student ID' autoFocus />
// 						<Field name="nGate" component={renderField} type="number" label='Number of gate' />
// 						<label>Distance Type</label>{' : '} 
// 						<Field name="distanceType" component="select">
// 							<option value={undefined}></option>
// 							<option value={0}>Not equal</option>
// 							<option value={1}>Equal</option>
// 						</Field>
// 						<FieldArray name="distanceValues" component={renderFields} nGate={this.props.nGate} />
// 						<br />
// 						<button
// 					    	type='submit'
// 					        className='button is-primary'>
// 					        Search
// 				    	</button>
// 				    </form>
// 				</div>
// 			</div>
// 		)
// 	}
// }












