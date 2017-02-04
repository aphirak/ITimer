import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, TextInput } from 'react-native'
import * as actions from 'ITimer/src/actions'

const { testAction } = actions

class Home extends Component {
	render(){
		return (
			<View style={{ 'flex': 1, 'justifyContent' : 'center', 'alignItems': 'center' }}>
				<Text>{this.props.test}</Text>
				<TextInput 
			        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
			        onChangeText={(text) => this.props.testAction(text)}
			        value={this.props.test.value}
				/>
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