import React from 'react';
import { View, TextInput, Text, ScrollView, TouchableOpacity, Button } from 'react-native';
import axios from 'axios';
import NavBar from '../components/NavBar';
import { Actions } from 'react-native-router-flux';
import styles from '../stylesheets/SearchScreenStyles';

 
export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      searchTerm: "",
    }
  }

  onSearchSubmit = () => {
    console.log("on search pressed!")
    axios.get(`http://nivs-capstone.herokuapp.com/main/users/?search=${this.state.searchTerm}`
    ).then((response) => {
      this.setState({results: response.data})
    })
    .catch((error) => {
      console.log(error);
    });
  }


  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
  
        <View style={styles.searchBarContainer}>
  
      <TextInput
        placeholder = 'Enter user email!'
        style = {styles.textInputSearch}
        underlineColorAndroid={'transparent'}
        value={this.state.searchTerm}
        onChangeText={(searchTerm) => this.setState({searchTerm})}
      />

        <Button
            title="Search"
            onPress={this.onSearchSubmit}
            color="#cc5500"/>

    </View>

        <View style={styles.searchResultsContainer}>     
            {this.state.results.map((result, i) => (
                 <TouchableOpacity key={i}
                    onPress={() => Actions.profile({id: result.id})}
           >
          <Text style={styles.result}>{result.email}</Text>
        </TouchableOpacity>
       ))}
     </View>
    
        </ScrollView>
        <NavBar />
      </View>
    );
  }
}