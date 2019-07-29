import React from 'react';
import { StyleSheet, View, TextInput, Text, ScrollView, TouchableOpacity, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import NavBar from '../components/NavBar';
import { ActionConst } from 'react-native-router-flux';
import { Actions } from 'react-native-router-flux';

const styles = require('../components/SearchBarStyles');
const styles2 = require('../components/SearchResultsStyles');

 
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
    axios.get(`http://172.24.47.79:8000/main/users/?search=${this.state.searchTerm}`
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
        <ScrollView>
        {/* <SearchBar/>
        <SearchResults/> */}

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
            onPress={this.onSearchSubmit} />

      {/* <TouchableOpacity
        style = {styles.textSearchButton}
        onPress={this.onSearchSubmit}
      >
      <FontAwesome name="search" size={16} color="#000" />
      </TouchableOpacity> */}

    </View>

        <View style={styles2.searchResultsContainer}>     
            {this.state.results.map((result, i) => (
                 <TouchableOpacity key={i}
                    onPress={() => Actions.profile({id: result.id})}
           >
          <Text>{result.email}</Text>
        </TouchableOpacity>
       ))}
     </View>
        </ScrollView>
        <NavBar />
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });