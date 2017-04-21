import React from 'react'
import { Field, FieldArray } from 'redux-form'

import Layout from 'components/Layout'
// const { uid, nPhase, distances, mode } = req.body
const renderField = ({ input, label, type, min, max, step }) => {
	return (
		<div className='columns'>
			<div className='column is-4' />
			<div className='column has-text-right'>
				<label>{label}</label>{' : '}
			</div>
			<div className='column has-text-left'>
				<input {...input} type={type} min={min} max={max} step={step} />
			</div>
			<div className='column is-4' />
		</div>
	)
}

const renderFields = () => {
	let fields = [{}, {}, {}, {}, {}]
	return (
		<div>
			{
				fields.map((field, index) => (
					<div key={index}>
						<Field
							name={`routes[${index}].startGate`}
							type='number'
							component={renderField}
							label={`${index} Start Gate`}
						/>
						<Field
							name={`routes[${index}].endGate`}
							type='number'
							component={renderField}
							label={`${index} End Gate`}
						/>
						<Field
							name={`routes[${index}].distance`}
							type='number'
							component={renderField}
							label={`${index} Distance`}
						/>
						<hr />
					</div>
				))
			}
		</div>
	)
}

function SetupTimerMock ({ handleSubmit, mode }) {
	return (
		<Layout title='Setup'>
			<form onSubmit={handleSubmit} className='form' action='javascript:void(0)'>
				<Field
					name='uid'
					component={renderField}
					type='text'
					label='User ID'
					autoFocus />
				<div className='columns'>
					<div className='column is-4' />
					<div className='column has-text-right'>
						<label>Mode : </label>
					</div>
					<div className='column has-text-left'>
						<Field name='mode' component='select'>
							<option value={'sprint'}>Sprint</option>
							<option value={'nonstop'}>NonStop</option>
						</Field>
					</div>
					<div className='column is-4' />
				</div>
				<Field
					name='nPhase'
					component={renderField}
					type='number'
					label='Number of phase' />
				<br />
				<FieldArray name='routes' component={renderFields} />
				<button
					type='submit'
					className='button is-primary' >
						Start
				</button>
			</form>
		</Layout>
	)
}

export default SetupTimerMock
