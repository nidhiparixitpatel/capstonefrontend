import React from 'react';
import { Button, View, Text } from 'react-native';
import NewsFeed from '../components/NewsFeed';
import { connect } from 'react-redux';
// import Bio from '../components/Bio';

class ProfileScreen extends React.Component {

render() {
 return (
  <View style={{ 
   flex: 1,
   alignItems:'center',
   justifyContent:'center'
  }}>
  <Text>{this.props.token.email}</Text>

  {/* <Bio/> */}
  <NewsFeed/>
  <Button title="Go to Home screen"
    onPress={() => this.props.navigation.navigate('App')}
   />
  </View>
);
}
}

ProfileScreen.navigationOptions = {
  title: 'Profile',
};

// export default ProfileScreen;

const mapStateToProps = (state) => {
  const { token } = state
  return { token }
};

const Connected = connect(mapStateToProps)(ProfileScreen);


class ProfileScreen1 extends React.Component {
  
  render(){
     return (<Connected/>);
  }
}

export default ProfileScreen1;