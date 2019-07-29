import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  AsyncStorage,
} from 'react-native';
import axios from 'axios';
import TimeAgo from 'react-native-timeago';
import styles from '../stylesheets/PostStyles';
// import './Post.css';


class Post extends Component {

  constructor() {
    super();
    this.state = {
    name: null,
    };
  } 

  componentDidMount() {
    this.getName()
  }

  getName = () => {
    axios.get(`http://172.24.47.79:8000/main/users/${this.props.user}/profile`).then((response) => {
      this.setState({name: response.data[0].name}) 

    }).catch((error) => {
      console.log(error);
      });

  }


  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.name}</Text>
        <Text>{this.props.content}</Text>
        <TimeAgo time={this.props.timestamp} />
      </View>
    )
  }
}


export default Post;