import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { addToken } from '../Actions';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();

  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('token');
    console.log(userToken)
  

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    // if('token'){
    //   this.props.navigation.navigate('App', { token: 'token' })
    // } else {
      // this.props.navigation.navigate('Auth');
    // }
    // this.props.addToken(userToken);
    // this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    Actions.home()
    // this.props.navigation.navigate('App');
  };

  // Render any loading content that you like here
  render() {

    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

// const mapDispatchToProps = (dispatch, ownProps) => (
//   bindActionCreators({
//     addToken,
//     ...ownProps,
//     // navigate: (location) => props.navigation.navigate(location)
//   }, dispatch)
// );

// const mapDispatchToProps = (dispatch, ownProps) => (
//   bindActionCreators({
//         addToken,
//       }, dispatch),
//   navigate: ownProps.navigation.navigate(location)
// );


// const Connected = connect(null, mapDispatchToProps)(AuthLoadingScreen);

export default AuthLoadingScreen

// class Test3 extends React.Component {
  
//   render(){
//      return (<Connected/>);
//   }
// }

// export default Test3;
