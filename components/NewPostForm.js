import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import emoji from 'emoji-dictionary';
// import './NewCardForm.css';

// const EMOJI_LIST = ["", "heart_eyes", "beer", "clap", "sparkling_heart", "heart_eyes_cat", "dog"]
import {
  Text,
  View,
  Button,
  TextInput,
  AsyncStorage,
} from 'react-native';
import axios from 'axios';

import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'


class NewPostForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: null,
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    axios.post("http://172.24.47.79:8000/main/posts/",{
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
      <View>
      <Text>-------------POST FORM----------------</Text>
      <TextInput
            placeholder="How are you feeling today?"
            onChangeText={(content) => this.setState({content})}
            value={this.state.content}
      />
     <Button
          title="Share"
          onPress={this.onSubmit}
      />
      </View>
    );
  }
}

export default NewPostForm;