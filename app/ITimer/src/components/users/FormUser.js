import React from 'react'
import { Card, CardItem, Form, Item, Input, Label, Button, Text, H2, Body } from 'native-base'
import { Field } from 'redux-form'

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
				autoCorrect={false}
			/>
        </Item>
  )
}

const FormUser = ({ handleSubmit, title }) => {
	return (
		<Card>
	        <CardItem header bordered style={{ justifyContent: 'center' }}>
	             <H2 style={styles.titleText}>{title}</H2>
	        </CardItem>
		    <Form>
				<Field
					name='username'
					label='Username'
					component={renderField}
				/>
				<Field
					name='firstname'
					label='Firstname'
					component={renderField}
				/>
				<Field
					name='lastname'
					label='Lastname'
					component={renderField}
				/>
				<Field
					name='nickname'
					label='Nickname'
					component={renderField}
				/>
		    </Form>
	        <CardItem>
	            <Body>
	            	<Button block success bordered onPress={handleSubmit}>
	            		<Text>Submit</Text>
	            	</Button>
	            </Body>
	        </CardItem>
		</Card>
	)
}

export default FormUser