import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';

import './Post.css';


class Post extends Component {

  onDelete = () => {
    this.props.deleteCardCallBack(this.props.id)
  }

  render() {
    let foundEmoji = ""
    if(this.props.emoji){
      
      foundEmoji = emoji.getUnicode(this.props.emoji)
    }
    return (
      <View>
        <Text>{this.props.user}</Text>
        <Text>{this.props.timestamp}</Text>
        <Text>{this.props.content}</Text>
      </View>
    )
  }
}

Post.propTypes = {
  user: PropTypes.string,
  timestamp: PropTypes.string,
  content: PropTypes.string
  // deleteCardCallBack: PropTypes.func.isRequired
};

export default Post;