/** @format */

import * as React from "react";
import { StyleSheet, Text, View } from 'react-native';

import Header from './Header/Header';
import HomeContent from './HomeContent/HomeContent';
import NavContainer from '../../components/NavContainer';

export default function HomeScreen() {
  return (
    <View style={styles.homeScreenView}>
      <View style={styles.homeScreenHeader}>
        <Header />
      </View>
      <View style={styles.homeScreenContent}>
        <HomeContent />
      </View>
      {/* <View style={styles.homeScreenNavBar}>
        <NavContainer />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  homeScreenView:{
    flex:1
  },
  homeScreenHeader:{
    flex:1,
  },
  homeScreenContent:{
    flex:6,
  },
  // homeScreenNavBar:{
  //   flex:1,
  // }
});