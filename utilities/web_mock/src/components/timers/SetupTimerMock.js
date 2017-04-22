import React from 'react'
import { Field, FieldArray } from 'redux-form'

import Layout from 'components/Layout'

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

const renderRouteFields = ({ fields }) => {
	return (
		<div>
			{
				fields.map((field, index) => (
					<div className='columns' key={index}>
						<div className='column is-4' />
						<div className='column has-text-right'>
							<div className='columns'>
								<div className='column is-5' />
								<div className='column'>
									<Field
										name={`routes[${index}].startGate`}
										component='input'
										style={{ 'width': '30px', 'textAlign': 'center' }}
									/>
								</div>
								<div className='column'>
									to
								</div>
								<div className='column'>
									<Field
										name={`routes[${index}].endGate`}
										component='input'
										style={{ 'width': '30px', 'textAlign': 'center' }}
									/>
								</div>
								<div className='column'>
									{' : '}
								</div>
								<div className='column is-6' />
							</div>
						</div>
						<div className='column has-text-left'>
							<div className='columns'>
								<div className='column is-3' />
								<div className='column'>
									<Field
										name={`routes[${index}].distance`}
										component='input'
										style={{ 'width': '50px', 'textAlign': 'center' }}
									/> m
								</div>
							</div>
						</div>
						<div className='column is-4' />
					</div>
				))
			}
		</div>
	)
}

// const renderFields = () => {
// 	let fields = [{}, {}, {}, {}, {}]
// 	return (
// 		<div>
// 			{
// 				fields.map((field, index) => (
// 					<div key={index}>
// 						<Field
// 							name={`routes[${index}].startGate`}
// 							type='number'
// 							component={renderField}
// 							label={`${index} Start Gate`}
// 							min={0}
// 						/>
// 						<Field
// 							name={`routes[${index}].endGate`}
// 							type='number'
// 							component={renderField}
// 							label={`${index} End Gate`}
// 							min={0}
// 						/>
// 						<Field
// 							name={`routes[${index}].distance`}
// 							type='number'
// 							component={renderField}
// 							label={`${index} Distance`}
// 							min={0}
// 						/>
// 						<hr />
// 					</div>
// 				))
// 			}
// 		</div>
// 	)
// }

function SetupTimerMock ({ array, handleSubmit, mode }) {
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
						<div className='control'>
							<span className='select is-small'>
								<Field name='mode' component='select'>
									<option value={undefined}></option>
									<option value={'sprint'}>Sprint</option>
									<option value={'nonstop'}>NonStop</option>
								</Field>
							</span>
						</div>
					</div>
					<div className='column is-4' />
				</div>
				{
					(mode === 'sprint') && <Field
												name='nPhase'
												component={renderField}
												type='number'
												label='Number of phase' />
				}
				<div>Distance</div><br />
				<FieldArray name='routes' component={renderRouteFields} />
				<br />
				<button type='button' className='button is-info' onClick={() => array.push('routes', {})}>+</button>
				{' '}
				<button type='button' className='button is-danger' onClick={() => array.pop('routes')}>-</button>
				<hr />
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

// <FieldArray name='routes' component={(routes) => {
// 					return (
// 						<div>
// 							{
// 								routes.fields.map((field, index) => (
// 									<div key={index} className='columns'>
// 										<Field
// 											name={`routes[${index}].startGate`}
// 											type='number'
// 											label={`${index} Start Gate`}
// 											min={1}
// 											component={(startGate) => {
// 											}}
// 										/>
//               <div>
//                 <label>Last Name</label>
//                 <Field name={`${member}.lastName`} component={lastName =>
//                   <div>
//                     <input type="text" {...lastName} placeholder="Last Name"/>
//                     {lastName.touched && lastName.error && <span>{lastName.error}</span>}
//                   </div>
//                 }/>
//               </div>
// 		<div className='columns'>
// 			<div className='column is-4' />
// 			<div className='column has-text-right'>
// 				<label>{label}</label>{' : '}
// 			</div>
// 			<div className='column has-text-left'>
// 				<input {...input} type={type} min={min} max={max} step={step} />
// 			</div>
// 			<div className='column is-4' />
// 		</div>

// 										<Field
// 											name={`routes[${index}].endGate`}
// 											type='number'
// 											component={renderField}
// 											label={`${index} End Gate`}
// 											min={1}
// 										/>
// 										<Field
// 											name={`routes[${index}].distance`}
// 											type='number'
// 											component={renderField}
// 											label={`${index} Distance`}
// 											min={1}
// 										/>
// 										<hr />
// 									</div>
// 								))
// 							}
// 						</div>
// 					)
// 				}} />
