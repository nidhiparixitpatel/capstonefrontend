import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Button
} from 'react-native';
// import {Button} from 'react-native-elements'
import axios from 'axios';
import styles from '../stylesheets/NewPostFormStyles'


class NewPostForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: null,
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    axios.post("http://nivs-capstone.herokuapp.com/main/posts/",{
      user: this.props.user,
      content: this.state.content
    })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
    console.log(error);
    });

    this.setState({content: null})
    
  }

  render() {

    return (
      <View style={styles.form}>
      <TextInput style={styles.input}
            placeholder="How are you feeling today?"
            onChangeText={(content) => this.setState({content})}
            value={this.state.content}
      />
     <Button
          title="Share"
          onPress={this.onSubmit}
          type="outline"
          color="#cc5500"
          style={styles.button}
      />
      </View>
    );
  }
}

export default NewPostForm;