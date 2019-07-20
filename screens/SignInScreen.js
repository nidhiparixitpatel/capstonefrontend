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

export default class SignInScreen extends React.Component {

  // Auth = new AuthHelperMethods();

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
  
 
  handleLoginPress = (event) => {
    console.log("Login button pressed");
    console.log(this.state.email)
    console.log(this.state.password)
    event.preventDefault();
        /* Here is where all the login logic will go. Upon clicking the login button, we would like to utilize a login method that will send our entered credentials over to the server for verification. Once verified, it should store your token and send you to the protected route. */
        axios.post("http://172.24.47.79:8000/main/auth/login/",{
          email: this.state.email,
          password: this.state.password
        })
        .then((response) => {
  
          const token = response.data.token
          console.log(token)
          const id = String(response.data.user.pk)
          console.log(id)

          _signInAsync = async (token, id) => {
            await AsyncStorage.multiSet([['token', token], ['id', id]]);
    
          };

          _signInAsync(token, id)

  
          this.props.navigation.navigate('App');
        // deviceStorage.saveKey("id_token", response.data.jwt);
        // this.props.newJWT(response.data.jwt);
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
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
          />
          <Button
            title="Sign in"
            onPress={this.handleLoginPress}
          />
      
      </View>
    );
  }

  // _signInAsync = async () => {
  //   await AsyncStorage.setItem('userToken', 'abc');
  //   this.props.navigation.navigate('App');
  // };
}





// render() {
//   return (
//     <View>
//       <Button title="Sign in!" onPress={this._signInAsync} />
//     </View>
//   );
// }


// axios.post("http://localhost:8000/main/auth/login/",{
//   email: this.state.email,
//   password: this.state.password
// })
// .then((response) => {
// // deviceStorage.saveKey("id_token", response.data.jwt);
// // this.props.newJWT(response.data.jwt);
// })
// .catch((error) => {
// console.log(error);
// });
// }

// handleLoginPress = (event) => {
//   console.log("Login button pressed");
//   event.preventDefault();
//       /* Here is where all the login logic will go. Upon clicking the login button, we would like to utilize a login method that will send our entered credentials over to the server for verification. Once verified, it should store your token and send you to the protected route. */
//       this.Auth.login(this.state.username, this.state.password)
//           .then(res => {
//               if (res === false) {
//                   return alert("Sorry those credentials don't exist!");
//               }
//               this.props.history.replace('/');
//           })
//           .catch(err => {
//               alert(err);
//           })
// };