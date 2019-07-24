import React, {Component} from 'react';
import {Linking, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
const styles = require('./SearchResultsStyles');
class SearchResults extends Component {
constructor(props) {
  super(props);
}
render() {
  return(
    <View style={styles.searchResultsContainer}>     
      {this.props.token.results.map((result, i) => (
        <TouchableOpacity key={i}
          // onPress={() => {Linking.openURL(result.formattedUrl) }}
        >
          <Text>{result.email}</Text>
        </TouchableOpacity>
       ))}
     </View>
  )
}}

const mapStateToProps = (state) => {
  const { token } = state
  return { token }
};

export default connect(mapStateToProps, null)(SearchResults);