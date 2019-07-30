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
import { Actions } from 'react-native-router-flux';

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
    axios.get(`http://nivs-capstone.herokuapp.com/main/users/${this.props.user}/profile`).then((response) => {
      this.setState({name: response.data[0].name}) 

    }).catch((error) => {
      console.log(error);
      });

  }


  render() {
    return (
      <View style={styles.container}>
         <TouchableOpacity 
                    onPress={() => Actions.profile({id: this.props.user})}
           >
          <Text style={styles.name}>{this.state.name}</Text>
        </TouchableOpacity>
        <Text style={styles.content}>{this.props.content}</Text>
        <TimeAgo style={styles.time} time={this.props.timestamp} />
      </View>
    )
  }
}


export default Post;