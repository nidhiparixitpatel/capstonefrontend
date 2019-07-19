import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Button,
  AsyncStorage,
} from 'react-native';


export default function SettingsScreen() {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  handleLogOutPress = (event) => {
    console.log("Logout button pressed");
    event.preventDefault();
    AsyncStorage.removeItem('token');
    this.props.navigation.navigate('Auth');
  }

  return <View><ExpoConfigView />
     <Button
            title="Log Out"
            onPress={this.handleLogOutPress}
        />
  </View>;
}

SettingsScreen.navigationOptions = {
  title: 'app.json',
};
