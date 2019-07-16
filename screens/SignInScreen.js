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


export default class SignInScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  static navigationOptions = {
    title: 'Sign In',
  };

  // onInputChange = (event) => {
  //   const updatedState = {};
  
  //   const field = event.target.name;
  //   const value = event.target.value;
  
  //   updatedState[field] = value;
  //   this.setState(updatedState);

  // }

  // handleEmailChange = (event) => {
  //   const new_email =  event.target.value
  //   this.setState({ email: new_email });
  // };
  
  // handlePasswordChange = (password: string) => {
  //   this.setState({ password: password });
  // };
  
  handleLoginPress = () => {
    console.log("Login button pressed");
  };

  render() {
    return (
      <View>
          <TextInput
            placeholder="Email"
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
          />
          {/* <TextInput
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
            placeholder={strings.PASSWORD_PLACEHOLDER}
          /> */}
          <Button
            title="Sign in"
            onPress={this.handleLoginPress}
          />
      
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}


// render() {
//   return (
//     <View>
//       <Button title="Sign in!" onPress={this._signInAsync} />
//     </View>
//   );
// }


