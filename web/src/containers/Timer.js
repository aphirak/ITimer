import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'

const renderField = ({ input, label, type, min}) => (
  <div>
    <label>{label}</label>{' : '}
	<input {...input} type={type} min={min}/>
	<br />
  </div>
)

const distanceEqual = () => (
	<div>
		<Field name="1.distanceValue" component="input" /> Meter
	</div>
)

const distanceNotEqual = () => (
	<div>
		<FieldArray name="1.distanceValue" component="input" /> Meter
	</div>
)

const renderMembers = ({ fields }) => (
  <ul>
    {fields.map((member, index) =>
      <li key={index}>
        <h4>Member #{index + 1}</h4>
        <Field
          name={`${member}.firstName`}
          type="text"
          component="input"
          label="First Name"/>
        <Field
          name={`${member}.lastName`}
          type="text"
          component="input"
          label="Last Name"/>
      </li>
    )}
  </ul>
)


class Timer extends Component {
	render(){
		const { handleSubmit } = this.props
		console.log(this.props.distanceValue)
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
						<Field name="nGate" component={renderField} type="number" label='Number of gate' autoFocus />
						<label>Distance</label>{' : '} 
						<Field name="distanceType" component="select">
							<option value={undefined}></option>
							<option value={0}>Not equal</option>
							<option value={1}>Equal</option>
						</Field>
						<distanceEqual />
						{ 
							(this.props.distanceType != undefined) && ((this.props.distanceType == 1) ? distanceEqual() : distanceNotEqual())
						}
						<br />
						<button
					    	type='submit'
					        className='button is-primary'>
					        Search
				    	</button>
				    </form>
				</div>
			</div>
		)
	}
}


Timer = reduxForm({
	form: 'timerForm'
})(Timer)

const selector = formValueSelector('timerForm')

const mapStateToProps = (state) => ({
	distanceType: selector(state, 'distanceType'),
	distanceValue: selector(state, 'distanceValue')
})

const mapDispatchToProps = (dispatch) => ({
	onSubmit(value){
		console.log(value)
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Timer)