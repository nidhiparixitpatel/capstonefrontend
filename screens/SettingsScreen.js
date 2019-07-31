import React from 'react';
import {
  ScrollView,
  Text,
  View,
  AsyncStorage,
  TextInput,
  Button
} from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import NavBar from '../components/NavBar';
import NumericInput from 'react-native-numeric-input';
import styles from '../stylesheets/SettingsScreenStyles';



export default class SettingsScreen extends React.Component {
  constructor(props) {
    super();
    this.state = {
      profile_id: null,
      cycle_id: null,
      user: null,
      name: null,
      bio: null,
      menarche_date: null,
      average_length: null,
      average_duration: null,
    };
    super(props);
    this.initializeState()
  }

  initializeState = async () => {
    await this.addId()
    this.getBio()
    this.getCycle()
  };

  addId = async () => {
    const userid = await AsyncStorage.getItem('id');
    this.setState({user: userid})
  };

  getBio = () => {
    // const AuthStr = 'Bearer '.concat(this.props.token.jwt)
    axios.get(`http://nivs-capstone.herokuapp.com/main/users/${this.state.user}/profile/`).then((response) => {
     
        this.setState({bio: response.data[0].bio})
        this.setState({name: response.data[0].name})
        this.setState({profile_id: response.data[0].id})
        

      }).catch((error) => {
        console.log(error);
        });
  }

  getCycle = () => {
    axios.get(`http://nivs-capstone.herokuapp.com/main/users/${this.state.user}/cycleinfo`).then((response) => {
     
      this.setState({menarche_date: response.data[0].menarche_date})
      this.setState({average_length: response.data[0].average_length})
      this.setState({average_duration: response.data[0].average_duration})
      this.setState({cycle_id: response.data[0].id})

  
    }).catch((error) => {
      console.log(error);
      });
  }


  setDate = (newDate) => {
    this.setState({menarche_date: newDate});
  }

  handleLogOutPress = (event) => {
    console.log("Logout button pressed");
    event.preventDefault();
    _removeData = async () => {
      await AsyncStorage.multiRemove(["token", "id"]);
      Actions.signin()
    };
    _removeData()
  }

  onProfileSubmit = (event) => {
    console.log("edit profile button pressed")
    event.preventDefault();
    axios.put(`http://nivs-capstone.herokuapp.com/main/users/${this.state.user}/profile/${this.state.profile_id}/`,{
      "id": `${this.state.profile_id}`,
      "user": `${this.state.user}`,
      "bio": `${this.state.bio}`,
      "name": `${this.state.name}`
  })
    .then((response) => {

    })
    .catch((error) => {
    console.log(error);
    });
    this.setState({bio: null})
    this.setState({name: null})
    this.setState({profile_id: null})
  }

  onCycleSubmit = (event) => {
    console.log("edit cycle button pressed")
    event.preventDefault();
    axios.put(`http://nivs-capstone.herokuapp.com/main/users/${this.state.user}/cycleinfo/${this.state.cycle_id}/`,{
      "id": `${this.state.cycle_id}`,
      "user": `${this.state.user}`,
      "menarche_date": `${this.state.menarche_date}`,
      "average_length": `${this.state.average_length}`,
      "average_duration": `${this.state.average_duration}`
  })
    .then((response) => {

    })
    .catch((error) => {
    console.log(error);
    });
  }

  render() {
  return <View style={styles.container}> 
    
    <ScrollView contentContainerStyle={styles.contentContainer}>
    <View style={styles.profile}>
    <Text style={styles.title}>Edit Profile</Text>
      <TextInput style={styles.input}
            placeholder="Name"
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
      />
      <TextInput style={styles.input}
            placeholder="Bio"
            onChangeText={(bio) => this.setState({bio})}
            value={this.state.bio}
      />
     <Button
          style={styles.button}
          title="Change"
          onPress={this.onProfileSubmit}
          color="#cc5500"
      />
  </View>

    <View style={styles.cycle}>
    <Text style={styles.title}>Edit Cycle</Text>


<View style={styles.numeric}>
<Text style={styles.text}>Average Cycle Length</Text>

<NumericInput type='up-down' onChange={(average_length) => this.setState({average_length})} />

</View>

<View style={styles.numeric}>
<Text style={styles.text}>Average Period Duration</Text>
<NumericInput type='up-down' onChange={(average_duration) => this.setState({average_duration})} />
</View>

     <Button
          title="Change"
          onPress={this.onCycleSubmit}
          style={styles.button}
          color="#cc5500"
      />
  </View>

  <View style={styles.logout}>
     <Button  
            title="Log Out"
            onPress={this.handleLogOutPress}
            color="#cc5500"
        />
</View>

      </ScrollView>
    <NavBar />
      
  </View>;
}
}

SettingsScreen.navigationOptions = {
  title: 'Settings',
};
