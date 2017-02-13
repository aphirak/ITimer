import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, Text, TextInput } from 'react-native'
import { reduxForm, Field } from 'redux-form'
import { Container, Content, Form, Item, Input, Button } from 'native-base';

function MyTextInput(props) {
  const { input, ...inputProps } = props;

  return (
        <Item>
            <Input 
            {...inputProps}
            onChangeText={input.onChange}
            onBlur={input.onBlur}
            onFocus={input.onFocus}
      />
        </Item>
  );
}


const MyForm = (props) => (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <Text>Email</Text>
      <Field
        name={'email'}
        component={MyTextInput}
      />
    <Button onPress={props.handleSubmit}><Text>Click</Text></Button>
    </ScrollView>
)

export default reduxForm({
  form: 'signIn'
})(MyForm);