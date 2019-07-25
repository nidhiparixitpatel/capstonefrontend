import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import NavBar from '../components/NavBar';

export default function MessagesScreen() {
  return (
    <View>
    <ScrollView style={styles.container}>
      {/**
       * Go ahead and delete ExpoLinksView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */}

      {/* <ExpoLinksView /> */}
    </ScrollView>
    <NavBar />
    </View>
  );
}

MessagesScreen.navigationOptions = {
  title: 'Messages',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
