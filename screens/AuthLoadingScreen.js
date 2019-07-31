import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();

  }


  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('token');
    console.log(userToken)

    userToken ? Actions.home() : Actions.signin()
  
  };

  render() {

    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}


export default AuthLoadingScreen