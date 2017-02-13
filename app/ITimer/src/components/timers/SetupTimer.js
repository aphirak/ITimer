import React from 'react'
import { Card, CardItem, Form, Item, Input, Label, Button, Text, Body, Grid, Col, H2 } from 'native-base'

const styles = {
	cardItemStyle: {
		marginRight: 15
	}
}

const SetupTimer = () => (
	<Card>
            <CardItem header bordered style={{ justifyContent: 'center' }}>
                 <H2 >Setup</H2>
            </CardItem>
		    <Form>
		        <Item floatingLabel>
		            <Label>User ID</Label>
		            <Input />
		        </Item>
		        <Item floatingLabel>
		            <Label>Number of gate</Label>
		            <Input />
		        </Item>
		        <Item floatingLabel>
		            <Label>Distance Type</Label>
		            <Input />
		        </Item>
		        <Item floatingLabel>
		            <Label>Number of gate</Label>
		            <Input />
		        </Item>
		    </Form>
            <CardItem>
                <Body>
                	<Button block success bordered>
                		<Text>Start</Text>
                	</Button>
                </Body>
            </CardItem>
	</Card>
)

export default SetupTimer