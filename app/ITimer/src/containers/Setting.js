import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Card, CardItem, Form, Item, Input, Label, Button, Text, Body, Grid, Col, H2, Picker } from 'native-base'
import { connect } from 'react-redux'
import * as actions from 'ITimer/src/actions'

const { getWifi, postWifi } = actions

const styles = {
	cardItemStyle: {
		marginRight: 15
	},
	titleText: {
		fontWeight: 'bold'
	}
}

class Setting extends Component {

	state = {
	    selectedItem: undefined,
	    selected1: 'key1',
	    results: {
	        items: []
	    }
	}

    onValueChange (value) {
        this.setState({
            selected1 : value
        });
    }

    componentWillMount(){
    	this.props.getWifi()
    }

	render(){
		console.log(this.props.wifi)
		return (
			<Card>
		        <CardItem header bordered style={{ justifyContent: 'center' }}>
		             <H2 style={styles.titleText}>Setup</H2>
		        </CardItem>
			    <Form>
                    <Picker
                        iosHeader="Select one"
                        mode="dialog"
                        selectedValue={this.state.selected1}
                        onValueChange={this.onValueChange.bind(this)}>
                        {
                        	this.props.wifi.map((value, index) => {
                        		return (
									 <Item label={value.ssid} value={value.ssid} key={index}/>
                        		)
                        	})
                        }
                   </Picker>
			    </Form>
		        <CardItem>
		            <Body>
		            	<Button block success bordered >
		            		<Text>Start</Text>
		            	</Button>
		            </Body>
		        </CardItem>
			</Card>
		)
	}
}

const mapStateToProps = (state) => ({
	wifi: state.wifi.values,
	detail: state.wifi.detail
})

const mapDispatchToProps = (dispatch) => ({
	getWifi(){
		dispatch(getWifi())
	},
	onSubmit(value){
		dispatch(postWifi(value))
	}
})

export default connect(
	mapStateToProps, 
	mapDispatchToProps
)(Setting)