import React from 'react'
import { Field } from 'redux-form'

const renderField = ({ input, label, type, min, max, step }) => {
	return (
		<div>
			<label>{label}</label>{' : '}
			<input {...input} type={type} min={min} max={max} step={step} />
			<br />
		</div>
	)
}

const FormUser = ({ handleSubmit, title, reset }) => {
	return (
		<div className='has-text-centered'>
			<div className='heading'>
				<h1 className='title'>
					<strong>{title}</strong>
				</h1>
			</div>
			<hr />
			<div className='content'>
				<form onSubmit={handleSubmit} className='form' action='javascript:void(0)'>
					<Field
						name='username'
						component={renderField}
						type='text'
						label='Username'
						autoFocus
					/>
					<Field
						name='firstname'
						component={renderField}
						type='text'
						label='Firstname'
					/>
					<Field
						name='lastname'
						type='text'
						component={renderField}
						label='Lastname'
					/>
					<Field
						name='nickname'
						type='text'
						component={renderField}
						label='Nickname'
					/>
					<br />
					<div className='control is-grouped' style={{ 'justifyContent': 'center' }}>
						<div className='control'>
							<button className='button is-success' type='submit'>
								Submit
							</button>
						</div>
						<div className='control'>
							<button className='button is-danger' type='reset' onClick={reset}>
								Reset
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}

export default FormUser
