import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
// import './Post.css';


class Post extends Component {

  constructor() {
    super();
    this.state = {
    name: null,
    // deleteCardCallBack: this.deleteCard,
    // addCardCallBack: this.addCard,
    };
  } 

  onDelete = () => {
    this.props.deleteCardCallBack(this.props.id)
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
    // let foundEmoji = ""
    // if(this.props.emoji){
      
    //   foundEmoji = emoji.getUnicode(this.props.emoji)
    // }
    return (
      <View>
        <Text>A POST</Text>
        <Text>{this.state.name}</Text>
        <Text>{this.props.timestamp}</Text>
        <Text>{this.props.content}</Text>
      </View>
    )
  }
}

Post.propTypes = {
  user: PropTypes.number,
  timestamp: PropTypes.string,
  content: PropTypes.string
  // deleteCardCallBack: PropTypes.func.isRequired
};

export default Post;