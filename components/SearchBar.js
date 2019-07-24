import React, {Component} from 'react';
import {TextInput, TouchableOpacity, View, ScrollView} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import {connect} from 'react-redux';
import { searchResults } from '../Actions';

const styles = require('./SearchBarStyles');

class SearchBar extends Component {


  OnSearchSubmit = (searchTerm) => {
    console.log("on search pressed!")
    axios.get(`http://172.24.47.79:8000/main/users/?search=${searchTerm}`
  ).then((response) => {
    console.log(response.data)
    this.props.searchResults(response.data)
    })
    .catch((error) => {
    console.log(error);
    });
  }


  render() {
    let searchTerm = ""
    return(

      <View style={styles.searchBarContainer}>
  
        <TextInput
          placeholder = 'Enter user email!'
          style = {styles.textInputSearch}
          underlineColorAndroid={'transparent'}
          value={this.searchTerm}
        />
        <TouchableOpacity
          style = {styles.textSearchButton}
          onPress={(value) => this.onSearchSubmit(value)}
        >
          <FontAwesome name="search" size={16} color="#000" />
        </TouchableOpacity>
      
      </View>
    )
  }
}



const Connected = connect(null, {searchResults})(SearchBar);
class Test4 extends React.Component {
  
  render(){
     return (<Connected/>);
  }
}

export default Test4;