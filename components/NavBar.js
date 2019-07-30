import React from 'react';
import { Button, View, Text, AsyncStorage } from 'react-native';
// import NewsFeed from '../components/NewsFeed';
import { Actions } from 'react-native-router-flux';
import TabBarIcon from '../components/TabBarIcon';
import { Platform } from 'react-native';

import BottomNavigation, {FullTab} from 'react-native-material-bottom-navigation';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "did not get"
    };
    this.addIdToState()
  }

  addIdToState = async () => {
    const selfid = await AsyncStorage.getItem('id');
    this.setState({id: selfid })
  };

  tabs = [
    {
      key: 'settings',
      icon: 'options',
      label: 'Settings',
      barColor: '#B71C1C',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'cycle',
      icon: 'sync',
      label: 'Cycle',
      barColor: '#B71C1C',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'home',
      icon: 'home',
      label: 'Home',
      barColor: '#B71C1C',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'search',
      icon: 'search',
      label: 'Search',
      barColor: '#B71C1C',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'profile',
      icon: 'contact',
      label: 'Profile',
      barColor: '#B71C1C',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    // {
    //   key: 'messages',
    //   icon: 'mail',
    //   label: 'Messages',
    //   barColor: '#E64A19',
    //   pressColor: 'rgba(255, 255, 255, 0.16)'
    // }
  ]

  renderIcon = icon => ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-${icon}` : `md-${icon}`}
    />
  )

  renderTab = ({ tab, isActive }) => (
    <FullTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}
      onPress={Actions.cycle}
    />
  )
  
  goToPage = page => {
    switch (page) {
      case "search":
        Actions.search()
        break;
      case "profile":
        Actions.profile({id: this.state.id})
        break;
      // case "messages":
      //    Actions.messages()
      //   break;
      case "home":
        Actions.home()
        break;
      case "settings":
        Actions.settings()
        break;
      case "cycle":
        Actions.cycle({id: this.state.id})
        break;
    }
  }

 render () {
 return (
  <View>
       <BottomNavigation
          // onTabPress={newTab => this.setState({ activeTab: newTab.key })}
          onTabPress={(newTab) => this.goToPage(newTab.key)}
          renderTab={this.renderTab}
          tabs={this.tabs}
        />
  </View>
 
);
}
}


export default NavBar;