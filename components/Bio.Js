import React from 'react';
import axios from 'axios';
import {
  Text,
  View,
  Button,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class Bio extends React.Component {
  constructor() {
    super();
    this.state = {
      name: null,
      menarche_date: null,
      age: null,
      average_length: null,
      average_duration: null,
      bio: null,
      friends: [],
      calendar: null,
    };
  }

  componentDidMount() {
    this.getBio()
    this.getCycle()
  }

  getBio = () => {
    // const AuthStr = 'Bearer '.concat(this.props.token.jwt)
    axios.get(`http://nivs-capstone.herokuapp.com/main/users/${this.props.user}/profile`).then((response) => {
     
        this.setState({bio: response.data[0].bio})
        this.setState({name: response.data[0].name})
        

      }).catch((error) => {
        console.log(error);
        });
  }

  getCycle = () => {
    axios.get(`http://nivs-capstone.herokuapp.com/main/users/${this.props.user}/cycleinfo`).then((response) => {
     
      this.setState({menarche_date: response.data[0].menarche_date})
      this.setState({average_length: response.data[0].average_length})
      this.setState({average_duration: response.data[0].average_duration})
      this.calculateAge(this.state.menarche_date)
  
    }).catch((error) => {
      console.log(error);
      });
  }

  calculateAge = (menarche_date) => {
    var today = new Date();
    var birthDate = new Date(menarche_date);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
    }
    this.setState({age: age})
  }

  handleCalendarPress = () => {
    Actions.cycle({id: this.props.user})
  }

  render() {
    // this.getBio()
    return (
      <View>
        <Text>Name: {this.state.name}</Text>
        <Text>Menarche Date: {this.state.menarche_date}({this.state.age} years old)</Text>
        <Text>Average Cycle Length: {this.state.average_length} days</Text>
        <Text>Average Period Duration: {this.state.average_duration} days</Text>
        <Text>Bio: {this.state.bio}</Text>
        <Button
            title="Calendar"
            onPress={this.handleCalendarPress}
            color="#cc5500"
          />
        {/* <button className="btn btn-primary card__delete" onClick={this.onDelete} >
            Comment
        </button> */}
      </View>
    )
  }
}

// Post.propTypes = {
//   user: PropTypes.string,
//   timestamp: PropTypes.string,
//   content: PropTypes.string
//   // deleteCardCallBack: PropTypes.func.isRequired
// };

export default Bio;
 