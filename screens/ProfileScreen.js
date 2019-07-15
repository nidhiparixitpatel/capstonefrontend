import React from 'react';
import { Button, View, Text } from 'react-native';
import NewsFeed from '../components/NewsFeed';
// import Bio from '../components/Bio';

function ProfileScreen() {

 return (
  <View style={{ 
   flex: 1,
   alignItems:'center',
   justifyContent:'center'
  }}>
  <Text>PROFILE</Text>

  {/* <Bio/> */}
  <NewsFeed/>
  <Button title="Go to Home screen"
    onPress={() => this.props.navigation.navigate('Home')}
   />
  </View>
);
}

ProfileScreen.navigationOptions = {
  title: 'Profile',
};

export default ProfileScreen;