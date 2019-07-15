import React, {PropTypes} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';


class Bio extends Component {
  constructor() {
    super();
    this.state = {
      name: null
      menarche_date: null,
      cycle_info: null,
      bio: null,
      friends: [],
      calendar: null
    };
  }




  getUserInfo = (userid) => {
    const url = `http://localhost:3000/movies`
    axios.get(url)
      .then((response) => {
        this.setState({ library: response.data });
        console.log(response)
      }) 
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  render() {
    // if(this.props.emoji){
      
    //   foundEmoji = emoji.getUnicode(this.props.emoji)
    // }
    return (
      <View>
        <Text>{this.state.name}</Text>
        <Text>{this.state.menarche_date}(years old)</Text>
        <Text>{this.state.cycle_info}</Text>
        <Text>{this.state.bio}</Text>
        <Text>{this.state.friends.length} friends</Text>
        <button className="btn btn-primary card__delete" onClick={this.onDelete} >
            Comment
        </button>
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
 