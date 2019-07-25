import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import tokenReducer from './Reducer';
import { Router, Scene } from 'react-native-router-flux';
import HomeScreen from './screens/HomeScreen';
import MessagesScreen from './screens/MessagesScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import CycleScreen from './screens/CycleScreen';
import SearchScreen from './screens/SearchScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import SignInScreen from './screens/SignInScreen';
import RegisterScreen from './screens/RegisterScreen';
import BeforeHomeScreen from './screens/AuthLoadingScreen';
import MainTabNavigator from './navigation/MainTabNavigator';

import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from './components/TabBarIcon';

import AppNavigator from './navigation/AppNavigator';

const store = createStore(tokenReducer);

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <Provider store={ store }>
        {/* <AppNavigator /> */}
          <Router hideNavBar= "false">
          <Scene key="root">
          {/* <Scene key="start" component={MainTabNavigator} title="start"/>  */}
          <Scene key="loading" component={AuthLoadingScreen} title="loading"/> 
          <Scene key="signin" component={SignInScreen} title="signin"/> 
          <Scene key="register" component={RegisterScreen} title="register"/> 
          <Scene key="home" component={HomeScreen} title="home"/> 
          <Scene key="settings" component={SettingsScreen} title="settings"/>
          <Scene key="cycle" component={CycleScreen} title="cycle" />
          <Scene key="profile" component={ProfileScreen} title="profile"/> 
          <Scene key="messages" component={MessagesScreen} title="messages"/> 
          <Scene key="search" component={SearchScreen} title="search"/> 
        </Scene>
      </Router> 
        </Provider>
      </View>
    );
  }
}






async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error: Error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
