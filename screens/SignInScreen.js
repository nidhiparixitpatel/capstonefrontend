import React from 'react';
import {
  AsyncStorage,
  View,
  TextInput,
  Button
} from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import styles from '../stylesheets/SignInScreenStyles';
import { Svg } from 'expo';
import { Circle} from 'react-native-svg';

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
  
 
  handleLoginPress = (event) => {
    console.log("Login button pressed");
    console.log(this.state.email)
    console.log(this.state.password)
    event.preventDefault();
        /* Here is where all the login logic will go. Upon clicking the login button, we would like to utilize a login method that will send our entered credentials over to the server for verification. Once verified, it should store your token and send you to the protected route. */
        axios.post("http://nivs-capstone.herokuapp.com/main/auth/login/",{
          username: this.state.email,
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
            Actions.home()
          };

          _signInAsync(token, id)

  
          // this.props.navigation.navigate('App');
        // deviceStorage.saveKey("id_token", response.data.jwt);
        // this.props.newJWT(response.data.jwt);
        })
        .catch((error) => {
        console.log(error);
        });
  }

  handleSignUpPress = (event) => {
    console.log("Sign up");
    Actions.register()
    
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
      
         <Svg
           height="100"
          width="100"
          >   
            <Circle
              cx="50"
              cy="50"
              r="50"
              fill="pink"
            />
        </Svg>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
          />
        </View>

          <Button
            title="Sign In"
            onPress={this.handleLoginPress}
            color="#cc5500"
          />

        <Button
            title="Sign Up"
            onPress={this.handleSignUpPress}
            color="#cc5500"
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