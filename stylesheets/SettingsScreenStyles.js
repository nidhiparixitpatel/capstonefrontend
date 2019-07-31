import {
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 50,
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 17,
  },
  profile: {
    alignItems: 'center',
    textAlign: 'center',
  },
  input: {
    alignItems: 'center',
    textAlign: 'center',
    width: 250,
    lineHeight: 20,
    marginBottom: 10,
    borderColor: 'lightgray',
    borderBottomWidth: 1,
    borderRadius: 5,
  },
  button: {
    paddingTop: 20,
    paddingBottom: 20,
    width: 300,
    // paddingLeft: 60
  },
  title: {
    paddingTop: 40,
    paddingBottom: 15,
    fontSize: 20,
    textAlign: "center"
  },
  logout: {
    paddingTop: 40
  },
  numeric: {
    textAlign: "center",
    alignItems: 'center',
  },
  text: {
    paddingBottom: 10,
    paddingTop: 10,
  },
  cycle: {
    textAlign: "center",
    alignItems: 'center',
  }

 

});

export default styles