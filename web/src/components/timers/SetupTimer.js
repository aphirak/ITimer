import React from 'react'
import { Field, FieldArray } from 'redux-form'
import Layout from 'components/Layout'


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


const renderFields = ({ nGate }) => {
	if(nGate <= 10){
		let fields = []
		for(let i=0;i<nGate-1;i++){
			fields.push(0)
		}

		return (
			<div>
				{
					fields.map((field, index) => (
				        <Field
							name={`distances[${index}]`}
							type="number"
							component={renderField}
							label={`Distance of gate ${index+1} - ${index+2}`}
							key={index}
						/> 
					))
				}
			</div>
		)
	}
	return ( <div/> )
}

const SetupTimer = ({ handleSubmit, uid, nGate, distanceType, distances }) => {
	return (
		<Layout title='Setup'>
		    <form onSubmit={handleSubmit} className='form' action='javascript:void(0)'>
				<Field 
					name="uid" 
					component={renderField} 
					type="text" 
					label='User ID'
					autoFocus
				/>
				<Field 
					name="nGate" 
					component={renderField} 
					type="number" 
					label='Number of gate'
				/>
				<FieldArray name="distances" component={renderFields} nGate={nGate} />
				<br />
				<button
			    	type='submit'
			        className='button is-primary'>
			        Start
		    	</button>
		    </form>
		</Layout>
	)
}

export default SetupTimer




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




// class SetupTimer extends Component {

// 	// state = {
// 	// 	time: 0
// 	// }

// 	// componentDidMount(){
// 	// 	socket.on('timer', (data) => {
// 	// 		console.log(data)
// 	// 		this.setState({ time: data.time })
// 	// 	})
// 	// }


// 	render(){
// 		const { handleSubmit } = this.props
// 		return (
// 			<div className="has-text-centered">
// 				<div className="heading">
// 					<h1 className="title">
// 						<strong>Setup</strong>
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
// 				        <Field
// 							name={`distanceValues[0]`}
// 							type="number"
// 							component={renderField}
// 							label={`Distance 1 - 2`}
// 						/> 
// 						<br />
// 				        <Field
// 							name={`distanceValues[1]`}
// 							type="number"
// 							component={renderField}
// 							label={`Distance 2 - 3`}
// 						/> 
// 						<br />
// 				        <Field
// 							name={`distanceValues[2]`}
// 							type="number"
// 							component={renderField}
// 							label={`Distance 3 - 4`}
// 						/> 
// 						<br />
// 				        <Field
// 							name={`distanceValues[3]`}
// 							type="number"
// 							component={renderField}
// 							label={`Distance 4 - 5`}
// 						/> 
// 						<br />
// 						<button
// 					    	type='submit'
// 					        className='button is-primary'>
// 					        Start
// 				    	</button>
// 				    </form>
// 				</div>
// 			</div>
// 		)
// 	}
// }

						// { 
						// 	(this.props.distanceType != undefined) && ((this.props.distanceType == 1) ? distanceEqual() : distanceNotEqual())
						// 



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












