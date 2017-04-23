import React from 'react'
import { Field, FieldArray } from 'redux-form'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Card, CardItem, Form, Item, Input, Label, Button, Text, Body, Grid, Col, H2 } from 'native-base'

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

const renderFields = ({ nGate }) => {
	if(nGate <= 10){
		let fields = []
		for(let i=0;i<nGate-1;i++){
			fields.push(0)
		}

		return (
			<View>
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
			</View>
		)
	}
	return ( <View/> )
}

const SetupTimer = ({ handleSubmit, nGate }) => {
	return (
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
			<Field 
				name='mode'
				label='Mode'
				component={renderFieldSelect} 
			/>
			<Field
				name='nGate'
				label='Number of gate'
				component={renderField}
			/>
			<FieldArray name="distances" component={renderFields} nGate={nGate} />
	    </Form>
        <CardItem>
            <Body>
            	<Button block success bordered onPress={handleSubmit}>
            		<Text>Start</Text>
            	</Button>
            </Body>
        </CardItem>
	</Card>
	)
}

export default SetupTimer