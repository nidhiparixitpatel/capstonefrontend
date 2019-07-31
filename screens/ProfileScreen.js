import React from 'react';
import { Button, View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import NewsFeed from '../components/NewsFeed';
import { connect } from 'react-redux';
import Bio from '../components/Bio';
import NavBar from '../components/NavBar';
import { Svg } from 'expo';
import { Circle, Rect } from 'react-native-svg';
import styles from '../stylesheets/ProfileScreenStyles';


class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
  }


render() {
 return (

  <View style={styles.container} >
   <ScrollView style={styles.container}  contentContainerStyle={styles.contentContainer}>
   <View style={styles.iconContainer}>
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
  <View style={styles.bioContainer}>

  <Bio user={this.props.id} />
  <NewsFeed user={this.props.id}/>
  </View>
  </ScrollView>

  <NavBar />
  </View>
);
}
}

ProfileScreen.navigationOptions = {
  title: 'Profile',
};


export default ProfileScreen;