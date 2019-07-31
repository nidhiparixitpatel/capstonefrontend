const React = require('react-native');
const { Dimensions, StyleSheet } = React;


module.exports = StyleSheet.create({
  searchBarContainer: {
    width: Dimensions.get('window').width - 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderBottomWidth: 2,
    marginVertical: 10,
    borderColor: 'lightgray',
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 50,
  },
  textInputSearch: {
    flex: 8,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    height: 40,
    paddingLeft: 10
  },
  textSearchButton: {
    flex: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 40
  },
  searchResultsContainer: {
    width: Dimensions.get('window').width - 20,
    alignItems: 'center',
    flex: 92
  },
  resultLink: {
    display: 'flex',
    backgroundColor: '#ddd',
    borderRadius: 5,
    height: 40,
    width: Dimensions.get('window').width - 10,
    marginVertical: 5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  result: {
    marginBottom: 10,
    color: "#cc5500",
    fontSize: 17
  }
})