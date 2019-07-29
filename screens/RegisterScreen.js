import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import {Button} from 'react-native-elements'
// import AuthHelperMethods from '../components/AuthHelperMethods';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';

export default class RegisterScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password1: '',
      password2: '',
      userid: null,
    };
  }

  static navigationOptions = {
    title: 'Register',
  };
  
 
  handleRegisterPress = (event) => {
    console.log("Register button pressed");
    console.log(this.state.email)
    console.log(this.state.password1)
    event.preventDefault();
        /* Here is where all the login logic will go. Upon clicking the login button, we would like to utilize a login method that will send our entered credentials over to the server for verification. Once verified, it should store your token and send you to the protected route. */
        axios.post("http://172.24.47.79:8000/main/auth/registration",{
          "username" : `${this.state.email}`,
          "email" : `${this.state.email}`,
          "password1" : `${this.state.password1}`,
          "password2" : `${this.state.password2}`
        })
        .then((response) => {
          console.log(response)
          this.setState({userid: response.data.user.pk})
          // this.setCycle()
          this.setProfile()
          Actions.signin()
        })
        .catch((error) => {
        console.log(error);
        });
  
  }

  setCycle = () => {
    console.log("in cycle")
    console.log(this.state.userid)
    axios.post(`http://172.24.47.79:8000/main/users/${this.state.userid}/cycleinfo/`,{
      "user": `${this.state.userid}`,
      "menarche_date": new Date(),
      "average_length": 28,
      "average_duration": 7
    })
    .then((response) => {
      console.log("made cycle")
    })
    .catch((error) => {
    console.log(error);
    });

  }

  setProfile= () => {
    console.log(this.state.userid)
    axios.post(`http://172.24.47.79:8000/main/users/${this.state.userid}/profile/`,{
      user: this.state.userid,
      bio: "test",
      name: this.state.email
    })
    .then((response) => {

    })
    .catch((error) => {
    console.log(error);
    });

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
            onChangeText={(password1) => this.setState({password1})}
            value={this.state.password1}
          />
           <TextInput
            placeholder="Confirm password"
            onChangeText={(password2) => this.setState({password2})}
            value={this.state.password2}
          />
          <Button
            title="Register"
            onPress={this.handleRegisterPress}
          />
      
      </View>
    );
  }
}