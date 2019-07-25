import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  TextInput,
  Button
} from 'react-native';
// import AuthHelperMethods from '../components/AuthHelperMethods';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';

export default class RegisterScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
    };
  }

  static navigationOptions = {
    title: 'Register',
  };
  
 
  handleRegisterPress = (event) => {
    console.log("Register button pressed");
    console.log(this.state.email)
    console.log(this.state.password)
    event.preventDefault();
        /* Here is where all the login logic will go. Upon clicking the login button, we would like to utilize a login method that will send our entered credentials over to the server for verification. Once verified, it should store your token and send you to the protected route. */
        axios.post("http://172.24.47.79:8000/main/users/",{
          email: this.state.email,
          password: this.state.password
        })
        .then((response) => {
   
        })
        .catch((error) => {
        console.log(error);
        });
    Actions.signin()
  }


  render() {
    return (
      <View>
          <TextInput
            placeholder="Email"
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
          />
          <TextInput
            placeholder="Password"
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
          />
           <TextInput
            placeholder="Confirm password"
            onChangeText={(passwordConfirmation) => this.setState({passwordConfirmation})}
            value={this.state.password}
          />
          <Button
            title="Register"
            onPress={this.handleRegisterPress}
          />
      
      </View>
    );
  }
}