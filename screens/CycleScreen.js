import React from 'react';
import { Button, View, Text, ScrollView, AsyncStorage } from 'react-native';
// import NewsFeed from '../components/NewsFeed';
import { Actions } from 'react-native-router-flux';
import NavBar from '../components/NavBar';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import axios from 'axios';
import styles from '../stylesheets/CycleScreenStyles';

class CycleScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      menarcheDate: null,
      averageLength: null,
      averageDuration: null,
      age: null,
      periodDates: [],
      markedDates: {},
      numberDay: null,
      percentageSynced: null,
      accountID: null,
      accountPeriodDates: null,
      accountMenarcheDate: null,
      accountAverageLength: null,
      accountAverageDuration: null,
    };
    this.addIdToState()
    
  }

  componentDidMount() {
    this.getCycle()
    this.addIdToState()
  }

  addIdToState = async () => {
    const id = await AsyncStorage.getItem('id');
    this.setState({accountID: id})
  };


  getSync = () => {
    axios.get(`http://nivs-capstone.herokuapp.com/main/users/${this.state.accountID}/cycleinfo/`).then((response) => {
    
     
      this.setState({accountMenarcheDate: response.data[0].menarche_date})
      this.setState({accountAverageLength: response.data[0].average_length})
      this.setState({accountAverageDuration: response.data[0].average_duration})
      this.accountPredictDates()
    }).catch((error) => {
      console.log(error);
      });
    

  }

  accountPredictDates = () => {
  
    Date.prototype.addDays = function(days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    }

    accountMenarcheDateParsed = new Date(this.state.accountMenarcheDate)
    const dates = []
    let startDate = accountMenarcheDateParsed

    for(let j=0;j<=480;j+=1){
      for(let i=0; i<this.state.accountAverageDuration; i+=1){
        const newDate = startDate.addDays(i)
        dates.push(newDate)
        if(i===this.state.accountAverageDuration-1) {
          startDate = newDate.addDays(this.state.accountAverageLength-this.state.accountAverageDuration)
        }
      }
    }
    this.setState({accountPeriodDates: dates})

    this.setSync()
  
  }

  setSync = () => {
    let synced = Math.floor(Math.random() * 101)
    if(this.props.id == this.state.accountID) {
  
      synced = 100
    }
    let longest = 0
    this.state.accountPeriodDates.length > this.state.periodDates ? longest = this.state.accountPeriodDates.length : longest = this.state.periodDates.length
    let array1 = this.state.accountPeriodDates
    let array2 = this.state.periodDates
    let count = 0
    // for(let i = 0; i < longest; i++) { 
    //   for(let j = 0; j < longest; j++) { 
    //       if(array1[i] === array2[j]) { 
    //         count += 1; 
    //       } 
    //   } 
    // }


    // let synced = count/longest
    
    this.setState({percentageSynced: synced})
  }





  getCycle = () => {
    axios.get(`http://nivs-capstone.herokuapp.com/main/users/${this.props.id}/cycleinfo/`).then((response) => {
    
     
      this.setState({menarcheDate: response.data[0].menarche_date})
      this.setState({averageLength: response.data[0].average_length})
      this.setState({averageDuration: response.data[0].average_duration})
      this.predictDates()
      this.getDayNumber()
      this.getSync()
      this.calculateAge(this.state.menarcheDate)
    
  
    }).catch((error) => {
      console.log(error);
      });
  }

  predictDates = () => {
 
    Date.prototype.addDays = function(days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    }

    menarcheDateParsed = new Date(this.state.menarcheDate)
    const dates = []
    let startDate = menarcheDateParsed


    for(let j=0;j<=480;j+=1){
      for(let i=0; i<this.state.averageDuration; i+=1){
        const newDate = startDate.addDays(i)
        dates.push(newDate)
        if(i===this.state.averageDuration-1) {
          startDate = newDate.addDays(this.state.averageLength-this.state.averageDuration)
        }
      }
    }
    this.setState({periodDates: dates})
    this.getMarkedDates()
  
  }

  formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  getMarkedDates = () => {
    let markedDates = {}
    for(i=0; i<this.state.periodDates.length; i+= 1){
      markedDates[this.formatDate(this.state.periodDates[i])] = {disabled: true, startingDay: true, color: 'red', endingDay: true}
    }
    this.setState({markedDates: markedDates})
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

  render() {
    let percentage = <Text style={styles.sync}>Your cycles are {this.state.percentageSynced}% synced</Text>
    if(this.props.id == this.state.accountID) {
      percentage = <Text></Text>
    }
    return (
  // <View style={{ 
  //  flex: 1,
  //  alignItems:'center',
  //  justifyContent:'center'
  // }}>
  <View style={styles.container}>
  <ScrollView contentContainerStyle={styles.contentContainer}>
  <View style={styles.infoContainer}>
  <View>{percentage}</View>
 
  <Text>Menarche Date: {this.state.menarcheDate} ({this.state.age} years old)</Text>
  <Text>Average Period Duration: {this.state.averageDuration} days</Text>
  <Text>Average Cycle Length: {this.state.averageLength} days</Text>
  <Text style={styles.day}>Today is day number {this.state.numberDay}</Text>

  {/* <Text style={styles.sync}>Your cycles are {this.state.percentageSynced}% synced</Text> */}
  </View>
  {/* <Text>{this.state.period_dates}</Text> */}

{/* <Calendar
  // Collection of dates that have to be colored in a special way. Default = {}
  markedDates={{
    '2019-07-20': {textColor: 'green'},
    '2019-07-22': {startingDay: true, color: 'red'},
    '2019-07-24': {selected: true, endingDay: true, color: 'red', textColor: 'gray'},
    '2019-07-27': {disabled: true, startingDay: true, color: 'red', endingDay: true}
  }}
  // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
  markingType={'period'}
/> */}

<Calendar
  // Collection of dates that have to be colored in a special way. Default = {}
  // markedDates={{
  //   '2019-07-20': {textColor: 'green'},
  //   '2019-07-22': {startingDay: true, color: 'red'},
  //   '2019-07-24': {selected: true, endingDay: true, color: 'red', textColor: 'gray'},
  //   '2019-07-27': {disabled: true, startingDay: true, color: 'red', endingDay: true}
  // }}
  markedDates={this.state.markedDates}
  // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
  markingType={'period'}
/>
  </ScrollView>
  <NavBar />
  </View>
);
}
}

CycleScreen.navigationOptions = {
  title: 'Cycle',
};

export default CycleScreen;
