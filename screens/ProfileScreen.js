import React from 'react';
import { Button, View, Text, ScrollView } from 'react-native';
import NewsFeed from '../components/NewsFeed';
import { connect } from 'react-redux';
import Bio from '../components/Bio';
// import { ScrollView } from 'react-native-gesture-handler';

class ProfileScreen extends React.Component {
  constructor(props) {
    // this.state = {
    //   bio: "did not get yet"
    // };
    super(props);
    // this.getBio()
  }

render() {
 return (
  <View style={{
  flex: 1,
   alignItems:'center',
   justifyContent:'center'
  }}>
   <ScrollView>
  <Text>{this.props.token.email}</Text>

  <Bio user={this.props.token.id} />
  <NewsFeed user={this.props.token.id}/>
  </ScrollView>

  {/* <Button title="Go to Home screen"
    onPress={() => this.props.navigation.navigate('App')}
   /> */}
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