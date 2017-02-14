import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Card, CardItem, Form, Item, Input, Label, Button, Text, Body, Grid, Col, H2 } from 'native-base'

const styles = {
	cardItemStyle: {
		marginRight: 15
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

const SetupTimer = ({ handleSubmit }) => (
	<Card>
        <CardItem header bordered style={{ justifyContent: 'center' }}>
             <H2 >Setup</H2>
        </CardItem>
	    <Form>
			<Field
				name='uid'
				label='User ID'
				component={renderField}
			/>
			<Field
				name='nGate'
				label='Number of gate'
				component={renderField}
			/>
			<Field
				name='distances[0]'
				label='Distance 1 - 2'
				component={renderField}
			/>
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

export default reduxForm({
  form: 'setupForm'
})(SetupTimer)