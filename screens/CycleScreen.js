import React from 'react';
import { Button, View, Text } from 'react-native';
// import NewsFeed from '../components/NewsFeed';

function CycleScreen() {

 return (
  <View style={{ 
   flex: 1,
   alignItems:'center',
   justifyContent:'center'
  }}>

  {/* <Bio/>BIO
  <NewsFeed/>NewsFeed */}
  <Button title="Go to Home screen"
    onPress={() => this.props.navigation.navigate('Home')}
   />
  </View>
);
}

CycleScreen.navigationOptions = {
  title: 'Cycle',
};

export default CycleScreen;