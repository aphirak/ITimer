import React from 'react'
import { Field, FieldArray } from 'redux-form'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Container, Header, Card, CardItem, Form, Item, Input, Label, Button, Text, Body, Grid, Col, H2, Left, Right,Tabs, Tab, TabHeading, Icon, ListItem, Radio } from 'native-base'

const styles = {
	cardItemStyle: {
		marginRight: 15
	},
	titleText: {
		fontWeight: 'bold'
	}
}

const renderField = ({ input, label ,...inputProps }) => {
  return (
        <Item floatingLabel>
            <Label>{label}</Label>
			<Input 
				{...inputProps}
				onChangeText={input.onChange}
				onBlur={input.onBlur}
				onFocus={input.onFocus}
				keyboardType='numeric'
			/>
        </Item>
  )
}

const renderFieldSelect = ({ input, label ,...inputProps }) => {
	return (
        <Item floatingLabel>
            <Label>{label}</Label>
			<Input 
				{...inputProps}
				onChangeText={input.onChange}
				onBlur={input.onBlur}
				onFocus={input.onFocus}
			/>
        </Item>
	)
}

const renderRouteFields = ({ fields }) => {
	return (
		<View>
			{
				fields.map((field, index) => (
					<Grid key={index}>
						<Col>
							<Field
								name={`routes[${index}].startGate`}
								type="number"
								component={renderField}
								label='Start'
							/> 
						</Col>
						<Col>
							<Field
								name={`routes[${index}].endGate`}
								type="number"
								component={renderField}
								label='End'
							/> 
						</Col>
						<Col>
							<Field
								name={`routes[${index}].distance`}								
								type="number"
								component={renderField}
								label='Distance'
							/>
						</Col>
					</Grid>		
				))
			}
		</View>
	)
}


// const renderFields = ({ nGate }) => {
// 	if(nGate <= 10){
// 		let fields = []
// 		for(let i=0;i<nGate-1;i++){
// 			fields.push(0)
// 		}

// 		return (
// 			<View>
// 				{
// 					fields.map((field, index) => (	
// 						<Grid>
// 							<Col>
// 							<Field
// 								name={`distances[${index}]`}
// 								type="number"
// 								component={renderField}
// 								label={`Distance of gate ${index+1} - ${index+2}`}
// 								key={index}
// 							/> 
// 							</Col>
// 							<Col>
// 								<Button block success bordered onPress={() => array.pop('routes')}>
// 									<Text>-</Text>
// 								</Button>
// 							</Col>
// 						</Grid>					
// 					))
// 				}
// 			</View>
// 		)
// 	}
// 	return ( <View/> )
// }

const SetupTimer = ({ handleSubmit, mode, array, handleSelect, selectValue }) => {
	return (
		<View>
			<Tabs>
				<Tab>
					<Card>	
						<CardItem header bordered style={{ justifyContent: 'center' }}>
							<H2 style={styles.titleText}>Setup</H2>
						</CardItem>												
						<Form>
							<Field
								name='uid'
								label='User ID'
								component={renderField}
							/>
							<CardItem />
							<CardItem  style={{ justifyContent: 'center' }}>
								<Text>Mode</Text>
							</CardItem>	
							<Field 
								name='mode'
								label='Mode'
								component={({ input }) => {
									return (
										<CardItem>										
											<Grid>
												<Col>
													<Button bordered light={selectValue !== 'sprint'} onPress={() => {
															input.onChange('sprint')
															handleSelect('sprint')
														}}>
														<Text style={{ 'color': (selectValue === 'sprint') ? '#019fde' : 'black' }}>Sprint</Text>
														<Right>
															<Radio selected={selectValue === 'sprint'} />
														</Right>
													</Button>
												</Col>
												<Col>												
													<Button bordered light={selectValue !== 'nonstop'} onPress={() => {
															input.onChange('nonstop')
															handleSelect('nonstop')
														}}>
														<Text style={{ 'color': (selectValue === 'nonstop') ? '#019fde' : 'black' }}>Nonstop</Text>
														<Right>
															<Radio selected={selectValue === 'nonstop'} />
														</Right>
													</Button>
												</Col>												
											</Grid>
										</CardItem>												
									)
								}}
							/>
							{
								(mode === 'sprint') && <Field
									name='nPhase'
									label='Number of phase'
									component={renderField}
								/>
							}
						</Form>		
						<CardItem />										
					</Card>
				</Tab>
				<Tab>
					<Card>				
						<CardItem bordered style={{ justifyContent: 'center' }}>
							<H2>Route</H2>
						</CardItem>
						<Form>		
							<FieldArray name='routes' component={renderRouteFields} />
						</Form>
						<CardItem />		
						<CardItem>
							<Grid>
								<Col />							
								<Col>
									<Button block primary onPress={() => array.push('routes', {})}>
										<Text>+</Text>
									</Button>
								</Col>
								<Col />				
								<Col>
									<Button block danger onPress={() => array.pop('routes')}>
										<Text>-</Text>
									</Button>
								</Col>
								<Col />				
							</Grid>
						</CardItem>
						<CardItem>
							<Body>
								<Button block success bordered onPress={handleSubmit}>
									<Text>Start</Text>
								</Button>
							</Body>
						</CardItem>
					</Card>					
				</Tab>
			</Tabs>
		</View>
	)
}

export default SetupTimer