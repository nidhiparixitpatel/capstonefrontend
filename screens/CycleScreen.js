import React from 'react';
import { Button, View, Text } from 'react-native';
// import NewsFeed from '../components/NewsFeed';
import { Actions } from 'react-native-router-flux';
import NavBar from '../components/NavBar';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

class CycleScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      menarche_date: null,
      average_length: null,
      average_duration: null,
      period_dates: []
    };
    this.getCycle()
  }

  getCycle = () => {
    axios.get(`http://172.24.47.79:8000/main/users/${this.props.id}/cycleinfo`).then((response) => {
     
      this.setState({menarche_date: response.data[0].menarche_date})
      this.setState({average_length: response.data[0].average_length})
      this.setState({average_duration: response.data[0].average_duration})
  
    }).catch((error) => {
      console.log(error);
      });
  }

  predictDates = () => {

    Date.prototype.addDays = function(days) {
      this.setDate(this.getDate() + parseInt(days));
      return this;
    };
    let currentDate = new Date();

    let added_date = currentDate.addDays(4);

    this.state.period_dates.push(added_date)
    let new_dates = this.state.period_dates
    this.setState({periods: new_dates })
    
  }

  render() {
     return (
  // <View style={{ 
  //  flex: 1,
  //  alignItems:'center',
  //  justifyContent:'center'
  // }}>
  <View>

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
  markedDates={{
    '2019-07-20': {textColor: 'green'},
    '2019-07-22': {startingDay: true, color: 'red'},
    '2019-07-24': {selected: true, endingDay: true, color: 'red', textColor: 'gray'},
    '2019-07-27': {disabled: true, startingDay: true, color: 'red', endingDay: true}
  }}
  // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
  markingType={'period'}
/>

  <NavBar />
  </View>
);
}
}

CycleScreen.navigationOptions = {
  title: 'Cycle',
};

export default CycleScreen;