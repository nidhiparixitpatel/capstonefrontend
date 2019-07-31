import React from 'react';
import {
  ScrollView,
  Text,
  View,
  AsyncStorage,
} from 'react-native';
import axios from 'axios';
import NewsFeed from '../components/NewsFeed';
import NewPostForm from '../components/NewPostForm';
import NavBar from '../components/NavBar';
import { Svg } from 'expo';
import { Circle} from 'react-native-svg';
import styles from '../stylesheets/HomeScreenStyles';

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: null,
      token: null,
      email: null,
      menarcheDate: null,
      averageLength: null,
      numberDay: null,
    };
    this.initializeState()
  }


  initializeState = async () => {
    await this.addTokenToState()
    await this.addIdToState()
    this.getEmail()
    this.getCycle()
  };

  addTokenToState = async () => {
    const userToken = await AsyncStorage.getItem('token')
    this.setState({token: userToken})
  };

  addIdToState = async () => {
    const id = await AsyncStorage.getItem('id');
    this.setState({id: id})
  };


  getEmail = () => {
    console.log(this.state.token)
    console.log(this.state.id)
    const AuthStr = 'Bearer '.concat(this.state.token)
    axios.get(`http://nivs-capstone.herokuapp.com/main/users/${this.state.id}/`, { headers: { "Authorization" : AuthStr }
      }).then((response) => {
        this.setState({email: response.data.email })
        })
        .catch((error) => {
        console.log(error);
        });

  }

  getCycle = () => {
    axios.get(`http://nivs-capstone.herokuapp.com/main/users/${this.state.id}/cycleinfo`).then((response) => {
      this.setState({menarcheDate: response.data[0].menarche_date})
      this.setState({averageLength: response.data[0].average_length})
      this.getDayNumber()
    
    }).catch((error) => {
      console.log(error);
      });
  }

  getDayNumber = () => {

    Date.prototype.addDays = function(days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    }
    let currentDate = new Date()
    let date = new Date(this.state.menarcheDate)
    let count = 1
    while (date.getTime() < currentDate.getTime()) {
      if (count === this.state.averageLength) {
        count = 0
      }
      count += 1
      date = date.addDays(1)
    }
    this.setState({numberDay: count})
  }
  

  render() {

    return (
      <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
         <Svg
           height="100"
          width="100"
          >   
            <Circle
              cx="50"
              cy="50"
              r="50"
              fill="pink"
            />
        </Svg>
        </View>

  

        <View style={styles.getStartedContainer}>
    

          <Text style={styles.getStartedText}>Welcome { this.state.email }</Text>
          <Text>Today is day number { this.state.numberDay}</Text>

    
        </View>

        <View style={styles.getStartedContainer}>
          <NewPostForm user={this.props.id}/>

          <NewsFeed user={false}/>

        </View>

      </ScrollView>

      <NavBar />

    </View>
  );
  }
}


export default HomeScreen



HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}