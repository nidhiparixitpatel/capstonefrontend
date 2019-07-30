import React from 'react';
import { Button, View, Text, ScrollView } from 'react-native';
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
      periodDates: [],
      markedDates: {},
      numberDay: null
    };
    // this.initializeState()
    
  }

  componentDidMount() {
    this.getCycle()
  }

  // initializeState = async () => {
  //   await this.getCycle()
  //   this.predictDates()
  // };

  getCycle = () => {
    axios.get(`http://nivs-capstone.herokuapp.com/main/users/${this.props.id}/cycleinfo/`).then((response) => {
    
     
      this.setState({menarcheDate: response.data[0].menarche_date})
      this.setState({averageLength: response.data[0].average_length})
      this.setState({averageDuration: response.data[0].average_duration})
      this.predictDates()
      this.getDayNumber()
    
  
    }).catch((error) => {
      console.log(error);
      });
  }

  predictDates = () => {
    console.log("predict")


    // Date.prototype.addDays = function(days) {
    //   const tempDate = new Date()
    //   tempDate.setUTCSeconds(this.getUTCSeconds() + parseInt(days)*86400);
    //   return tempDate
    // };
  
    Date.prototype.addDays = function(days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    }

    // let added_date = currentDate.addDays(4);
    // console.log(added_date)
    // this.state.period_dates.push(added_date)
    menarcheDateParsed = new Date(this.state.menarcheDate)
    const dates = []
    let startDate = menarcheDateParsed
  

    // for(let i=0; i<45; i++){
    //   console.log(startDate.addDays(i))
    // }

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
    console.log(this.state.periodDates)
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

  render() {
     return (
  // <View style={{ 
  //  flex: 1,
  //  alignItems:'center',
  //  justifyContent:'center'
  // }}>
  <View style={styles.container}>
  <ScrollView contentContainerStyle={styles.contentContainer}>
  <View style={styles.infoContainer}>

  <Text>Today is day number {this.state.numberDay}</Text>
  <Text>Menarche Date: {this.state.menarcheDate}</Text>
  <Text>Average Period Duration: {this.state.averageDuration} days</Text>
  <Text>Average Cycle Length: {this.state.averageLength} days</Text>
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
