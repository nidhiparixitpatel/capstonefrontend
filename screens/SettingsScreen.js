import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Button,
  AsyncStorage,
  TextInput,
  DatePickerIOS,
  Picker
} from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import NavBar from '../components/NavBar';
import NumericInput from 'react-native-numeric-input'



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
    axios.get(`http://172.24.47.79:8000/main/users/${this.state.user}/profile/`).then((response) => {
     
        this.setState({bio: response.data[0].bio})
        this.setState({name: response.data[0].name})
        this.setState({profile_id: response.data[0].id})
        

      }).catch((error) => {
        console.log(error);
        });
  }

  getCycle = () => {
    axios.get(`http://172.24.47.79:8000/main/users/${this.state.user}/cycleinfo`).then((response) => {
     
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
    axios.put("http://172.24.47.79:8000/main/users/4/profile/1/",{
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

  render() {
  return <View style={{
    flex: 1,
     alignItems:'center',
     justifyContent:'center'
    }}> 
    
    <ScrollView>

    <Text>Edit Profile</Text>
      <TextInput
            placeholder="Name"
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
      />
      <TextInput
            placeholder="Bio"
            onChangeText={(bio) => this.setState({bio})}
            value={this.state.bio}
      />
     <Button
          title="Change"
          onPress={this.onProfileSubmit}
      />



    <Text>Edit Cycle</Text>

      <Text>Menarche Date</Text>

    <DatePickerIOS
          date={new Date()}
          onDateChange={this.setDate}
        />
      

      {/* <TextInput
            placeholder="Average Cycle Length"
            onChangeText={(average_length) => this.setState({average_length})}
            value={this.state.average_length}
      /> */}
       {/* <TextInput
            placeholder="Menarche Date"
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
      /> */}
           {/* <TextInput
            placeholder="Average Period Duration"
            onChangeText={(average_duration) => this.setState({average_duration})}
            value={this.state.average_duration}
      /> */}


<Text>Average Cycle Length</Text>
<NumericInput type='up-down' onChange={(average_length) => this.setState({average_length})} />



<Text>Average Period Duration</Text>
<NumericInput type='up-down' onChange={(average_duration) => this.setState({average_duration})} />

     <Button
          title="Change"
          onPress={this.onCycleSubmit}
      />


     <Button
            title="Log Out"
            onPress={this.handleLogOutPress}
        />
      </ScrollView>
    <NavBar />
      
  </View>;
}
}

SettingsScreen.navigationOptions = {
  title: 'app.json',
};
