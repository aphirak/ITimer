import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, TextInput } from 'react-native'
import { Button } from 'native-base'
import axios from 'axios'
import * as actions from 'ITimer/src/actions'

const { testAction } = actions

class Home extends Component {

	componentWillMount(){
		this.props.testAction('eiei')
	}

	render(){
		console.log(this.props.test)
		return (
			<View style={{ 'flex': 1, 'justifyContent' : 'center', 'alignItems': 'center' }}>
				<Text>{JSON.stringify(this.props.test)}</Text>
				<TextInput 
			        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
			        onChangeText={(text) => this.props.testAction(text)}
				/>
				<Button>Click</Button>
			</View>
		)
	}
}

const mapStateToProps = (state) => ({
	test: state.test.value
})

const mapDispatchToProps = (dispatch) => ({
	testAction(text){
		dispatch(testAction(text))
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)